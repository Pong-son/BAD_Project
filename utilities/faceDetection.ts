import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';
import fs from 'fs';
 
const { Canvas, Image, ImageData } = canvas

faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

export const loadModels = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models')
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./models')
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./models')
}

export const faceDetection = async (filePath:string, fileName:string, newFileName:string):Promise <string> => {
  try {
    const input = await canvas.loadImage(filePath)
    const canvasElement = canvas.createCanvas(input.width, input.height);
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(input, 0, 0);

    const results = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()

    results.forEach(result => {
      const box = result.detection.box;
      const x = box.x;
      const y = box.y;
      const width = box.width;
      const height = box.height;

      // detect face
      const faceImageData = ctx.getImageData(x, y, width, height);

      // blur face
      const blurredFace = blurImage(faceImageData);
      ctx.putImageData(blurredFace, x, y);

    });
    const treatedFilePath = `./public/treatedPhoto/treated_${fileName}`;

    const output = fs.createWriteStream(treatedFilePath);
    const newPhoto = canvasElement.createJPEGStream();
    newPhoto.pipe(output);
    output.on('finish', () => {
      console.log(`Done`);
    });

    newFileName = `treated_${fileName}`
    return newFileName
  } catch (e) {
    console.log(e)
    return newFileName = ''
  }

} 

export const blurImage = (imageData:any) => {
  const { data, width, height } = imageData;
  const newImageData = new Uint8ClampedArray(data);

  const kernelSize = 5; // 模糊半徑
  const kernel = Array(kernelSize).fill(1 / kernelSize);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, a = 0;

      for (let ky = -Math.floor(kernelSize / 2); ky <= Math.floor(kernelSize / 2); ky++) {
        for (let kx = -Math.floor(kernelSize / 2); kx <= Math.floor(kernelSize / 2); kx++) {
          const px = Math.min(width - 1, Math.max(0, x + kx));
          const py = Math.min(height - 1, Math.max(0, y + ky));
          const offset = (py * width + px) * 4;

          r += data[offset] * kernel[kx + Math.floor(kernelSize / 2)];
          g += data[offset + 1] * kernel[kx + Math.floor(kernelSize / 2)];
          b += data[offset + 2] * kernel[kx + Math.floor(kernelSize / 2)];
          a += data[offset + 3] * kernel[kx + Math.floor(kernelSize / 2)];
        }
      }

      const offset = (y * width + x) * 4;
      newImageData[offset] = r;
      newImageData[offset + 1] = g;
      newImageData[offset + 2] = b;
      newImageData[offset + 3] = a;
    }
  }

  return new canvas.ImageData(newImageData, width, height);
}
