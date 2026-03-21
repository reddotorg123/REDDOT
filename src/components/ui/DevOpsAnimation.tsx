"use client";

import { useEffect, useRef } from "react";

export default function DevOpsAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        console.log("DevOps Animation: Canvas initialized", canvas.width, canvas.height);

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;
        let angle = 0;

        const gears: { x: number, y: number, r: number, teeth: number, speed: number, dir: number }[] = [];
        for (let i = 0; i < 6; i++) {
            gears.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 20 + Math.random() * 40,
                teeth: 8 + Math.floor(Math.random() * 8),
                speed: 0.01 + Math.random() * 0.02,
                dir: Math.random() > 0.5 ? 1 : -1
            });
        }

        function drawGear(x: number, y: number, radius: number, teeth: number, rotation: number) {
            if (!ctx) return;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
            ctx.lineWidth = 2;
            
            for (let i = 0; i < teeth * 2; i++) {
                const r = i % 2 === 0 ? radius : radius * 0.75;
                const a = (i / teeth) * Math.PI;
                ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            ctx.closePath();
            ctx.stroke();
            
            // Inner circle
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        function draw() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // 1. Infinity Symbol (DevOps) - Pulsing
            ctx.beginPath();
            ctx.lineWidth = 3;
            const opacity = 0.2 + Math.sin(angle * 2) * 0.1;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;

            for (let t = 0; t < Math.PI * 2; t += 0.05) {
                const x = (Math.cos(t) / (Math.sin(t) * Math.sin(t) + 1)) * 300;
                const y = (Math.sin(t) * Math.cos(t) / (Math.sin(t) * Math.sin(t) + 1)) * 300;
                if (t === 0) ctx.moveTo(centerX + x, centerY + y);
                else ctx.lineTo(centerX + x, centerY + y);
            }
            ctx.stroke();

            // 2. Interactive Gears
            gears.forEach(g => {
                drawGear(g.x, g.y, g.r, g.teeth, angle * g.speed * g.dir * 50);
            });

            // 3. Connection Lines
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgba(168, 85, 247, 0.05)";
            for (let i = 0; i < gears.length; i++) {
                for (let j = i + 1; j < gears.length; j++) {
                    ctx.moveTo(gears[i].x, gears[i].y);
                    ctx.lineTo(gears[j].x, gears[j].y);
                }
            }
            ctx.stroke();

            angle += 0.01;
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
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
        />
    );
}
