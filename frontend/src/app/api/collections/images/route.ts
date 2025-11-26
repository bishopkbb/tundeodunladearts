import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const imagesDirectory = join(process.cwd(), 'public', 'Assets', 'picturedoscope');
    
    // Read all files from the directory
    const files = await readdir(imagesDirectory);
    
    // Filter only .jpg files, exclude IMG-20251121-WA0050, and create image paths
    const imageFiles = files
      .filter(file => file.toLowerCase().endsWith('.jpg') && file !== 'IMG-20251121-WA0050.jpg')
      .map(file => ({
        id: `collection-${file.replace('.jpg', '').replace(/\s+/g, '-')}`,
        src: `/Assets/picturedoscope/${file}`,
      }))
      .sort((a, b) => {
        // Sort by filename (reverse for newest first if numbered)
        return b.src.localeCompare(a.src);
      });
    
    return NextResponse.json({ images: imageFiles });
  } catch (error: unknown) {
    console.error('Error reading collection images:', error);
    // Return empty array on error
    return NextResponse.json({ images: [] });
  }
}

