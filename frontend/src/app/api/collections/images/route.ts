import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const imagesDirectory = join(process.cwd(), 'public', 'Assets', 'picturedoscope');
    
    // Read all files from the directory
    const files = await readdir(imagesDirectory);
    console.log(`📁 Found ${files.length} files in picturedoscope directory`);
    
    // Filter only .jpg files, exclude specific images, and create image paths
    const excludedImages = [
      'IMG-20251121-WA0050.jpg',
      'IMG-20251026-WA0053.jpg',
      'IMG-20251026-WA0054.jpg',
      'IMG-20251026-WA0055.jpg',
      'IMG-20251026-WA0056.jpg',
      'IMG-20251026-WA0057.jpg',
      'IMG-20251026-WA0058.jpg',
      'IMG-20251026-WA0059.jpg',
    ];
    
    const imageFiles = files
      .filter(file => {
        const isJpg = file.toLowerCase().endsWith('.jpg');
        const isExcluded = excludedImages.includes(file);
        return isJpg && !isExcluded;
      })
      .map(file => ({
        id: `collection-${file.replace('.jpg', '').replace(/\s+/g, '-')}`,
        src: `/Assets/picturedoscope/${file}`,
      }))
      .sort((a, b) => {
        // Sort by filename (reverse for newest first if numbered)
        return b.src.localeCompare(a.src);
      });
    
    console.log(`✅ Returning ${imageFiles.length} images after filtering`);
    if (imageFiles.length > 0) {
      console.log(`📸 Sample image path: ${imageFiles[0].src}`);
    }
    
    return NextResponse.json({ images: imageFiles });
  } catch (error: unknown) {
    console.error('❌ Error reading collection images:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    // Return empty array on error
    return NextResponse.json({ images: [], error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

