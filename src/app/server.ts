import mongoose from "mongoose"
import app from "./app"
import config from "./Config/config"

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Server is running perfectly 🥳🥳 on port ${config.port}`)
    })
    await mongoose.connect(config.dataBaseUrl as string)
  } catch (error) {
    console.error(error)
  }
}

main()
