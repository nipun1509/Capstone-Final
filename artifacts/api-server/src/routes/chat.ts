import { Router, type IRouter } from "express"
import { detectEmotion } from "../lib/emotion.js"
import { buildPrompt } from "../lib/promptBuilder.js"
import { generateResponse } from "../lib/gemini.js"

const router: IRouter = Router()

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body as { message?: string }

    if (!message || typeof message !== "string" || message.trim() === "") {
      res.status(400).json({ error: "message is required" })
      return
    }

    const emotion = detectEmotion(message)
    const { system, user } = buildPrompt(message, emotion)
    const reply = await generateResponse(system, user)

    res.json({ emotion, reply })
  } catch (err) {
    console.error("Chat error:", err)
    const message = err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({ error: message })
  }
})

export default router
