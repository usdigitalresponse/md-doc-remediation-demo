// src/components/aipdfConfiguration/AIPDFConfiguration.tsx
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PROVIDERS = ["OpenAI", "Anthropic", "Google"] as const
const MODELS = {
  OpenAI: ["GPT-4o", "GPT-4o Mini", "GPT-3.5 Turbo"],
  Anthropic: ["Claude Sonnet 3.5", "Claude Sonnet 3.7"],
  Google: ["Gemini Flash 2.0"],
} as const

type Props = {
  onGenerate: (file: File, aiProvider: string, model: string) => void
}

export default function AIPDFConfiguration({ onGenerate }: Props) {
  const [aiProvider, setAiProvider] = useState<typeof PROVIDERS[number]>("OpenAI")
  const [model, setModel]         = useState<string>(MODELS.OpenAI[0])
  const [file, setFile]           = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
  }

  const triggerFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleGenerate = () => {
    if (file) {
      onGenerate(file, aiProvider, model)
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
      {/* Context */}
      <div className="text-sm text-gray-700">
        Please upload your PDF to analyze it with our AI, automatically tag sections
        (title, headings, paragraphs, images, etc.), and generate a report of the tagged content.
      </div>

      {/* Upload PDF Section */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h3 className="font-semibold mb-3">Upload PDF</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button onClick={triggerFilePicker}>
          {file ? file.name : "Choose PDF"}
        </Button>
      </div>

      {/* AI Provider Selection */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h3 className="font-semibold mb-2">Choose AI Provider</h3>
        <div className="flex flex-wrap gap-2">
          {PROVIDERS.map((prov) => (
            <button
              key={prov}
              onClick={() => {
                setAiProvider(prov)
                setModel(MODELS[prov][0])
              }}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition whitespace-nowrap",
                aiProvider === prov
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Model Selection */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
        <h3 className="font-semibold mb-2">Choose Model</h3>
        <div className="flex flex-wrap gap-2">
          {MODELS[aiProvider].map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition whitespace-nowrap",
                model === m
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm text-center">
        <Button onClick={handleGenerate} disabled={!file}>
          Generate Tagged PDF
        </Button>
      </div>
    </div>
  )
}
