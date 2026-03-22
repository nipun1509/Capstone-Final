export type Emotion = "frustrated" | "confused" | "motivated" | "neutral"

export function detectEmotion(message: string): Emotion {
  const lower = message.toLowerCase()

  if (
    lower.includes("hard") ||
    lower.includes("difficult") ||
    lower.includes("stuck") ||
    lower.includes("frustrated") ||
    lower.includes("can't understand") ||
    lower.includes("too complicated")
  ) {
    return "frustrated"
  }

  if (
    lower.includes("confused") ||
    lower.includes("not clear") ||
    lower.includes("unclear") ||
    lower.includes("don't get") ||
    lower.includes("what does this mean")
  ) {
    return "confused"
  }

  if (
    lower.includes("easy") ||
    lower.includes("got it") ||
    lower.includes("understand now") ||
    lower.includes("makes sense")
  ) {
    return "motivated"
  }

  return "neutral"
}
