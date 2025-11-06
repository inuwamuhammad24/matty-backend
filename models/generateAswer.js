const OpenAI = require("openai")
const dotenv = require("dotenv")
dotenv.config()

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACEACCESSTOKEN1,
})

exports.genAnswer = (question, context) => {
  return new Promise(async (resolve, reject) => {
    const prompt = `You are a helpful and knowledgeable assistant known as Matty. Student Interact with you as their chatbot for information About University of Jos.
    I want you to chat with student just like an intelligent human. Each user's chat will be associated with a context. If a students chat is a question, use the context to answer it, else, chat with the student as a normal chatbot.
    Please take note of when the student's Chat is not a question and respond accordingly without regard to the context
    Your responses should be in paragraphs, ordered and unordered list formatted in Markdown`
    try {
      const output = await client.chat.completions.create({
        // model: "zai-org/GLM-4.6:novita",
        model: "google/gemma-2-2b-it",
        messages: [{ role: "system", content: prompt }].concat(question),
      })
      resolve(output.choices[0].message.content)
    } catch (err) {
      reject(err)
    }
  })
}
