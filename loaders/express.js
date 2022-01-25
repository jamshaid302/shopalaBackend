import express from "express"
import cors from "cors"
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"
import bodyParser from "body-parser"
import passport from "passport"

import { protectedRouter, unProtectedRouter } from "../routes/index.js"

export default async function expressLoader({ app }) {
  app.use(xss())
  app.use(mongoSanitize())
  app.use(cors())
  app.use(helmet())

  app.use(express.json())
  app.use(bodyParser.json())

  app.use(passport.initialize())
  app.use("/api", passport.authenticate("jwt", { session: false }))

  app.use("/api", protectedRouter)
  app.use("/", unProtectedRouter)
}
