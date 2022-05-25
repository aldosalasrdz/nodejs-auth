require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  pgEmail: process.env.PG_EMAIL,
  pgPassword: process.env.PG_PASSWORD,
  pgPort: process.env.PG_PORT,
  pgRefPort: process.env.PG_REFPORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET
}

module.exports = { config }
