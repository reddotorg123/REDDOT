"use client";

import { useEffect, useRef } from "react";

export default function BlockchainLedgerAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        console.log("Blockchain Ledger: Canvas initialized", canvas.width, canvas.height);

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;
        let time = 0;

        const blocks: { x: number, y: number, hash: string, opacity: number, speed: number }[] = [];
        const hashes = ["0x8A2", "0x3F1", "0x9E4", "0x1B5", "0xC72"];

        for (let i = 0; i < 15; i++) {
            blocks.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                hash: hashes[Math.floor(Math.random() * hashes.length)],
                opacity: 0.2 + Math.random() * 0.5,
                speed: 0.2 + Math.random() * 0.4
            });
        }

        function drawBlock(x: number, y: number, hash: string, opacity: number) {
            if (!ctx) return;
            ctx.save();
            ctx.translate(x, y);
            
            // Hexagonal block
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(20 * Math.cos(i * Math.PI / 3), 20 * Math.sin(i * Math.PI / 3));
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Hash Label
            ctx.font = "10px monospace";
            ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.fillText(hash, -15, 5);
            ctx.restore();
        }

        function draw() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            blocks.forEach((b, i) => {
                b.y -= b.speed;
                if (b.y < -50) {
                    b.y = canvas.height + 50;
                    b.x = Math.random() * canvas.width;
                }

                drawBlock(b.x, b.y, b.hash, b.opacity);

                // Connection line to next block (Chain effect)
                const next = blocks[(i + 1) % blocks.length];
                ctx.beginPath();
                ctx.moveTo(b.x, b.y);
                ctx.lineTo(next.x, next.y);
                ctx.strokeStyle = `rgba(168, 85, 247, ${b.opacity * 0.1})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            time += 0.01;
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
