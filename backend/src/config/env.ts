export const env = {
    PORT: Number(process.env.PORT) || 8000,
    DATABASE_URL: process.env.DATABASE_URL || "",
    SALT_ROUND: Number(process.env.SALT_ROUND) || 20,
    JWT_TOKEN: process.env.JWT_TOKEN || "",
    JWT_LIFE: Number(process.env.JWT_LIFE) || 1000 * 60 * 60 * 24
}