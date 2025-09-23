const mattyCollection = require("../db").collection("matty")
const { generateEmbedding } = require("./generateEmbeddings")

exports.queryResults = input => {
  return new Promise(async (resolve, reject) => {
    try {
      // convert input to vector embeddings before querying the db
      const queryEmbedding = await generateEmbedding(input)
      // query the database using a vector search and return five matching results
      console.log("Querying the database...")
      const contextInfo = mattyCollection.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            queryVector: queryEmbedding,
            path: "textEmbedding",
            exact: true,
            limit: 5,
          },
        },
        {
          $project: {
            _id: 0,
            textChunk: 1,
          },
        },
      ])
      const results = []
      for await (const doc of contextInfo) {
        results.push(doc.textChunk)
      }
      let resultsAsTexts = ""
      results.forEach(ele => {
        resultsAsTexts += ele + "\n"
      })
      resolve(resultsAsTexts)
    } catch (err) {
      reject(err)
    }
  })
}
