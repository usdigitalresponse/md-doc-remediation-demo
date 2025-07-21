import type { Page } from "./Page";
import type { Region } from "./Region";
import type { Metadata } from "./Metadata";

export interface TagResponse {
    pages: Page[];
    structure: Region[];
    metadata: Metadata;
}