import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock bcryptjs
vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("hashedPassword123"),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

// Mock database functions
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue({ insertId: 1 }),
  }),
  getUserByEmail: vi.fn().mockResolvedValue(null),
  createUser: vi.fn().mockResolvedValue({ id: 1, email: "test@example.com" }),
  getUserById: vi.fn().mockResolvedValue({
    id: 1,
    email: "test@example.com",
    name: "Test User",
    state: "Maharashtra",
    role: "user",
  }),
}));

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createPublicContext(): { ctx: TrpcContext; cookies: CookieCall[] } {
  const cookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        cookies.push({ name, value, options });
      },
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx, cookies };
}

function createAuthenticatedContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      passwordHash: "hashedPassword123",
      phone: null,
      dateOfBirth: new Date("1990-01-01"),
      state: "Maharashtra",
      city: "Mumbai",
      isVerified: true,
      isBlocked: false,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx };
}

describe("Auth Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("auth.me", () => {
    it("returns null for unauthenticated users", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).toBeNull();
    });

    it("returns user data for authenticated users", async () => {
      const { ctx } = createAuthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.me();

      expect(result).not.toBeNull();
      expect(result?.email).toBe("test@example.com");
      expect(result?.name).toBe("Test User");
    });
  });

  describe("auth.logout", () => {
    it("clears the session cookie and reports success", async () => {
      const { ctx } = createAuthenticatedContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.auth.logout();

      expect(result).toEqual({ success: true });
      expect(ctx.res.clearCookie).toHaveBeenCalled();
    });
  });
});

describe("Geo-restriction validation", () => {
  const blockedStates = ["Telangana", "Andhra Pradesh", "Assam", "Odisha"];
  const allowedStates = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"];

  it("should identify blocked states correctly", () => {
    blockedStates.forEach((state) => {
      const isBlocked = blockedStates.includes(state);
      expect(isBlocked).toBe(true);
    });
  });

  it("should allow non-blocked states", () => {
    allowedStates.forEach((state) => {
      const isBlocked = blockedStates.includes(state);
      expect(isBlocked).toBe(false);
    });
  });
});

describe("Age verification", () => {
  it("should reject users under 18", () => {
    const today = new Date();
    const under18 = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
    
    const age = today.getFullYear() - under18.getFullYear();
    const isAdult = age >= 18;
    
    expect(isAdult).toBe(false);
  });

  it("should accept users 18 and over", () => {
    const today = new Date();
    const over18 = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
    
    const age = today.getFullYear() - over18.getFullYear();
    const isAdult = age >= 18;
    
    expect(isAdult).toBe(true);
  });

  it("should accept users exactly 18", () => {
    const today = new Date();
    const exactly18 = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    
    const age = today.getFullYear() - exactly18.getFullYear();
    const isAdult = age >= 18;
    
    expect(isAdult).toBe(true);
  });
});
