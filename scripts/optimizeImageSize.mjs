#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

// const INPUT_DIR = new URL("./", import.meta.url);
// const OUTPUT_DIR = new URL("./out/", import.meta.url);

const [, , input, output] = process.argv;

const TARGET_DIMENSION = 200 * 2;
const TARGET_SIZE = 15 << 10;

const getImagePool = (async function* generateImagePool() {
  let imagePool, closeImagePool;
  // Lazy-load libSquoosh as it registers globals clashing with other packages.
  // @see https://github.com/GoogleChromeLabs/squoosh/issues/1152
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
  let max = 100;
  let min = 50;
  let nextCurrent = (max + min) / 2;
  let current;
  do {
    current = Math.round(nextCurrent);
    const imgData = yield current;
    // console.log({ current, imgData });
    cache.set(current, imgData);
    if (imgData.size > TARGET_SIZE) {
      nextCurrent = (current + min) / 2;
      max = current;
    } else {
      nextCurrent = (current + max) / 2;
      min = current;
    }
  } while (max - min > 1);
  if (cache.get(current - 1) == null) {
    cache.set(current - 1, yield current - 1);
  }
  if (cache.get(current + 1) == null) {
    cache.set(current + 1, yield current + 1);
  }
  if (cache.get(current - 2) == null) {
    cache.set(current - 2, yield current - 2);
  }
  if (cache.get(current + 2) == null) {
    cache.set(current + 2, yield current + 2);
  }

  return Array.from(cache.values()).reduce((pv, cv) =>
    pv == null ||
    Math.abs(cv.size - TARGET_SIZE) < Math.abs(pv.size - TARGET_SIZE)
      ? cv
      : pv
  );
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
  const width = originalWidth * scale;
  const height = originalHeight * scale;

  const qualityGenerator = dichotomy();
  let imgData;

  while (true) {
    const { done, value } = qualityGenerator.next(imgData);
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
    });

    await image.encode({ mozjpeg: { quality: value } });

    for (const encodedImage of Object.values(image.encodedWith)) {
      imgData = await encodedImage;
    }
  }
}

{
  if (!input || !output) {
    throw new Error("Usage: ./optimizeImageSize.mjs input.png output.jpg");
  }
  console.log({input, output})
  const imgData = await optimizeMatrix(path.resolve(input));
  console.log({
    quality: imgData.optionsUsed.quality,
    size: imgData.size,
    kb: imgData.size >> 10,
  });
  await fs.writeFile(path.resolve(output), imgData.binary);
  console.log('done')
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
