import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "./theme";

/**
 * Pure Three.js sphere — no React Three Fiber dependency.
 * Composites a background image + SVG logo into a canvas texture.
 */

/* SVG logo paths for "MAKER WEEK" — viewBox 0 0 144.41 92.37 */
const LOGO_PATHS = [
  "M27.41 29.07V9.8L19.83 29.07H14.58L6.99 10.05V29.07H0.84V0H9.29L17.29 19.64L24.87 0H33.77V29.07H27.42H27.41Z",
  "M57.46 23.17H46.23L44.14 29.07H37.33L48.28 0H55.78L66.6 29.07H59.55L57.46 23.17ZM48.36 17.26H55.41L51.93 7.22L48.36 17.26Z",
  "M79.93 17.63L76.65 21.28V29.07H70.17V0H76.65V12.22L87.27 0H95.8L84.48 12.59L95.84 29.07H87.76L79.93 17.63Z",
  "M99.4 29.07V0H117.81V6.11H105.88V11.65H116.7V17.35H105.88V22.93H117.85V29.08H99.4V29.07Z",
  "M132.08 18.25H129.78V29.07H123.3V0H134.82C140.56 0 144.25 3.94 144.25 9.1C144.25 13.04 142.08 16.03 138.51 17.3L144.41 29.07H137.28L132.07 18.25H132.08ZM133.6 12.67C136.27 12.67 137.7 11.19 137.7 9.14C137.7 6.97 136.27 5.61 133.6 5.61H129.79V12.66H133.6V12.67Z",
  "M0 39.56V75.39H143.58V39.56H0ZM46.25 71.92H39.57L33.38 52.65L27.15 71.92H20.34L12.43 42.85H19.32L24.12 61.46L30.15 42.85H36.79L42.82 61.51L47.54 42.85H54.18L46.27 71.92H46.25ZM76.18 71.92H57.73V42.85H76.14V48.96H64.21V54.5H75.03V60.2H64.21V65.78H76.18V71.93V71.92ZM100.08 71.92H81.63V42.85H100.04V48.96H88.11V54.5H98.93V60.2H88.11V65.78H100.08V71.93V71.92ZM123.12 71.92L115.29 60.48L112.01 64.13V71.92H105.53V42.85H112.01V55.07L122.63 42.85H131.16L119.84 55.44L131.2 71.92H123.12Z",
  "M39.13 92.23V85.85H43.17V87.19H40.55V88.41H42.93V89.66H40.55V90.88H43.18V92.23H39.13ZM41.49 85.4H40.27L41.21 84.21H42.84L41.49 85.4Z",
  "M44.38 92.23V85.85H46.69C48.61 85.85 49.9 87.07 49.9 89.05C49.9 91.03 48.61 92.24 46.69 92.24H44.39L44.38 92.23ZM46.63 90.89C47.61 90.89 48.41 90.32 48.41 89.04C48.41 87.76 47.61 87.19 46.63 87.19H45.8V90.89H46.63Z",
  "M50.92 92.23V85.85H52.36V92.23H50.92Z",
  "M56.6 87.21V92.23H55.18V87.21H53.22V85.85H58.58V87.21H56.61H56.6Z",
  "M59.43 92.23V85.85H60.87V92.23H59.43Z",
  "M65.2 85.71C66.99 85.71 68.51 87.02 68.51 89.04C68.51 91.06 66.99 92.36 65.2 92.36C63.41 92.36 61.88 91.05 61.88 89.04C61.88 87.03 63.4 85.71 65.2 85.71ZM65.2 90.96C66.08 90.96 67.04 90.37 67.04 89.03C67.04 87.69 66.09 87.09 65.2 87.09C64.31 87.09 63.35 87.69 63.35 89.03C63.35 90.37 64.3 90.96 65.2 90.96Z",
  "M73.57 92.23L70.94 88.03V92.23H69.53V85.85H71.26L73.65 89.73V85.85H75.07V92.23H73.57Z",
  "M78.74 87.76H80.04L80.34 86.39H81.37L81.07 87.76H82.2L82.5 86.39H83.54L83.24 87.76H84.35V88.7H83.04L82.79 89.87H83.89V90.82H82.58L82.28 92.22H81.24L81.54 90.82H80.41L80.11 92.22H79.08L79.38 90.82H78.3V89.87H79.59L79.84 88.7H78.74V87.76ZM80.62 89.87H81.75L82 88.7H80.87L80.62 89.87Z",
  "M85.03 88.72C85 88.65 84.98 88.41 84.98 88.23C84.98 87.19 85.76 86.25 87.17 86.25C88.58 86.25 89.34 87.12 89.34 88.17C89.34 88.93 88.93 89.55 88.19 89.99L87.08 90.65C86.91 90.76 86.76 90.88 86.68 91.05H89.38V92.24H84.94C84.94 91.17 85.25 90.29 86.32 89.67L87.27 89.11C87.73 88.84 87.91 88.6 87.91 88.21C87.91 87.82 87.65 87.52 87.13 87.52C86.58 87.52 86.31 87.9 86.31 88.38C86.31 88.5 86.33 88.62 86.36 88.74H85.03V88.72Z",
  "M90.46 87.25C90.85 86.67 91.5 86.25 92.44 86.25C93.38 86.25 94.04 86.66 94.43 87.25C94.84 87.86 94.94 88.59 94.94 89.31C94.94 90.03 94.83 90.76 94.43 91.37C94.04 91.95 93.39 92.37 92.44 92.37C91.49 92.37 90.85 91.95 90.46 91.37C90.05 90.76 89.95 90.03 89.95 89.31C89.95 88.59 90.06 87.86 90.46 87.25ZM91.59 90.58C91.75 90.9 92.01 91.12 92.45 91.12C92.89 91.12 93.14 90.9 93.3 90.58C93.47 90.24 93.53 89.78 93.53 89.31C93.53 88.84 93.48 88.38 93.3 88.04C93.14 87.72 92.89 87.5 92.45 87.5C92.01 87.5 91.76 87.72 91.59 88.04C91.43 88.38 91.37 88.84 91.37 89.31C91.37 89.78 91.42 90.24 91.59 90.58Z",
  "M95.59 88.72C95.56 88.65 95.54 88.41 95.54 88.23C95.54 87.19 96.32 86.25 97.73 86.25C99.14 86.25 99.9 87.12 99.9 88.17C99.9 88.93 99.49 89.55 98.75 89.99L97.64 90.65C97.47 90.76 97.32 90.88 97.24 91.05H99.94V92.24H95.5C95.5 91.17 95.81 90.29 96.88 89.67L97.83 89.11C98.29 88.84 98.47 88.6 98.47 88.21C98.47 87.82 98.21 87.52 97.69 87.52C97.14 87.52 96.87 87.9 96.87 88.38C96.87 88.5 96.89 88.62 96.92 88.74H95.59V88.72Z",
  "M100.55 88.72C100.52 88.65 100.5 88.41 100.5 88.23C100.5 87.19 101.28 86.25 102.69 86.25C104.1 86.25 104.86 87.12 104.86 88.17C104.86 88.93 104.45 89.55 103.71 89.99L102.6 90.65C102.43 90.76 102.28 90.88 102.2 91.05H104.9V92.24H100.46C100.46 91.17 100.77 90.29 101.84 89.67L102.79 89.11C103.25 88.84 103.43 88.6 103.43 88.21C103.43 87.82 103.17 87.52 102.65 87.52C102.1 87.52 101.83 87.9 101.83 88.38C101.83 88.5 101.85 88.62 101.88 88.74H100.55V88.72Z",
];
const LOGO_VB_W = 144.41;
const LOGO_VB_H = 92.37;

