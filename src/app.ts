import cors                         from 'cors'
import { applyRoutes }              from './Routes/index'
import express, { Application }     from 'express'
import { CORS_ORIGIN, PUBLIC_PATH } from './config'



export const app: Application = express()

app.use(cors({
    origin: 'http://10.9.11.19:3001',
    credentials:true,            //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Add PATCH to the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
// app.use(helmet({crossOriginResourcePolicy: {policy: "cross-origin"}}));
app.use(express.json());
app.use(express.static(PUBLIC_PATH))
app.use(express.urlencoded({ extended: true }))


app.use(applyRoutes())
