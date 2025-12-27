import { describe, expect, it } from "vitest";
import axios from "axios";

const CRICKET_API_BASE_URL = "https://api.cricapi.com/v1";

describe("Cricket API Key Validation", () => {
  it("should successfully authenticate with the Cricket API", async () => {
    const apiKey = process.env.CRICKET_API_KEY;
    
    // Check that API key is configured
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    
    // Make a lightweight API call to verify the key works
    const response = await axios.get(`${CRICKET_API_BASE_URL}/matches`, {
      params: {
        apikey: apiKey,
      },
      timeout: 30000,
    });
    
    // Check response is successful
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.status).toBe("success");
    
    // Log API info for debugging
    if (response.data.info) {
      console.log("API Info:", {
        hitsToday: response.data.info.hitsToday,
        hitsLimit: response.data.info.hitsLimit,
      });
    }
  });
});