/** Build the equirectangular canvas texture (2:1) */
function buildTextureCanvas(
  bgImage: HTMLImageElement,
  canvasW = 2048,
  canvasH = 1024,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d")!;

  /* ── 1. Tile the background image to cover the full canvas ── */
  // The source image may not be 2:1, so we tile it to ensure full coverage
  const imgAspect = bgImage.width / bgImage.height;
  const tileH = canvasH;
  const tileW = tileH * imgAspect;
  const tilesNeeded = Math.ceil(canvasW / tileW) + 1;

  for (let i = 0; i < tilesNeeded; i++) {
    // Alternate: mirror every other tile for seamless look
    ctx.save();
    if (i % 2 === 1) {
      ctx.translate(tileW * i + tileW, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(bgImage, 0, 0, tileW, tileH);
    } else {
      ctx.drawImage(bgImage, tileW * i, 0, tileW, tileH);
    }
    ctx.restore();
  }

  /* ── 2. Slight dark overlay for contrast ── */
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvasW, canvasH);

  /* ── 3. Draw the SVG logo centered ── */
  const logoScale = canvasW * 0.22 / LOGO_VB_W; // logo takes ~22% of canvas width
  const logoW = LOGO_VB_W * logoScale;
  const logoH = LOGO_VB_H * logoScale;
  const logoX = (canvasW - logoW) / 2;
  const logoY = (canvasH - logoH) / 2;

  ctx.save();
  ctx.translate(logoX, logoY);
  ctx.scale(logoScale, logoScale);
  ctx.fillStyle = "rgba(255,255,255,0.92)";

  for (const d of LOGO_PATHS) {
    const path = new Path2D(d);
    ctx.fill(path);
  }
  ctx.restore();

  return canvas;
}

