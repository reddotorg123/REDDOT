"use client";

import { useEffect, useRef } from "react";

export default function HardwareAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        console.log("Hardware Animation: Canvas initialized", canvas.width, canvas.height);

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;

        const traces: { x: number, y: number, length: number, dir: number, speed: number, timer: number, color: string, isBus: boolean }[] = [];
        const numTraces = 40; // Doubled density

        for (let i = 0; i < numTraces; i++) {
            resetTrace(i);
        }

        const chips: { x: number, y: number, w: number, h: number, opacity: number }[] = [];
        for (let i = 0; i < 8; i++) {
            chips.push({
                x: Math.random() * 100, // percentage
                y: Math.random() * 100,
                w: 30 + Math.random() * 50,
                h: 30 + Math.random() * 50,
                opacity: 0.05 + Math.random() * 0.1
            });
        }

        function resetTrace(i: number) {
            traces[i] = {
                x: Math.random() * canvas!.width,
                y: Math.random() * canvas!.height,
                length: 0,
                dir: Math.floor(Math.random() * 4), 
                speed: 1 + Math.random() * 2,
                timer: 50 + Math.random() * 100,
                color: Math.random() > 0.5 ? "rgba(168, 85, 247, 0.8)" : "rgba(192, 132, 252, 0.7)",
                isBus: Math.random() > 0.8 // Some traces are parallel "Bus" lines
            };
        }

        function draw() {
            if (!canvas || !ctx) return;

            // Fading effect for motherboard-like persistence
            ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Static Motherboard "Chips"
            chips.forEach(c => {
                ctx.strokeStyle = `rgba(168, 85, 247, ${c.opacity})`;
                ctx.lineWidth = 1;
                const px = (c.x / 100) * canvas.width;
                const py = (c.y / 100) * canvas.height;
                ctx.strokeRect(px, py, c.w, c.h);
                // Draw pin-like dots on chips
                for (let i = 0; i < c.w; i += 10) {
                    ctx.fillStyle = `rgba(192, 132, 252, ${c.opacity * 0.5})`;
                    ctx.fillRect(px + i, py - 2, 4, 3);
                    ctx.fillRect(px + i, py + c.h - 1, 4, 3);
                }
            });

            traces.forEach((t, i) => {
                const drawLine = (offset: number) => {
                    ctx.beginPath();
                    ctx.moveTo(t.x + offset, t.y + offset);
                    
                    const dx = t.dir === 0 ? t.speed : t.dir === 2 ? -t.speed : 0;
                    const dy = t.dir === 1 ? t.speed : t.dir === 3 ? -t.speed : 0;

                    const newX = t.x + dx;
                    const newY = t.y + dy;

                    ctx.lineTo(newX + offset, newY + offset);
                    ctx.strokeStyle = t.color;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                    
                    return { newX, newY };
                };

                const { newX, newY } = drawLine(0);
                if (t.isBus) {
                    drawLine(6); // Parallel line for Bus effect
                    drawLine(-6);
                }

                t.x = newX;
                t.y = newY;
                t.timer--;

                if (t.timer <= 0) {
                    // Terminal Node/Circle
                    ctx.beginPath();
                    ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = t.color;
                    ctx.fill();
                    
                    t.dir = (t.dir + (Math.random() > 0.5 ? 1 : -1) + 4) % 4;
                    t.timer = 30 + Math.random() * 60;

                    if (t.x < 0 || t.x > canvas.width || t.y < 0 || t.y > canvas.height) {
                        resetTrace(i);
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80"
        />
    );
}
