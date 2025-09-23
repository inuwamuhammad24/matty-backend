const dotenv = require("dotenv")
const dataCollections = require("../db.js").collection("matty")

async function loadPipeline() {
  const { pipeline } = await import("@xenova/transformers")
  return pipeline
}
dotenv.config()

// function for generating embedding without storing
exports.generateEmbedding = data => {
  console.log("Generating embeddings...")
  return new Promise(async (resolve, reject) => {
    try {
      const pipeline = await loadPipeline()
      const embedding = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
      const result = await embedding(data, { pooling: "mean", normalize: "true" })
      resolve(Array.from(result.data))
    } catch (err) {
      reject(err)
    }
  })
}

// function for generating and storing embeddings
exports.createEmbeddingsAndStore = data => {
  console.log("Generating embeddings and storing documents...")
  const docs = []
  return new Promise(async (resolve, reject) => {
    try {
      // wait for all the chunks to be embedded before storing them into the database
      await Promise.all(
        data.map(async doc => {
          // start embedding each chunk and push the result along side the
          // the embeddings into the docs array
          const pipeline = await loadPipeline()
          const embedding = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
          const results = await embedding(doc, { pooling: "mean", normalize: true })
          docs.push({
            textChunk: doc,
            textEmbedding: Array.from(results.data),
          })
        })
      )
      // save all the chunks wiith their embeddings in a database
      const response = await dataCollections.insertMany(docs, { ordered: false })
      resolve(docs, response.insertedCount)
    } catch (err) {
      reject(err)
    }
  })
}
