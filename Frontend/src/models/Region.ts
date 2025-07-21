import type { Span } from "./Span";
export interface Region {
  page: number;
  type: string;
  content: string;
  bbox: number[];
  tag: string;
  spans?: Span[];
  xref?: number;
  raw_png?: string;
  image_width?: number;
  image_height?: number;
}