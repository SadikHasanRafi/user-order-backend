import express, { Application, Request, Response } from "express"
import cors from "cors"
import userRoute from "./Modules/User/user.router";

const app:Application = express()


//parser
app.use(express.json());
app.use(cors());


//routing
app.use('/api/user',userRoute )



app.get('/', (req:Request, res:Response) => {
  res.send('Hello from root directory')
})








export default app;