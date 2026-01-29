"use client"

import { useState } from "react"
import { generateEventDescription, generatePosterPrompt, generateEmailTemplate } from "@/lib/gemini-service"

export function useAIGeneration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateDescription = async (title: string, category: string): Promise<string> => {
    setIsLoading(true)
    setError(null)
    try {
      const description = await generateEventDescription(title, category)
      return description
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate description"
      setError(errorMessage)
      return ""
    } finally {
      setIsLoading(false)
    }
  }

  const generatePoster = async (title: string, category: string): Promise<string> => {
    setIsLoading(true)
    setError(null)
    try {
      const prompt = await generatePosterPrompt(title, category)
      return prompt
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate poster prompt"
      setError(errorMessage)
      return ""
    } finally {
      setIsLoading(false)
    }
  }

  const generateEmail = async (title: string, date: string, location: string): Promise<string> => {
    setIsLoading(true)
    setError(null)
    try {
      const template = await generateEmailTemplate(title, date, location)
      return template
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate email"
      setError(errorMessage)
      return ""
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateDescription,
    generatePoster,
    generateEmail,
    isLoading,
    error,
  }
}
