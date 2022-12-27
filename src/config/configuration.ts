export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    database_username: process.env.database_username,
    database_password: process.env.database_password,
    database_name: process.env.database_name,
  },
  google: {
    client_secrt: process.env.client_Secret,
    client_id: process.env.client_ID,
  },
})
