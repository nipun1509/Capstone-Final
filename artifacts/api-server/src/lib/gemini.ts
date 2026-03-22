import OpenAI from "openai"

let client: OpenAI | null = null

const MODELS = [
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "z-ai/glm-4.5-air:free",
  "stepfun/step-3.5-flash:free",
]

function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env["AI_INTEGRATIONS_OPENROUTER_API_KEY"] ?? process.env["OPENROUTER_API_KEY"]
    const baseURL = process.env["AI_INTEGRATIONS_OPENROUTER_BASE_URL"] ?? "https://openrouter.ai/api/v1"
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY environment variable is not set")
    }
    client = new OpenAI({
      baseURL,
      apiKey,
    })
  }
  return client
}

async function callModel(model: string, system: string, user: string): Promise<string> {
  const openai = getClient()
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  })
  return completion.choices[0]?.message?.content ?? ""
}

export async function generateResponse(system: string, user: string): Promise<string> {
  let lastError: unknown

  for (const model of MODELS) {
    try {
      const result = await callModel(model, system, user)
      if (model !== MODELS[0]) {
        console.log(`Used fallback model: ${model}`)
      }
      return result
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status
      if (status === 429 || status === 402 || status === 503 || status === 404) {
        console.warn(`Model ${model} unavailable (${status}), trying next...`)
        lastError = err
        continue
      }
      throw err
    }
  }

  throw lastError
}
