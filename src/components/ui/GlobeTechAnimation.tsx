"use client";

import { useEffect, useRef } from "react";

export default function GlobeTechAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isVisible = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Performance Optimization: Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible.current = entry.isIntersecting;
                console.log("GlobeTech Animation Visibility:", entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(canvas);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        console.log("GlobeTech Animation: Canvas initialized", canvas.width, canvas.height);

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;
        let angle = 0;

        // Icons/Symbols to represent "Technologies"
        const symbols = ["⚛", "∞", "⌬", "⎔", "⬡", "⚡", "⚙"];

        const particles: { x: number, y: number, r: number, symbol: string, speed: number, phase: number }[] = [];
        for (let i = 0; i < 15; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 10 + Math.random() * 20,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                speed: 0.2 + Math.random() * 0.5,
                phase: Math.random() * Math.PI * 2
            });
        }

        function draw() {
            if (!canvas || !ctx) return;
            
            // Performance Optimization: Skip drawing if not visible
            if (!isVisible.current) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) * 0.4;

            // 1. Spinning Globe (Increased Dotted Density)
            for (let lat = -Math.PI / 2; lat < Math.PI / 2; lat += Math.PI / 15) {
                for (let lon = 0; lon < Math.PI * 2; lon += Math.PI / 20) {
                    const x = radius * Math.cos(lat) * Math.cos(lon + angle);
                    const y = radius * Math.sin(lat);
                    const z = radius * Math.cos(lat) * Math.sin(lon + angle);

                    const scale = (z + radius * 2) / (radius * 3);
                    const px = centerX + x * scale;
                    const py = centerY + y * scale;

                    ctx.beginPath();
                    ctx.arc(px, py, 1.2 * scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(168, 85, 247, ${0.4 + scale * 0.6})`;
                    ctx.fill();
                }
            }

            // 2. Tech Symbols (Floating Infographics)
            particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < -50) p.y = canvas.height + 50;

                const hoverX = Math.sin(angle + p.phase) * 20;
                ctx.font = `${p.r}px Arial`;
                ctx.fillStyle = "rgba(168, 85, 247, 0.4)";
                ctx.fillText(p.symbol, p.x + hoverX, p.y);

                // Connection to globe
                ctx.beginPath();
                ctx.moveTo(p.x + hoverX, p.y);
                ctx.lineTo(centerX, centerY);
                ctx.strokeStyle = "rgba(168, 85, 247, 0.03)";
                ctx.stroke();
            });

            angle += 0.006;
            animationFrameId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
        />
    );
}
