const express = require("express")
const app = express()
const homeRouter = require("./router")
const bodyParser = require("body-parser")
const cors = require("cors")

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-PINGOTHER, X-Request-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Max-Age", "1800")
  res.setHeader("Access-Control-Allow-Headers", "content-type")
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", homeRouter)

module.exports = app
