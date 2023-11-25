import express, { Application, Request, Response } from "express"
import config from "./Config/config"



const app:Application = express()
const port = 3000

app.get('/', (req:Request, res:Response) => {
  res.send('Hello from root directory')
})




export default app;