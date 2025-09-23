const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter")

exports.SpliteIntoChunks = async data => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 40,
  })

  const chunks = await splitter.splitText(data)
  return chunks
}
