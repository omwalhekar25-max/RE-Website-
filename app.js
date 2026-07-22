(function () {
  const FRAME_COUNT = 240;
  const canvas = document.getElementById("animation-canvas");
  const ctx = canvas.getContext("2d");
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loader-bar");
  const loaderText = document.getElementById("loader-text");

  const images = new Array(FRAME_COUNT);
  const loadedFlags = new Array(FRAME_COUNT).fill(false);
  let totalLoaded = 0;
  let lastDrawnIndex = -1;

  let currentFrameIndex = 0;
  let targetFrameIndex = 0;

  // Format frame filename
  function getFramePath(index) {
    const padded = String(index).padStart(5, '0');
    return `frames/frame_${padded}.jpg`;
  }

  // Preload all 240 frames concurrently with fallback readiness
  function preloadImages() {
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        loadedFlags[i] = true;
        totalLoaded++;

        const pct = Math.floor((totalLoaded / FRAME_COUNT) * 100);
        if (loaderBar) loaderBar.style.width = `${pct}%`;
        if (loaderText) loaderText.textContent = `${pct}%`;

        // Unlock loader once initial batch (or all) is ready
        if (totalLoaded >= 15 && loader && !loader.classList.contains("loaded")) {
          loader.classList.add("loaded");
        }

        // Draw initial frame if canvas is unrendered
        if (i === 0 || lastDrawnIndex === -1) {
          render();
        }
      };

      img.onerror = () => {
        totalLoaded++;
        if (totalLoaded >= 15 && loader && !loader.classList.contains("loaded")) {
          loader.classList.add("loaded");
        }
      };

      images[i] = img;
    }
  }

  // Match high-DPI canvas buffer to viewport
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    render();
  }

  // Compute scroll fraction across current document height
  function updateTargetFrame() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    
    targetFrameIndex = scrollFraction * (FRAME_COUNT - 1);
  }

  // Find nearest available loaded frame if exact target frame is pending download
  function getBestAvailableFrameIndex(targetIdx) {
    const intIdx = Math.round(targetIdx);
    if (loadedFlags[intIdx]) return intIdx;

    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      if (intIdx - offset >= 0 && loadedFlags[intIdx - offset]) return intIdx - offset;
      if (intIdx + offset < FRAME_COUNT && loadedFlags[intIdx + offset]) return intIdx + offset;
    }
    return 0;
  }

  // Render current frame with aspect-contain logic
  function render() {
    const frameToDraw = getBestAvailableFrameIndex(currentFrameIndex);
    const img = images[frameToDraw];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const bufferWidth = canvas.width;
    const bufferHeight = canvas.height;

    ctx.clearRect(0, 0, bufferWidth, bufferHeight);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Aspect contain calculation
    const scale = Math.min(bufferWidth / imgWidth, bufferHeight / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    const offsetX = (bufferWidth - drawWidth) / 2;
    const offsetY = (bufferHeight - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnIndex = frameToDraw;
  }

  // High-frequency animation loop
  function animLoop() {
    updateTargetFrame();

    const diff = targetFrameIndex - currentFrameIndex;
    if (Math.abs(diff) > 0.01) {
      currentFrameIndex += diff * 0.35;
    } else {
      currentFrameIndex = targetFrameIndex;
    }

    render();
    requestAnimationFrame(animLoop);
  }

  // Event Listeners
  window.addEventListener("scroll", updateTargetFrame, { passive: true });
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("wheel", updateTargetFrame, { passive: true });
  window.addEventListener("touchmove", updateTargetFrame, { passive: true });

  // Initialize
  resizeCanvas();
  preloadImages();
  requestAnimationFrame(animLoop);
})();
