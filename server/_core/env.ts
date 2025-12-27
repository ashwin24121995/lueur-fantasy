export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "lueur-fantasy-secret-key-change-in-production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  cricketApiKey: process.env.CRICKET_API_KEY ?? "",
  port: process.env.PORT ?? "3000",
};
