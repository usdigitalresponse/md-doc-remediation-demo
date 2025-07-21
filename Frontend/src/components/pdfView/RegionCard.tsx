// src/components/pdfView/RegionCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";

export type Region = {
  page: number
  type: string
  bbox: number[]
  content: string
  tag: string
  spans?: Array<{
    text: string
    font: string
    size: number
    bbox: number[]
    color: number[]
  }>
}

type Props = {
  region: Region;
  index: number;
  onSaveTag: (index: number, newTag: string) => void;
}

// List of all valid tags for the dropdown:
const ALL_TAGS = [
  "title",
  "subtitle",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "paragraph",
  "image_caption",
  "image",
  "header",
  "footer",
  "form_label",
  "checkbox",
] as const;


export default function RegionCard({ region, index, onSaveTag }: Props) {

    const [editMode, setEditMode] = useState(false);
    const [selectedTag, setSelectedTag] = useState<string>(region.tag);
    const [showSpans, setShowSpans] = useState(false);

    const handleSave = () => {
        onSaveTag(index, selectedTag);
        setEditMode(false);
    };


    return (
        <Card className="mb-4 bg-gray-800 text-gray-100">
        <CardHeader className="border-b border-gray-700 flex justify-between items-center">
            <CardTitle className="text-sm uppercase text-blue-400">
            AI Tag:
            {editMode ? (
                <select
                className="ml-2 bg-gray-700 text-white text-xs rounded px-2 py-1"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                >
                {ALL_TAGS.map((t) => (
                    <option key={t} value={t}>
                    {t}
                    </option>
                ))}
                </select>
            ) : (
                <span className="ml-1">{region.tag}</span>
            )}
            </CardTitle>

            {editMode ? (
            <button
                onClick={handleSave}
                className="text-sm text-green-300 hover:underline"
            >
                Save
            </button>
            ) : (
            <button
                onClick={() => setEditMode(true)}
                className="text-sm text-blue-300 hover:underline"
            >
                Edit
            </button>
            )}
        </CardHeader>

        <CardContent className="space-y-2 text-xs">
            <div>
                <span className="font-medium text-green-300">Page:</span>{" "}
                    {region.page}
            </div>
            <div>
                <span className="font-medium text-green-300">Type:</span>{" "}
                    {region.type}
            </div>
            <div>
                <span className="font-medium text-green-300">Content:</span>
                <p className="mt-1 px-2 py-1 bg-gray-700 rounded">
                    {region.content}
                </p>
            </div>
            <div>
                <span className="font-medium text-green-300">BBox:</span>
                <code className="block mt-1 px-2 py-1 bg-gray-700 rounded">
                    [{region.bbox.map((n) => n.toFixed(1)).join(", ")}]
                </code>
            </div>
            {region.spans && region.spans.length > 0 && (
                <div className="mt-2">
                    <button
                    onClick={() => setShowSpans((v) => !v)}
                    className="text-xs text-blue-300 hover:underline mb-2"
                    >
                    {showSpans ? "Hide spans" : "Show spans"}
                    </button>

                    {showSpans && (
                    <div className="space-y-1 ml-2">
                        {region.spans.map((s, i) => (
                        <div key={i} className="p-2 bg-gray-700 rounded">
                            <div>
                            <span className="font-medium text-green-300">Text:</span> {s.text}
                            </div>
                            <div>
                            <span className="font-medium text-green-300">Font:</span> {s.font} @ {s.size.toFixed(1)}
                            </div>
                            <div>
                            <span className="font-medium text-green-300">BBox:</span> [{s.bbox.map((n) => n.toFixed(1)).join(", ")}]
                            </div>
                            <div className="flex items-center">
                            <span className="font-medium text-green-300">Color:</span>
                            <span
                                className="inline-block w-4 h-4 ml-2 rounded border"
                                style={{
                                backgroundColor: `rgb(${s.color.map((c) => Math.round(c * 255)).join(",")})`,
                                }}
                            />
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            )}
            </CardContent>
        </Card>
    );
}
