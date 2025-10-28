"use client"

import { useState } from "react"

interface ProductImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallback?: string
}

export function ProductImage({ src, alt, className = "", fallback = "/placeholder.svg" }: ProductImageProps) {
  const [error, setError] = useState(false)

  // Helper to get the full image URL
  const getImageUrl = (imagePath: string | null | undefined): string => {
    if (!imagePath) return fallback

    // If it's already a full URL (starts with http:// or https://), return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath
    }

    // If it's a relative path (starts with /uploads/), prepend the API URL
    if (imagePath.startsWith("/uploads/")) {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001"
      // Remove /api from the end if it exists
      const baseUrl = apiUrl.replace(/\/api$/, "")
      return `${baseUrl}${imagePath}`
    }

    // Otherwise, return as is (might be a data URL or other format)
    return imagePath
  }

  const imageUrl = error ? fallback : getImageUrl(src)

  return (
    <img
      src={imageUrl || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  )
}
