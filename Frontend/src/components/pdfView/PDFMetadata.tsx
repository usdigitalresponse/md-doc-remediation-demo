// src/components/pdfView/PDFMetadata.tsx
import { useState } from "react";
import type { Metadata } from "@/models/Metadata";
import type { ChangeEvent } from "react";

type Props = {
  metadata: Metadata;
  onSave: (newMetadata: Metadata) => void;
};

/**
 * Convert a raw PDF date string (e.g., "D:20250519045555-07'00'")
 * into a human-readable format like "May 19, 2025, 04:55:55 AM".
 * If the input is empty or invalid, returns "None".
 */
function formatPdfDate(raw: string): string {
  if (!raw || !raw.startsWith("D:")) {
    return "None";
  }

  try {
    // Drop the "D:" prefix
    const ts = raw.slice(2);

    // Extract date/time components
    const year = ts.slice(0, 4);
    const month = ts.slice(4, 6);
    const day = ts.slice(6, 8);
    const hour = ts.slice(8, 10);
    const minute = ts.slice(10, 12);
    const second = ts.slice(12, 14);

    // The remainder is the timezone offset, e.g. "-07'00'"
    let offsetRaw = ts.slice(14); // e.g. "-07'00'"
    // Remove apostrophes and ensure colon in offset: "-07:00"
    offsetRaw = offsetRaw.replace(/'/g, "").replace(/^([+-]\d{2})(\d{2})$/, "$1:$2");

    // Build an ISO‐8601 string
    const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}${offsetRaw}`;
    const dateObj = new Date(iso);

    if (isNaN(dateObj.getTime())) {
      return "None";
    }

    // Format to a readable string, e.g. "May 19, 2025, 04:55:55 AM"
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return "None";
  }
}

export default function PDFMetadata({ metadata, onSave }: Props) {

    // local copy of metadata fields so we can edit them
  const [editMode, setEditMode] = useState(false);
  const [localMeta, setLocalMeta] = useState<Metadata>({ ...metadata });

  // Only these six keys will be editable
  const EDITABLE_KEYS: Array<keyof Pick<
    Metadata,
    "title" | "author" | "subject" | "keywords" | "creator" | "producer"
  >> = [
    "title",
    "author",
    "subject",
    "keywords",
    "creator",
    "producer",
  ];

  // Handle typing into text inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalMeta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // When Save is clicked, propagate changes up
  const handleSave = () => {
    onSave(localMeta);
    setEditMode(false);
  };

    return (
        <div className="mb-4 p-4 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 text-gray-100">
            <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
                PDF Metadata
            </h3>
            {editMode ? (
                <button
                onClick={handleSave}
                className="text-sm text-green-300 hover:underline"
                >
                Save
                </button>
            ) : (
                <button
                onClick={() => {
                    setLocalMeta({ ...metadata });
                    setEditMode(true);
                }}
                className="text-sm text-blue-300 hover:underline"
                >
                Edit
                </button>
            )}
            </div>

            <dl className="grid grid-cols-1 gap-2 text-sm">
            {/* new filename row */}
            <div className="flex justify-between">
                <dt className="font-medium text-green-300">Filename:</dt>
                <dd>{metadata.filename}</dd>
            </div>
            {EDITABLE_KEYS.map((key) => (
                <div className="flex justify-between" key={key}>
                <dt className="font-medium text-green-300">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                </dt>
                {editMode ? (
                    <dd className="w-2/3">
                    <input
                        type="text"
                        name={key}
                        value={localMeta[key] || ""}
                        onChange={handleChange}
                        className="w-full px-2 py-1 text-black rounded bg-gray-200"
                    />
                    </dd>
                ) : (
                    <dd>{metadata[key]?.trim() || "None"}</dd>
                )}
                </div>
            ))}

            <div className="flex justify-between">
                <dt className="font-medium text-green-300">Creation Date:</dt>
                <dd>{formatPdfDate(metadata.creation_date)}</dd>
            </div>
            <div className="flex justify-between">
                <dt className="font-medium text-green-300">Modified Date:</dt>
                <dd>{formatPdfDate(metadata.mod_date)}</dd>
            </div>
            </dl>
        </div>
    );
}

