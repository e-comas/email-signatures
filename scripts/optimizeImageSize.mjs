#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const [, , input, output] = process.argv;

const TARGET_DIMENSION = 200*2;
const TARGET_SIZE = 32 << 10;

const getImagePool = (async function* generateImagePool() {
  let imagePool, closeImagePool;
  // Lazy-load libSquoosh as it registers globals clashing with other packages.
  const squoosh = await import("@squoosh/lib");
  do {
    const imagePoolClosing = new Promise((resolve) => {
      closeImagePool = resolve;
    }).then(() => imagePool?.close());
    yield {
      get imagePool() {
        return (imagePool = new squoosh.ImagePool());
      },
      closeImagePool,
    };
    await imagePoolClosing;
  } while (1);
})();

function* dichotomy() {
  let cache = new Map();
  // Color Quantization maxes at 256 colors and mins at 2.
  let max = 256;
  let min = 2;
  let nextCurrent = (max + min) / 2;
  let current;
  
  do {
    current = Math.round(nextCurrent);
    const imgData = yield current;
    cache.set(current, imgData);
    if (imgData.size > TARGET_SIZE) {
      nextCurrent = (current + min) / 2;
      max = current;
    } else {
      nextCurrent = (current + max) / 2;
      min = current;
    }
  } while (max - min > 1);

  const checkAndYield = function* (val) {
    if (val >= 2 && val <= 256 && cache.get(val) == null) {
      cache.set(val, yield val);
    }
  };

  yield* checkAndYield(current - 1);
  yield* checkAndYield(current + 1);
  yield* checkAndYield(current - 2);
  yield* checkAndYield(current + 2);

  let bestEntry = null;
  let fallbackEntry = null;

  for (const [colors, imgData] of cache.entries()) {
    // 1. Look for the smallest size that still satisfies >= TARGET_SIZE
    if (imgData.size >= TARGET_SIZE) {
      if (bestEntry === null || imgData.size < bestEntry.imgData.size) {
        bestEntry = { colors, imgData };
      }
    }
    // 2. Track the absolute largest size just in case max quality is still < TARGET_SIZE
    if (fallbackEntry === null || imgData.size > fallbackEntry.imgData.size) {
      fallbackEntry = { colors, imgData };
    }
  }

  // Return best match >= target, or default to highest quality if target unreachable
  return bestEntry || fallbackEntry;
}

export async function optimizeMatrix(url) {
  const {
    value: { imagePool, closeImagePool },
  } = await getImagePool.next();

  const fileContent = await fs.readFile(url);
  const image = imagePool.ingestImage(fileContent);

  const {
    bitmap: { width: originalWidth, height: originalHeight },
  } = await image.decoded;

  const scale =
    TARGET_DIMENSION /
    (originalHeight > originalWidth ? originalWidth : originalHeight);
    
  const width = Math.round(originalWidth * scale);
  const height = Math.round(originalHeight * scale);

  const colorGenerator = dichotomy();
  let imgData;

  while (true) {
    const { done, value } = colorGenerator.next(imgData);
    if (done) {
      closeImagePool();
      return value; 
    }

    await image.preprocess({
      resize: {
        enabled: true,
        width,
        height,
      },
      quant: {
        enabled: true,
        numColors: value,
        dither: 1.0, 
      },
    });

    await image.encode({ oxipng: { level: 2 } });

    for (const encodedImage of Object.values(image.encodedWith)) {
      imgData = await encodedImage;
    }
  }
}

{
  if (!input || !output) {
    throw new Error("Usage: ./optimizeImageSize.mjs input.png output.png");
  }
  console.log({ input, output });
  const result = await optimizeMatrix(path.resolve(input));
  console.log({
    numColors: result.colors,
    size: result.imgData.size,
    kb: (result.imgData.size / 1024).toFixed(2), // slightly more readable than bitshift
  });
  await fs.writeFile(path.resolve(output), result.imgData.binary);
  console.log("done");
}

// await fs.mkdir(OUTPUT_DIR, { recursive: true });
// for await (const dirent of await fs.opendir(INPUT_DIR)) {
//   if (dirent.name.endsWith(".png")) {
//     console.log(dirent);
//     const imgData = await optimizeMatrix(new URL(dirent.name, INPUT_DIR));
//     console.log({
//       quality: imgData.optionsUsed.quality,
//       size: imgData.size,
//       kb: imgData.size >> 10,
//     });
//     await fs.writeFile(
//       new URL(`./${dirent.name.slice(0, -3)}${imgData.extension}`, OUTPUT_DIR),
//       imgData.binary
//     );
//   }
// }
