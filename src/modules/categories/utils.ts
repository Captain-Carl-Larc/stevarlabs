// File: utils.ts
// Folder: src/modules/categories
// Description: Shared utilities for category module.

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}