const config = () => ({
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL,
});

export default config;

export type AppConfig = ReturnType<typeof config>;
