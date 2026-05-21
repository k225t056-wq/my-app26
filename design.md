# Game Profile Card Generator - Design Document

## 1. Objective
Create a web-based "Game Self-Introduction Card Generator" that allows users to create, preview, and download custom profile cards. The application will be hostable on GitHub Pages and will prioritize layout stability to prevent text-shifting issues during image generation.

## 2. Technical Stack
- **HTML5**: Semantic structure for the UI.
- **Vanilla CSS**: Custom styling with a modern "Gaming/Cyberpunk" aesthetic. No external CSS frameworks to ensure maximum flexibility and lightweight performance.
- **Vanilla JavaScript**: 
    - Event handling for real-time preview.
    - Canvas API for robust, pixel-perfect card rendering.
    - File API for local image uploads.

## 3. Key Features
- **Dynamic Content**:
    - User inputs: Player Name, Main Game, Platform, Play Style, VC info, and Bio.
    - Theme color selection (modifies borders and accent elements).
- **Image Management**:
    - Avatar Upload: Support for local image files.
    - Background Upload: Support for local image files.
    - Pre-defined presets for quick start.
- **Image Generation (The "No Shift" Solution)**:
    - Direct rendering to an HTML5 Canvas using fixed pixel coordinates (1920x1080 resolution).
    - Ensures that fonts, positions, and images are exactly where they are placed, regardless of browser zoom or screen size.
    - Real-time preview by mapping the canvas output to a responsive image element.
- **Export**:
    - Download as a high-quality PNG.
    - (Optional) Copy to clipboard.

## 4. UI/UX Design
- **Two-Column Layout**:
    - Left side: Configuration panels (Inputs, Image selectors, Color pickers).
    - Right side: Live preview and Action buttons (Download, Share).
- **Responsive Design**: Mobile-friendly layout using CSS Grid and Flexbox.

## 5. Implementation Plan
1.  **Phase 1: UI Shell**: Setup `index.html` and `styles.css` with a gaming-themed layout.
2.  **Phase 2: Logic & State**: Implement basic state management in `app.js` to track user inputs.
3.  **Phase 3: Canvas Engine**: Develop the core rendering function that draws the background, avatar, text, and decorative elements to a 1080p canvas.
4.  **Phase 4: Image Handling**: Implement local file uploading and cropping/scaling for avatars and backgrounds.
5.  **Phase 5: Refinement & Validation**: Add polish (animations, hover states) and verify image output consistency.

## 6. Verification Strategy
- **Visual Consistency**: Compare the on-screen preview with the downloaded PNG.
- **Browser Compatibility**: Test in Chrome, Firefox, and Safari to ensure Canvas rendering and font loading are consistent.
- **Responsiveness**: Ensure the editor is usable on mobile devices.
