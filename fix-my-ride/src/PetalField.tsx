import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
  rotation: number;
  spin: number;
  opacity: number;
};

function PetalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let lastTime = 0;
    let petals: Petal[] = [];

    const makePetal = (startAbove = false): Petal => ({
      x: Math.random() * width,
      y: startAbove ? -Math.random() * height : Math.random() * height,
      size: 4 + Math.random() * 5,
      speed: 10 + Math.random() * 17,
      drift: -7 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() > 0.5 ? 1 : -1) * (0.35 + Math.random() * 0.9),
      opacity: 0.18 + Math.random() * 0.34
    });

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = Math.min(34, Math.max(16, Math.round(width / 44)));
      petals = Array.from({ length: count }, () => makePetal());
    };

    const drawPetal = (petal: Petal) => {
      context.save();
      context.translate(petal.x, petal.y);
      context.rotate(petal.rotation);
      context.globalAlpha = petal.opacity;
      context.shadowColor = "rgba(255, 67, 99, .62)";
      context.shadowBlur = petal.size * 1.15;

      const fill = context.createLinearGradient(0, -petal.size, 0, petal.size);
      fill.addColorStop(0, "#ffb0bf");
      fill.addColorStop(0.48, "#ff4966");
      fill.addColorStop(1, "#9e193d");
      context.fillStyle = fill;
      context.beginPath();
      context.moveTo(0, -petal.size);
      context.bezierCurveTo(petal.size * 0.88, -petal.size * 0.55, petal.size * 0.74, petal.size * 0.5, 0, petal.size);
      context.bezierCurveTo(-petal.size * 0.74, petal.size * 0.5, -petal.size * 0.88, -petal.size * 0.55, 0, -petal.size);
      context.fill();

      context.shadowBlur = 0;
      context.strokeStyle = "rgba(255, 221, 228, .24)";
      context.lineWidth = 0.45;
      context.beginPath();
      context.moveTo(0, -petal.size * 0.7);
      context.quadraticCurveTo(petal.size * 0.12, 0, 0, petal.size * 0.72);
      context.stroke();
      context.restore();
    };

    const render = (time: number) => {
      const seconds = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      context.clearRect(0, 0, width, height);

      petals.forEach((petal) => {
        petal.y += petal.speed * seconds;
        petal.x += (petal.drift + Math.sin(time * 0.00045 + petal.phase) * 8) * seconds;
        petal.rotation += petal.spin * seconds;
        if (petal.y > height + petal.size * 2 || petal.x < -30 || petal.x > width + 30) {
          Object.assign(petal, makePetal(true));
        }
        drawPetal(petal);
      });

      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="petal-field" aria-hidden="true" />;
}

export default PetalField;
