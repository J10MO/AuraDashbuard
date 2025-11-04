

//imguplode 
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, LinkIcon, X } from "lucide-react"
import { toast } from "sonner"

interface ImageUploadProps {
  label: string
  value: string | File
  onChange: (value: string | File) => void
  required?: boolean
  aspectRatio?: "square" | "video" | "auto"
}

export function ImageUpload({ label, value, onChange, required = false, aspectRatio = "auto" }: ImageUploadProps) {
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url")
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    onChange(file)

    // Create preview URL for display
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
      toast.success("Image selected successfully")
    }
    reader.readAsDataURL(file)
  }

  const handleClearImage = () => {
    onChange("")
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto",
  }[aspectRatio]

  const displayUrl = value instanceof File ? previewUrl : (value as string)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex gap-1 rounded-lg border p-1">
          <Button
            type="button"
            size="sm"
            variant={uploadMode === "url" ? "default" : "ghost"}
            className="h-7 px-3"
            onClick={() => setUploadMode("url")}
          >
            <LinkIcon className="mr-1 h-3 w-3" />
            URL
          </Button>
          <Button
            type="button"
            size="sm"
            variant={uploadMode === "file" ? "default" : "ghost"}
            className="h-7 px-3"
            onClick={() => setUploadMode("file")}
          >
            <Upload className="mr-1 h-3 w-3" />
            Upload
          </Button>
        </div>
      </div>

      {uploadMode === "url" ? (
        <Input
          type="url"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          required={required && !value}
        />
      ) : (
        <div className="space-y-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required={required && !value}
          />
        </div>
      )}

      {displayUrl && (
        <Card className="relative overflow-hidden p-2">
          <div className={`relative ${aspectRatioClass} max-h-48 overflow-hidden rounded-md bg-muted`}>
            <img
              src={displayUrl || "/placeholder.svg"}
              alt="Preview"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
                toast.error("Failed to load image preview")
              }}
            />
          </div>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute top-3 right-3"
            onClick={handleClearImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </Card>
      )}
    </div>
  )
}
