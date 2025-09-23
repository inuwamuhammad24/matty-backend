const { MongoClient, ServerApiVersion } = require("mongodb")
const dotenv = require("dotenv")

dotenv.config()
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.CONNECTDB)

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("MainDatabase").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
    // export the database for use within another module
    module.exports = client.db("MainDatabase")
    // start listening for incoming requests
    const app = require("./app.js")
    const port = process.env.PORT || 8000
    app.listen(port, () => console.log(`Server running on port ${port}`))
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}
run().catch(console.dir)
