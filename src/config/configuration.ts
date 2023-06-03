export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    type: process.env.TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  },
  google: {
    client_secrt: process.env.client_Secret,
    client_id: process.env.client_ID,
    call_back_url: process.env.CALL_BACK_URL,
  },
})
