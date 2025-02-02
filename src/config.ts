import path from 'path'

export const DOMAIN      = process.env.DOMAIN
export const SERVER_PORT = process.env.SERVER_PORT

export const CORS_ORIGIN = [
    "http://localhost:3000",
    'http://localhost:3010',
    'https://11.0.0.19:3010',
  

]

export const ROOT_PATH    = path.resolve(__dirname, '../')
export const PUBLIC_PATH  = path.resolve(__dirname, '../', 'public')
export const PRIVATE_PATH = path.resolve(__dirname, '../', 'private')
export const UPLOADS_PATH = path.resolve(__dirname, '../', 'public', 'uploads')

export const JWT_SECRET        = String(process.env.JWT_SECRET)
export const JWT_EXPIRY        = String(process.env.JWT_EXPIRY)
export const INVALIDATE_COOKIE = `accessToken=deleted; path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure`

export const DB = {
    client: process.env.DB_CLIENT,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
}

export const LOCALES_ENUM = [
    'ar',
    'en'
]
