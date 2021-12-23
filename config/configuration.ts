export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: +process.env.DATABASE_PORT,
    db: process.env.DATABASE_DB,
    synchronize: process.env.SYNCHRONIZE,
  },
});