export function Sphere3D({
  backgroundUrl,
  size = "large",
}: {
  backgroundUrl: string;
  size?: "large" | "small";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const { isDark } = useTheme();
  const isLarge = size === "large";

  const init = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up previous instance
    cleanupRef.current?.();

    const THREE = await import("three");

    const width = container.clientWidth;
    const height = container.clientHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    /* ── Scene & Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    /* ── Lights ── */
    const ambient = new THREE.AmbientLight(0xffffff, isDark ? 0.5 : 0.7);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, isDark ? 1.2 : 1.0);
    dirLight1.position.set(3, 4, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0095c1, 0.3);
    dirLight2.position.set(-3, -2, 2);
    scene.add(dirLight2);

    const pointLight1 = new THREE.PointLight(0xe5775b, 0.4, 8);
    pointLight1.position.set(0, 3, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xda3483, 0.2, 6);
    pointLight2.position.set(-2, -1, 3);
    scene.add(pointLight2);

    /* ── Build canvas texture (background image + logo) ── */
    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      bgImg.onload = () => resolve();
      bgImg.onerror = reject;
      bgImg.src = backgroundUrl;
    });

    const textureCanvas = buildTextureCanvas(bgImg);
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    /* ── Main sphere ── */
    const sphereGeo = new THREE.SphereGeometry(1.15, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.3,
      metalness: 0.08,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    /* ── Glow halo (custom shader) ── */
    const glowGeo = new THREE.SphereGeometry(1.28, 48, 48);
    const glowMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color(0x0095c1) },
        uOpacity: { value: 0.25 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(uColor, intensity * uOpacity);
        }
      `,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    /* ── Particles ── */
    const particleCount = isDark ? 80 : 50;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.2;
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x0095c1,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── Mouse tracking ── */
    const mouse = { x: 0, y: 0, smoothX: 0, smoothY: 0 };
    const drag = {
      active: false,
      prevX: 0,
      prevY: 0,
      velocityX: 0,
      velocityY: 0,
      rotX: 0,
      rotY: 0,
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (drag.active) {
        const dx = e.clientX - drag.prevX;
        const dy = e.clientY - drag.prevY;
        drag.velocityX = dx * 0.006;
        drag.velocityY = dy * 0.006;
        drag.rotY += drag.velocityX;
        drag.rotX += drag.velocityY;
        drag.prevX = e.clientX;
        drag.prevY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      drag.active = true;
      drag.prevX = e.clientX;
      drag.prevY = e.clientY;
      drag.velocityX = 0;
      drag.velocityY = 0;
      container.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      drag.active = false;
      container.style.cursor = "grab";
    };

    container.style.cursor = "grab";
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    /* ── Resize observer ── */
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    /* ── Animation loop ── */
    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.smoothX += (mouse.x * 0.3 - mouse.smoothX) * 0.05;
      mouse.smoothY += (mouse.y * 0.2 - mouse.smoothY) * 0.05;

      if (drag.active) {
        // User is dragging — apply drag rotation directly
        sphere.rotation.x = drag.rotX;
        sphere.rotation.y = drag.rotY;
      } else {
        // Inertia: decay velocity and keep applying it
        drag.velocityX *= 0.95;
        drag.velocityY *= 0.95;
        drag.rotY += drag.velocityX;
        drag.rotX += drag.velocityY;

        // Blend auto-rotation back in when inertia fades
        const inertiaStrength = Math.abs(drag.velocityX) + Math.abs(drag.velocityY);
        const autoBlend = Math.max(0, 1 - inertiaStrength * 50);

        // Auto-rotation
        drag.rotY += 0.003 * autoBlend;

        // Gentle tilt from mouse hover (only when not dragging hard)
        const tiltX = (Math.sin(t * 0.15) * 0.08 + mouse.smoothY * 0.1) * autoBlend;

        sphere.rotation.x = drag.rotX + tiltX;
        sphere.rotation.y = drag.rotY;
        sphere.rotation.z = mouse.smoothX * 0.15 * autoBlend;
      }

      // Sphere — levitation
      sphere.position.y = Math.sin(t * 0.5) * 0.1;
      sphere.position.x = mouse.smoothX * 0.12;

      // Sphere — breathing
      const breathe = 1 + Math.sin(t * 0.6) * 0.02;
      sphere.scale.setScalar(breathe);

      // Glow — pulsing
      const glowScale = 1.15 + Math.sin(t * 0.8) * 0.05;
      glow.scale.setScalar(glowScale);
      glowMat.uniforms.uOpacity.value = 0.25 + Math.sin(t * 0.6) * 0.1;

      // Particles — slow orbit
      particles.rotation.y = t * 0.05;
      particles.rotation.x = Math.sin(t * 0.1) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    cleanupRef.current = () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      texture.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [backgroundUrl, isDark]);

  useEffect(() => {
    init();
    return () => {
      cleanupRef.current?.();
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className={
        isLarge
          ? "w-[220px] h-[220px] md:w-[320px] md:h-[320px]"
          : "w-[160px] h-[160px] md:w-[220px] md:h-[220px]"
      }
    />
  );
}