#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);
const SCRIPTS = path.join(ROOT, 'scripts');
const DIST = path.join(ROOT, 'dist');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJsonSafe(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch {
    return null;
  }
}

function isDirectory(filepath) {
  try {
    return fs.statSync(filepath).isDirectory();
  } catch {
    return false;
  }
}

function isFile(filepath) {
  try {
    return fs.statSync(filepath).isFile();
  } catch {
    return false;
  }
}

function listFilesRecursive(rootDir) {
  /** @type {{ abs: string, rel: string }[]} */
  const out = [];

  /** @param {string} dir */
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(abs);
        continue;
      }
      if (!ent.isFile()) continue;
      const rel = path.relative(rootDir, abs).split(path.sep).join('/');
      out.push({ abs, rel });
    }
  }

  walk(rootDir);
  return out;
}

function buildTree(filePaths) {
  /** @typedef {{ name: string, type: 'file' | 'dir', children?: any[] }} TreeNode */

  /** @type {{ children: Map<string, any> }} */
  const root = { children: new Map() };

  for (const filePath of filePaths) {
    const parts = filePath.split('/').filter(Boolean);
    if (parts.length === 0) continue;

    let cur = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (!cur.children.has(part)) {
        if (isLast) {
          cur.children.set(part, { name: part, type: 'file' });
        } else {
          cur.children.set(part, { name: part, type: 'dir', children: new Map() });
        }
      }

      const next = cur.children.get(part);
      if (!isLast && next && next.type === 'dir') cur = next;
    }
  }

  function toJson(node, parentPath) {
    if (!node || node.type === 'file') {
      if (!node) return node;
      const filePath = parentPath ? `${parentPath}/${node.name}` : node.name;
      return { name: node.name, type: 'file', path: filePath };
    }

    const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;

    const children = [...node.children.values()]
      .map(c => toJson(c, currentPath))
      .filter(Boolean)
      .sort((a, b) => {
        if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });

    return { name: node.name, type: 'dir', children };
  }

  return [...root.children.values()]
    .map(n => toJson(n, ''))
    .filter(Boolean)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

function scan() {
  const entries = [];

  for (const version of fs.readdirSync(SCRIPTS)) {
    const versionDir = path.join(SCRIPTS, version);
    if (!isDirectory(versionDir)) continue;

    for (const scriptId of fs.readdirSync(versionDir)) {
      const scriptDir = path.join(versionDir, scriptId);
      if (!isDirectory(scriptDir)) continue;

      const settings = readJsonSafe(path.join(scriptDir, 'settings.json'));
      if (!settings) continue;

      // Read ALL text files in the script directory (and any nested folders in the future),
      // excluding settings.json which is used only for metadata.
      const allFiles = listFilesRecursive(scriptDir)
        .filter(({ rel, abs }) => rel !== 'settings.json' && isFile(abs));

      /** @type {Record<string, string>} */
      const files = {};
      for (const f of allFiles) {
        try {
          files[f.rel] = fs.readFileSync(f.abs, 'utf8');
        } catch {
          // If a file can't be read as text, skip it from the index.
        }
      }

      const filePaths = Object.keys(files);

      entries.push({
        id: `${version}/${scriptId}`,
        version,
        name: settings.name || scriptId,
        description: settings.description || '',
        authors: settings.authors || [],
        tags: settings.tags || [],
        files,
        tree: buildTree(filePaths),
        _scriptDir: scriptDir,
      });
    }
  }

  return entries;
}

function build(entries) {
  ensureDir(DIST);

  // Copy all script files to dist/ for direct access (same relative layout).
  for (const entry of entries) {
    const srcDir = entry._scriptDir;
    const destDir = path.join(DIST, entry.id);

    for (const { abs, rel } of listFilesRecursive(srcDir)) {
      // Keep settings.json out of the search index, but copying it is harmless.
      // Preserve everything for direct access.
      const dest = path.join(destDir, rel);
      ensureDir(path.dirname(dest));
      try {
        fs.copyFileSync(abs, dest);
      } catch {
        console.warn(`  Failed: ${abs}`);
      }
    }
  }

  const clean = entries.map(({ _scriptDir, ...rest }) => rest);

  const versions = [...new Set(clean.map(e => e.version))]
    .sort((a, b) => parseInt(b.replace('v', '')) - parseInt(a.replace('v', '')));

  const allTags = [...new Set(clean.flatMap(e => e.tags))].sort();

  const index = {
    generated: new Date().toISOString(),
    total: clean.length,
    versions,
    tags: allTags,
    entries: clean,
  };

  fs.writeFileSync(path.join(DIST, 'index.json'), JSON.stringify(index, null, 2));
  return index;
}

console.log('BSArchive Generator\n');
const entries = scan();
console.log(`Found ${entries.length} scripts`);
const index = build(entries);
console.log(`Generated: ${index.versions.length} versions, ${index.tags.length} tags`);
