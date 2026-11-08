// One-off: renders public/og.png (1200x630) from inline SVG with sharp.
import sharp from 'sharp'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F5F0E8"/>
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#E2D9CC" stroke-width="2"/>
  <text x="96" y="150" font-family="DejaVu Sans Mono, monospace" font-size="22" letter-spacing="3" fill="#6B5F52">THE LAB NOTEBOOK</text>
  <text x="96" y="300" font-family="DejaVu Serif, Georgia, serif" font-size="84" fill="#1A1612">Harshavardhan Reddy</text>
  <text x="96" y="380" font-family="DejaVu Serif, Georgia, serif" font-size="40" fill="#6B5F52">Full-stack developer. Systems minded.</text>
  <rect x="96" y="440" width="120" height="6" fill="#B5412A"/>
  <text x="96" y="520" font-family="DejaVu Sans Mono, monospace" font-size="24" fill="#6B5F52">bathalaharsha.vercel.app</text>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(new URL('../public/og.png', import.meta.url).pathname)
console.log('wrote public/og.png')
