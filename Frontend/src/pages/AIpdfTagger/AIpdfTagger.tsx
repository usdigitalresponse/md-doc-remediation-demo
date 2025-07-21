// src/pages/AIpdfTagger/AIpdfTagger.tsx
import { useState } from "react"
import AIPDFConfiguration from "@/components/AIpdfConfiguration/AIpdfConfiguration"
import PDFView from "@/components/pdfView/pdfView"
import MetadataDropdown from "@/components/pdfView/MetadataDropdown"
import type { TagResponse } from "@/models/TagResponse"
import type { Metadata } from "@/models/Metadata"
import { uploadPdf } from "@/lib/api"
import GenerateDialog from "@/components/GeneratePDF/GenerateDialog"

export default function AIpdfTagger() {
  const [tags, setTags]       = useState<TagResponse | null>(null)
  const [loading, setLoading] = useState(false)

  // 1. Handling the initial upload & AI‐tag request
  const handleUploadAndTag = async (file: File) => {
    setLoading(true)
    try {
      const result = await uploadPdf(file)
      setTags(result)
    } catch (err) {
      console.error(err)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  // 2. When PDFMetadata child saves new metadata, update in state
  const handleUpdateMetadata = (newMetadata: Metadata) => {
    if (!tags) return;
    setTags({
      ...tags,
      metadata: newMetadata,
    });
  };

  // 3. When a RegionCard child saves a new tag, we need to know its index
  const handleUpdateRegionTag = (index: number, newTag: string) => {
    if (!tags) return;
    const newStructure = [...tags.structure];
    newStructure[index] = {
      ...newStructure[index],
      tag: newTag,
    };
    setTags({
      ...tags,
      structure: newStructure,
    });
  };

  return (
    // <div className="flex flex-col md:flex-row gap-6 p-6">
    //   {/* Left: config, passes selected file up */}
    //   <div style={{ flex: 3 }}>
    //     <AIPDFConfiguration
    //       onGenerate={handleUploadAndTag}
    //     />
    //   </div>

    //   {/* Right: view JSON or skeleton */}
    //   <div style={{ flex: 7 }}>
    //     <PDFView
    //       data={tags}
    //       loading={loading}
    //     />
    //   </div>
    // </div>

    <div className="flex flex-col md:flex-row gap-6 p-6 h-[calc(100vh-2rem)]">
      {/* Left: config, passes selected file up */}
      <div style={{ flex: 3 }}>
        <AIPDFConfiguration onGenerate={handleUploadAndTag} />
      </div>

      {/* Right: show metadata (if available), then PDFView */}
      <div style={{ flex: 7 }} className="flex flex-col">

        {tags && tags.metadata && (
          <GenerateDialog triggerLabel = "Generate PDF" data={tags} />
        )}
        
        {tags && tags.metadata && (
          <MetadataDropdown
              metadata={tags.metadata}
              onSave={handleUpdateMetadata}/>
        )}
        {/* Then the region cards or skeleton */}
        
        
        <div className="flex-1 overflow-auto mt-4">
          <PDFView 
              data={tags}
              loading={loading} 
              onUpdateRegionTag={handleUpdateRegionTag} />
        </div>
        
      </div>
    </div>

  )
}
