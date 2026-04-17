import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const assetsDir = join(__dirname, '../src/assets')

const sourceCandidates = [
  join(assetsDir, 'profile-original.jpg'),
  join(assetsDir, 'profile-original.jpeg'),
  join(assetsDir, 'profile.webp'),
]

const sourceImage = sourceCandidates.find((candidate) => existsSync(candidate))

if (!sourceImage) {
  throw new Error('No profile source image found in src/assets')
}

const sourceBuffer = await sharp(sourceImage).rotate().toBuffer()

const variants = [
  { fileName: 'profile-320.webp', size: 320, quality: 68 },
  { fileName: 'profile-640.webp', size: 640, quality: 74 },
  { fileName: 'profile.webp', size: 800, quality: 78 },
]

await Promise.all(
  variants.map(async ({ fileName, size, quality }) => {
    await sharp(sourceBuffer)
      .resize(size, size, {
        fit: 'cover',
        position: 'attention',
        withoutEnlargement: true,
      })
      .webp({ quality, effort: 6 })
      .toFile(join(assetsDir, fileName))
  })
)

console.log(`\u2713 Profile image variants generated from ${sourceImage}`)
