import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";

const root = resolve(".");
const outputDirectory = join(root, "public", "source-export");
const ignoredDirectories = new Set([".git", "node_modules", "dist", "source-export"]);
const ignoredFiles = [/^\.env(?:\.|$)/, /\.pem$/i, /\.key$/i, /credentials/i];

async function collectFiles(directory = root) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    const projectPath = relative(root, absolutePath).split(sep).join("/");

    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name) || projectPath === "public/source-export") {
        continue;
      }
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && !ignoredFiles.some((pattern) => pattern.test(entry.name))) {
      files.push({ absolutePath, projectPath });
    }
  }

  return files.sort((a, b) => a.projectPath.localeCompare(b.projectPath));
}

function isText(buffer, path) {
  const textExtensions = new Set([
    ".css",
    ".html",
    ".js",
    ".json",
    ".jsx",
    ".lock",
    ".md",
    ".mjs",
    ".toml",
    ".ts",
    ".tsx",
    ".txt",
    ".yaml",
    ".yml",
  ]);
  if (textExtensions.has(extname(path))) return true;
  if (buffer.includes(0)) return false;

  const sample = buffer.subarray(0, Math.min(buffer.length, 8000));
  let printable = 0;
  for (const byte of sample) {
    if (byte === 9 || byte === 10 || byte === 13 || byte >= 32) printable += 1;
  }
  return sample.length === 0 || printable / sample.length > 0.96;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createZip(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.path);
    const data = entry.content;
    const checksum = crc32(data);
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt32LE(0, 10);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(data.length, 18);
    localHeader.writeUInt32LE(data.length, 22);
    localHeader.writeUInt16LE(name.length, 26);

    localParts.push(localHeader, name, data);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt32LE(0, 12);
    centralHeader.writeUInt32LE(checksum, 16);
    centralHeader.writeUInt32LE(data.length, 20);
    centralHeader.writeUInt32LE(data.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, name);

    offset += localHeader.length + name.length + data.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0);
  endRecord.writeUInt16LE(entries.length, 8);
  endRecord.writeUInt16LE(entries.length, 10);
  endRecord.writeUInt32LE(centralDirectory.length, 12);
  endRecord.writeUInt32LE(offset, 16);

  return Buffer.concat([...localParts, centralDirectory, endRecord]);
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const sourceFiles = await collectFiles();
const archiveEntries = [];
const manifestFiles = [];
const externalResources = new Set();

for (const file of sourceFiles) {
  const content = await readFile(file.absolutePath);
  const fileStat = await stat(file.absolutePath);
  const text = isText(content, file.projectPath);

  archiveEntries.push({
    path: `frangao/${file.projectPath}`,
    content,
  });

  if (text) {
    const source = content.toString("utf8");
    for (const match of source.matchAll(/https?:\/\/[^\s"'`)]+/g)) {
      externalResources.add(match[0]);
    }
    manifestFiles.push({
      path: file.projectPath,
      size: fileStat.size,
      type: "text",
      content: source,
    });
  } else {
    const binaryPath = join(outputDirectory, "files", file.projectPath);
    await mkdir(dirname(binaryPath), { recursive: true });
    await writeFile(binaryPath, content);
    manifestFiles.push({
      path: file.projectPath,
      size: fileStat.size,
      type: "binary",
      url: `/source-export/files/${file.projectPath}`,
    });
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  totalFiles: manifestFiles.length,
  totalSize: manifestFiles.reduce((sum, file) => sum + file.size, 0),
  files: manifestFiles,
  externalResources: [...externalResources].sort(),
};

await writeFile(join(outputDirectory, "manifest.json"), JSON.stringify(manifest));
await writeFile(join(outputDirectory, "frangao-projeto-completo.zip"), createZip(archiveEntries));

console.log(
  `Source export generated with ${manifest.totalFiles} files (${manifest.totalSize} bytes).`,
);
