const externalTextData = require("../externalTextData")
const { SpliteIntoChunks } = require("../models/SplitIntoChunks")
const createEmbeddingsAndStore = require("../models/generateEmbeddings.js")
const { queryResults } = require("../models/getRelevantInfo")
const { genAnswer } = require("../models/generateAswer")

exports.home = async (req, res) => {
  res.json("Hello, backend server is running correctly")
}

exports.genAnswer = (req, res) => {
  queryResults(req.body.input)
    .then(context => {
      console.log("generating responsne...")
      genAnswer(req.body.input, context)
        .then(response => {
          res.json(response)
        })
        .catch(err => {
          res.json(false)
          console.log(err)
        })
    })
    .catch(err => {
      res.json(err)
      console.log(err)
    })
}

exports.createDataEmbeddings = async (req, res) => {
  try {
    // convert the data source into chunks using the SplitterIntoChunks function
    const chunks = await SpliteIntoChunks(externalTextData)
    // convert the chunks into embeddings using the SplitterIntoChunks function
    createEmbeddingsAndStore(chunks).then((docs, response) => {
      res.json(`${response} documents where inserted into the db`)
    })
  } catch (err) {
    console.log(err)
  }
}
