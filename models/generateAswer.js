const OpenAI = require("openai")
const dotenv = require("dotenv")
const { HfInference } = require("@huggingface/inference")
dotenv.config()

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACEACCESSTOKEN,
})

exports.genAnswer = (question, context) => {
  return new Promise(async (resolve, reject) => {
    const prompt = `You are a helpful and knowledgeable assistant. Your task is to answer the user's question based on the provided context that was retrieved from a local database.
    You can use outside knowledge if the need arises, but I want you to specifically say I don't know if you cannot answer a question.
    Here is the student's Question: <${question}>, and this is the provided context: <${context}>. 
    Please take note of when the student's query is not a question and respond accordingly without regard to the context
    Your responses should be in paragraphs and unordered list formatted in Markdown`
    try {
      const output = await client.chat.completions.create({
        model: "zai-org/GLM-4.5:novita",
        messages: [{ role: "user", content: prompt }],
      })
      resolve(output.choices[0].message.content)
    } catch (err) {
      reject(err)
    }
    console.log(question, context)
    resolve(context)
  })
}
