import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

// Custom authentication routes for LUEUR Fantasy Cricket
// No Manus OAuth - using email/password authentication

export function registerOAuthRoutes(app: Express) {
  // Register new user
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, name, phone, dateOfBirth, state, city } = req.body;

      // Validate required fields
      if (!email || !password || !name || !dateOfBirth || !state) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Invalid email format" });
        return;
      }

      // Validate password strength
      if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
        return;
      }

      const result = await db.createUser({
        email,
        password,
        name,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        state,
        city,
      });

      if (!result.success) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(201).json({ success: true, message: "Registration successful" });
    } catch (error) {
      console.error("[Auth] Registration failed", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // Login user
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const result = await db.authenticateUser(email, password);

      if (!result.success || !result.user) {
        res.status(401).json({ error: result.error || "Authentication failed" });
        return;
      }

      const user = result.user;

      // Check geo restriction
      if (db.isRestrictedState(user.state || "")) {
        res.status(403).json({ error: "Access is not available in your state" });
        return;
      }

      const sessionToken = await sdk.createSessionToken(
        user.id,
        user.email,
        user.name || "User",
        { expiresInMs: ONE_YEAR_MS }
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Logout user
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      const cookieOptions = getSessionCookieOptions(req);
      res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      res.json({ success: true });
    } catch (error) {
      console.error("[Auth] Logout failed", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });

  // Request password reset
  app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
      }

      const result = await db.createPasswordResetToken(email);

      // Always return success to prevent email enumeration
      res.json({ 
        success: true, 
        message: "If an account exists with this email, you will receive a password reset link" 
      });

      // In production, send email with reset link
      if (result.token) {
        console.log(`[Auth] Password reset token for ${email}: ${result.token}`);
        // TODO: Send email with reset link
      }
    } catch (error) {
      console.error("[Auth] Forgot password failed", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  // Reset password with token
  app.post("/api/auth/reset-password", async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        res.status(400).json({ error: "Token and password are required" });
        return;
      }

      if (password.length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters" });
        return;
      }

      const result = await db.resetPassword(token, password);

      if (!result.success) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
      console.error("[Auth] Reset password failed", error);
      res.status(500).json({ error: "Failed to reset password" });
    }
  });

  // Get current user (for session validation)
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        state: user.state,
        city: user.city,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      res.status(401).json({ error: "Not authenticated" });
    }
  });
}
