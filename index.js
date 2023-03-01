require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const usersRouter = require("./routes/usersRouter")

mongoose.set("strictQuery", false)

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  e => {
    if (e) {
      console.log("Connection error")
    } else console.log("Database connected")
  }
)

const app = express()
app.use(express.json())

app.use("/api", usersRouter)

app.listen(3001, () => {
  console.log("Server started at port 3001")
})
