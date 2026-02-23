/**
 * Resize and compress public/images/services/header.png
 * Run: node scripts/compress-header.js
 * Requires: npm install --save-dev sharp
 */
const path = require("path");
const fs = require("fs");

const dir = path.join(__dirname, "..", "public", "images", "services");
const inputPath = path.join(dir, "header.png");
const backupPath = path.join(dir, "header-backup.png");
const tempPath = path.join(dir, "header-temp.png");

if (!fs.existsSync(inputPath)) {
  console.error("File not found:", inputPath);
  process.exit(1);
}

async function run() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (e) {
    console.error("Install sharp first: npm install --save-dev sharp");
    process.exit(1);
  }

  const maxWidth = 1040; // enough for 2x retina
  const before = fs.statSync(inputPath).size;

  // Allow very large input images (script will resize down)
  await sharp(inputPath, { limitInputPixels: false })
    .resize(maxWidth, null, { withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(tempPath);

  const after = fs.statSync(tempPath).size;
  fs.renameSync(inputPath, backupPath);
  fs.renameSync(tempPath, inputPath);
  console.log("Optimized header.png");
  console.log("Before:", (before / 1024).toFixed(1), "KB");
  console.log("After:", (after / 1024).toFixed(1), "KB");
  console.log("Backup saved as header-backup.png (you can delete it).");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
