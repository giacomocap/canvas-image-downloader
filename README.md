# Console-Based Canvas Image Downloader and SVG to PNG Converter

This JavaScript utility is designed to be run in a browser's console, allowing you to download images from the current webpage and convert SVG images to PNG format on the fly.

## 🚀 Features

- Download all images from the current webpage
- Convert SVG images to PNG format
- Handle both direct image URLs and blob URLs
- Run directly in the browser console
- No installation or setup required

## 🛠️ Usage

1. Open the webpage containing the images you want to download in your browser.

2. Open the browser's developer tools (usually F12 or Right-click > Inspect).

3. Navigate to the Console tab.

4. Copy and paste the entire content of `canvasImageDownloader.js` into the console.

5. Press Enter to define all the functions.

6. To download all images on the page, run:

   ```javascript
   await getAll();
   ```

7. To download a specific SVG as PNG, run:

   ```javascript
   DownloadSVG();
   ```

## 🔧 Main Functions

- `getAll()`: Initiates download of all images on the current page
- `svgToPng(svg, isUrl)`: Converts SVG to PNG
- `downloadImage(imageSrc, index, isUrl)`: Downloads individual images
- `DownloadSVG()`: Downloads the first SVG element on the page as PNG

## 📋 Requirements

- Modern web browser with developer tools, supporting:
  - Fetch API
  - Promises and async/await
  - Canvas API
  - Blob and URL APIs

## ⚠️ Limitations

- Only works on webpages where you have permission to run scripts in the console
- May not work on sites with strict Content Security Policies (CSP)
- Temporarily modifies the DOM during conversion (adds and removes elements)
- Basic error handling; errors will be logged to the console

## 🔍 Use Cases

- Quickly saving all images from a webpage
- Converting SVG images to PNG without leaving the browser
- Web scraping for images (where permitted)
- Debugging and testing image-related web development

## ⚖️ Disclaimer

This script is provided as-is for educational and personal use. Ensure you have the right to download and use images before utilizing this tool. Respect copyright and terms of service of the websites you use this on.

## 🛡️ Security Note

Be cautious when running scripts in your browser console, especially on sensitive websites. Only use this script on trusted websites or your own projects.
