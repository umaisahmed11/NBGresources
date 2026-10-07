import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Route types can survive restored build caches after a page is removed.
// Only remove generated types; keep the rest of Next's build cache.
const generatedTypes = fileURLToPath(new URL("../.next/types/", import.meta.url));
rmSync(generatedTypes, { recursive: true, force: true });
