# Favicon Generation Guide for Tunde Odunlade Arts & Culture Connexions

This guide will help you generate proper favicon files from your logo (`/Assets/logo.png`).

## Method 1: Online Favicon Generator (Easiest)

### Recommended Tool: RealFaviconGenerator.net
**URL:** https://realfavicongenerator.net/

### Steps:
1. **Prepare your logo:**
   - Open `/frontend/public/Assets/logo.png` in any image viewer
   - Ensure the logo is clear and recognizable at small sizes
   - Ideally, the logo should be square or have a square aspect ratio

2. **Generate favicons:**
   - Go to https://realfavicongenerator.net/
   - Click "Select your Favicon image"
   - Upload your `logo.png` file
   - Wait for the tool to analyze and generate previews

3. **Configure options:**
   - **iOS:** Leave default settings or customize background color if needed
   - **Android Chrome:** Accept default manifest settings
   - **Windows Metro:** Choose a tile color that matches your brand
   - **Favicon for Desktop:** Accept defaults
   - Scroll down and click "Generate your Favicons and HTML code"

4. **Download and install:**
   - Click "Favicon package" to download a ZIP file
   - Extract the ZIP file
   - You'll find multiple files including:
     - `favicon.ico` (multi-resolution ICO file)
     - `favicon-16x16.png`
     - `favicon-32x32.png`
     - `apple-touch-icon.png` (180x180)
     - `android-chrome-192x192.png`
     - `android-chrome-512x512.png`

5. **Replace files in your project:**
   - Copy `favicon.ico` → `frontend/public/favicon.ico`
   - Copy `favicon-32x32.png` → `frontend/public/favicon.png`
   - **Optional:** Copy `apple-touch-icon.png` → `frontend/public/Assets/logo.png` (if you want to use it)

6. **Also update app directory:**
   - Copy `favicon.ico` → `frontend/src/app/favicon.ico` (Next.js 13+ requires this)

---

## Method 2: Using GIMP (Free Image Editor)

### Steps:
1. **Install GIMP** (if not already installed):
   - Download from: https://www.gimp.org/
   - Install and launch GIMP

2. **Open your logo:**
   - File → Open → Select `frontend/public/Assets/logo.png`

3. **Resize for favicon:**
   - Image → Scale Image
   - Set width and height to **512x512 pixels** (or maintain aspect ratio)
   - Click "Scale"

4. **Create favicon.ico:**
   - File → Export As
   - Name it `favicon.ico`
   - Click "Export"
   - In the export dialog:
     - Check "Save as ICO"
     - Click "Export"

5. **Create favicon.png (32x32):**
   - Image → Scale Image → Set to **32x32**
   - File → Export As → `favicon.png`
   - Format: PNG
   - Click "Export"

6. **Copy files to project:**
   - Copy `favicon.ico` to `frontend/public/` and `frontend/src/app/`
   - Copy `favicon.png` to `frontend/public/`

---

## Method 3: Using ImageMagick (Command Line)

### For Windows (PowerShell):
```powershell
# Install ImageMagick first: https://imagemagick.org/script/download.php

# Navigate to your logo directory
cd frontend\public\Assets

# Create favicon.ico with multiple sizes
magick logo.png -define icon:auto-resize=256,128,96,64,48,32,16 favicon.ico

# Create 32x32 PNG
magick logo.png -resize 32x32 favicon.png

# Create 16x16 PNG
magick logo.png -resize 16x16 favicon-16x16.png

# Create apple-touch-icon (180x180)
magick logo.png -resize 180x180 apple-touch-icon.png

# Move files to public directory
Move-Item favicon.ico ..\favicon.ico
Move-Item favicon.png ..\favicon.png

# Copy to app directory
Copy-Item ..\favicon.ico ..\..\src\app\favicon.ico
```

---

## Method 4: Using Online Tool - Favicon.io

### Steps:
1. Go to https://favicon.io/favicon-converter/
2. Upload your `logo.png` file
3. Click "Download" to get the favicon package
4. Extract and use the generated files

---

## Quick Steps Summary (Recommended: Method 1)

1. ✅ Go to https://realfavicongenerator.net/
2. ✅ Upload `frontend/public/Assets/logo.png`
3. ✅ Configure any custom settings (optional)
4. ✅ Generate and download the favicon package
5. ✅ Replace these files in your project:
   - `frontend/public/favicon.ico` ← Replace with generated `favicon.ico`
   - `frontend/public/favicon.png` ← Replace with generated `favicon-32x32.png`
   - `frontend/src/app/favicon.ico` ← Replace with generated `favicon.ico`
6. ✅ Commit and push to GitHub
7. ✅ Vercel will automatically redeploy

---

## File Requirements

Your favicon files should be:
- **favicon.ico**: Multi-resolution ICO file (16x16, 32x32, 48x48 sizes)
- **favicon.png**: 32x32 PNG file
- **Size**: Keep files small (< 100KB each for better performance)

---

## Testing After Generation

1. **Local testing:**
   ```bash
   cd frontend
   npm run dev
   ```
   - Open http://localhost:3000
   - Check browser tab for favicon

2. **After deployment:**
   - Clear browser cache (Ctrl+Shift+R)
   - Check https://www.tundeodunladearts.com/favicon.ico directly
   - Verify it shows your logo, not Vercel's default

3. **Browser cache clearing:**
   - Chrome/Edge: Ctrl+Shift+Delete → Clear cached images
   - Firefox: Ctrl+Shift+Delete → Clear cache
   - Or use Incognito/Private window to test

---

## Troubleshooting

### Favicon still showing old image:
- Clear browser cache completely
- Hard refresh (Ctrl+Shift+R)
- Check that files are correctly placed in both `public/` and `src/app/` directories
- Verify file sizes are reasonable (not 9.7MB!)

### Favicon not appearing:
- Check browser console for 404 errors
- Verify file paths in `layout.tsx` are correct
- Ensure files exist in the correct directories
- Check Vercel deployment logs

### Favicon looks blurry:
- Regenerate with higher resolution source image
- Ensure source logo is at least 512x512 pixels
- Use a vector/PNG source instead of JPG if possible

---

## Notes

- The current `favicon.ico` and `favicon.png` files (9.7MB each) are too large and likely incorrect
- Favicon files should typically be under 100KB
- Next.js 13+ uses the `favicon.ico` in the `app` directory automatically
- The metadata in `layout.tsx` now points to `/Assets/logo.png`, which is correct

---

## After Generation Checklist

- [ ] Generated `favicon.ico` (< 100KB)
- [ ] Generated `favicon.png` (32x32, < 50KB)
- [ ] Replaced `frontend/public/favicon.ico`
- [ ] Replaced `frontend/public/favicon.png`
- [ ] Replaced `frontend/src/app/favicon.ico`
- [ ] Committed changes to Git
- [ ] Pushed to GitHub
- [ ] Verified on live site after deployment
- [ ] Cleared browser cache and tested

