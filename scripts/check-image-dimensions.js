// scripts/check-image-dimensions.js
const fs = require('fs');
const path = require('path');
const { imageSizeFromFile } = require('image-size/fromFile');

const dir = path.join(__dirname, '../public/imgs');

async function main() {
  const files = await fs.promises.readdir(dir);
  for (const file of files.filter((f) => /\.(png|jpg|jpeg)$/i.test(f))) {
    const filePath = path.join(dir, file);
    try {
      const dimensions = await imageSizeFromFile(filePath);
      console.log(`${file}: ${dimensions.width}x${dimensions.height}`);
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  }
}
main();
