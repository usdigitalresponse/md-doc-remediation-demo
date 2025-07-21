// src/components/pdfView/MetadataDropdown.tsx
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import PDFMetadata from "./PDFMetadata"
import type { Metadata } from "@/models/Metadata"

type Props = {
  metadata: Metadata;
  onSave: (newMetadata: Metadata) => void;
}

export default function MetadataDropdown({ metadata, onSave }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors"
      >
        <span className="text-white font-medium">Metadata</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2">
          {/* Pass onSave down to PDFMetadata */}
          <PDFMetadata metadata={metadata} onSave={onSave} />
        </div>
      )}
    </div>
  )
}