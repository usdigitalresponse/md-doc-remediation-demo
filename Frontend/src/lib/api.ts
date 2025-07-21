// src/lib/api.ts
import axios from "axios";

import type { TagResponse } from "@/models/TagResponse";

// Now VITE_API_URL should be like "http://127.0.0.1:8000/"
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function uploadPdf(file: File): Promise<TagResponse> {
  const form = new FormData();
  form.append("file", file);

  const { data } = await axios.post<TagResponse>(
    `${API_BASE}api/ai-tag`,  // note the added `/api`
    form,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

/**
 * Send the reviewed tags + metadata back to the backend to generate
 * an accessible PDF. Expects the identical JSON shape of TagResponse.
 * Returns the raw PDF blob.
 */

export async function generatePdf(payload: TagResponse): Promise<Blob> {

    const { data } = await axios.post<Blob>(
        `${API_BASE}api/generate_pdf`,
        payload,
        {
            responseType: "blob",
            headers: { "Content-Type": "application/json" },
        }
    );

    return data;
    
}
