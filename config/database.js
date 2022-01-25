const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
module.exports={
  // 'school':require("../models/school"),
  // 'class':require("../models/class"),
  // 'teacher':require("../models/teacher"),
  // 'book':require("../models/book"),
  // 'user':require("../models/user"),
}

// const dbConn = mongoose.connection
//
// dbConn.once("connected", () => console.log("Database Connected!"))
// dbConn.on("error", error => console.log(error))
