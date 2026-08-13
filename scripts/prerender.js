import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const serverPath = path.join(rootDir, "dist", "server", "server.js");
const clientDir = path.join(rootDir, "dist", "client");
const indexPath = path.join(clientDir, "index.html");

async function prerender() {
  console.log("Prerendering HTML entry point for static deployment...");
  try {
    const serverModule = await import(`file://${serverPath.replace(/\\/g, "/")}`);
    const server = serverModule.default ?? serverModule;

    const request = new Request("http://localhost/");
    const response = await server.fetch(request, {}, {});
    const html = await response.text();

    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }

    fs.writeFileSync(indexPath, html, "utf-8");
    console.log(`Successfully generated ${indexPath}`);
  } catch (error) {
    console.error("Prerender error:", error);
    process.exit(1);
  }
}

prerender();
