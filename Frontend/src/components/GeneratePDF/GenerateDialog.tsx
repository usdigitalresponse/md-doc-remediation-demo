// src/components/GenerateDialog.tsx
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Download, Terminal } from "lucide-react"

import type { GenerateDialogProps } from "@/models/GenerateDialogProps"
import type { TagResponse } from "@/models/TagResponse"

import { generatePdf } from "@/lib/api"

export default function GenerateDialog({
  triggerLabel = "Generate PDF",
  data,
}: GenerateDialogProps<TagResponse>) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  // When dialog opens with valid data, request PDF
  useEffect(() => {
    if (open && data) {
      setLoading(true)
      setError(null)
      // clear any previous URL
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
        setPdfUrl(null)
      }
      generatePdf(data)
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          setPdfUrl(url)
        })
        .catch((err) => {
          console.error("Generate PDF failed:", err)
          setError(err?.message || "Failed to generate PDF")
        })
        .finally(() => {
          setLoading(false)
        })
    }
    // cleanup on close: revoke previous URL
    return () => {
      if (!open && pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
        setPdfUrl(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, data])

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto mb-4">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Preview Generated PDF</DialogTitle>
          <DialogDescription>
            AI-tagged content rendered as an accessible PDF.
          </DialogDescription>
        </DialogHeader>

        {/* Preview area */}
        <div className="h-[70vh] overflow-auto rounded-md border bg-muted p-2">
          {error && (
            <Alert variant="destructive" className="h-full flex flex-col items-center justify-center">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Generation error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="space-y-2 p-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}

          {!loading && pdfUrl && !error && (
            <iframe
              src={pdfUrl}
              title="Generated PDF"
              className="w-full h-full"
            />
          )}

          {!loading && !pdfUrl && !error && (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              Click “Generate PDF” to preview
            </div>
          )}
        </div>

        <DialogFooter className="justify-between">
          {pdfUrl && (
            <a href={pdfUrl} download="remediated.pdf">
              <Button variant="secondary" size="sm" className="flex gap-1">
                <Download size={14} /> Download
              </Button>
            </a>
          )}
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
