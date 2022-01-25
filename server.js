if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const app = require("./config/app")

const PORT = process.env.PORT || 2022
const server = app.listen(PORT, () => console.log(`Server Started ~ :${PORT}`))

process.on("uncaughtException", err => {
  console.log("uncaughtException! Shutting Down the Server...")
  console.log(err)

  process.exit(1)
})

process.on("unhandledRejection", err => {
  console.log("unhandledRejection! Shutting Down the Server...")
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})
