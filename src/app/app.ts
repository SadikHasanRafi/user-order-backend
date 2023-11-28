import express, { Application, Request, Response } from "express"
import cors from "cors"
import userRoute from "./Modules/User/user.router"

const app: Application = express()

//root route setup
const rootRoute = async (req: Request, res: Response) => {
  res.send("Hello from root directory")
}

//parser
app.use(express.json())
app.use(cors())

//routing
app.use("/api/user", userRoute)

app.get("/", rootRoute)

//todo implement 404 route here
// app.get("*",)

export default app
