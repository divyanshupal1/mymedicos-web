export const MODE = "LOCAL"; // "LOCAL" or "PROD"

export const FRONTEND_HOST = MODE==="LOCAL"?'http://localhost:3000':"https://mymedicos-web.vercel.app";