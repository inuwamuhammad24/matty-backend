const { MarkdownTextSplitter } = require("langchain/text_splitter")

exports.SpliteIntoChunks = async data => {
  // Markdown-aware splitter
  const splitter = new MarkdownTextSplitter({
    chunkSize: 1200,
    chunkOverlap: 150,
  })

  const chunks = await splitter.splitText(data)

  // Add metadata (simple heuristic — you can expand this)
  return chunks.map((chunk, idx) => ({
    id: `unijos_${Date.now()}_${idx}`,
    text: chunk.trim(),
    metadata: {
      length: chunk.length,
      // Example: capture top-level heading if present
      heading: chunk
        .split("\n")[0]
        .replace(/^#+\s*/, "")
        .trim(),
    },
  }))
}
