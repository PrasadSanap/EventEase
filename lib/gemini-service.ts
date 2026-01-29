// Gemini API service for auto-generating event content
// Using the Vercel AI SDK with Gemini model

export async function generateEventDescription(eventTitle: string, eventDetails: string): Promise<string> {
  // Mock implementation - in production, use Vercel AI Gateway with Gemini model
  // Example: const { text } = await generateText({ model: "google/gemini-2.0-flash", ... })

  const mockDescriptions: Record<string, string> = {
    "AI & Machine Learning Workshop":
      "Join us for an exciting workshop exploring the latest advancements in Artificial Intelligence and Machine Learning. Learn from industry experts about neural networks, deep learning, and real-world applications. Perfect for students interested in tech and data science.",
    "Annual Sports Day":
      "Get ready for our annual sports extravaganza! Compete in various athletic events, cheer for your teams, and celebrate the spirit of sportsmanship. All students welcome - whether you're an athlete or a supporter.",
    "Cultural Festival 2024":
      "Experience the vibrant diversity of our campus culture! Enjoy traditional music, dance performances, authentic cuisine from around the world, and art exhibitions. A celebration of unity in diversity.",
  }

  return mockDescriptions[eventTitle] || `Join us for an unforgettable experience at ${eventTitle}. ${eventDetails}`
}

export async function generatePosterPrompt(eventTitle: string, eventCategory: string): Promise<string> {
  // Generate an image prompt for poster creation
  const categoryPrompts: Record<string, string> = {
    tech: "modern, futuristic design with circuit patterns, blue and neon colors, tech-forward aesthetic",
    sports: "energetic, dynamic composition with athletes in action, vibrant colors, movement and power",
    cultural: "colorful, diverse, celebration theme with traditional patterns and bright colors",
  }

  const basePrompt = `Professional event poster for "${eventTitle}". ${categoryPrompts[eventCategory] || "vibrant and engaging"}. High quality, modern design, clear typography, suitable for college campus promotion.`

  return basePrompt
}

export async function generateEmailTemplate(
  eventTitle: string,
  eventDate: string,
  eventLocation: string,
): Promise<string> {
  const mockTemplate = `
Subject: Don't Miss Out! ${eventTitle} is Coming

Dear Campus Community,

We're excited to announce ${eventTitle}!

📅 Date: ${eventDate}
📍 Location: ${eventLocation}

This is an event you won't want to miss. Whether you're passionate about the topic or just looking for a great time with your friends, we've got something special planned.

Register now to secure your spot!

Best regards,
EventEase Team
  `

  return mockTemplate
}
