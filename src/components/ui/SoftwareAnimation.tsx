"use client";

import { useEffect, useRef } from "react";

export default function SoftwareAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        console.log("Software Animation: Canvas initialized", canvas.width, canvas.height);

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;

        const snippets = [
            "AI.model.predict()", "blockchain.verify()", "AGI.init()", 
            "NeuralNet.train()", "import { LLM }", "0x7F4B2...A9", 
            "block_hash: 0000x", "tensor.flow()", "while(thinking)"
        ];
        
        const blocks: { x: number, y: number, text: string, speed: number, opacity: number, type: 'text' | 'hex' }[] = [];
        
        for (let i = 0; i < 30; i++) { // Increased density
            blocks.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                text: snippets[Math.floor(Math.random() * snippets.length)],
                speed: 0.3 + Math.random() * 0.8,
                opacity: 0.3 + Math.random() * 0.5,
                type: Math.random() > 0.7 ? 'hex' : 'text'
            });
        }

        function drawHexagon(x: number, y: number, size: number, opacity: number) {
            if (!ctx) return;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(x + size * Math.cos(i * Math.PI / 3), y + size * Math.sin(i * Math.PI / 3));
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        function draw() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            blocks.forEach(b => {
                b.y -= b.speed;
                if (b.y < -50) {
                    b.y = canvas.height + 50;
                    b.x = Math.random() * canvas.width;
                }

                if (b.type === 'text') {
                    ctx.font = "bold 13px monospace";
                    ctx.fillStyle = `rgba(168, 85, 247, ${b.opacity})`;
                    ctx.fillText(b.text, b.x, b.y);
                    
                    // Small "code container" box around AGI/AI text
                    if (b.text.includes("AGI") || b.text.includes("AI")) {
                        ctx.strokeStyle = `rgba(192, 132, 252, ${b.opacity * 0.3})`;
                        ctx.strokeRect(b.x - 5, b.y - 15, ctx.measureText(b.text).width + 10, 20);
                    }
                } else {
                    // Blockchain Hexagon link
                    drawHexagon(b.x, b.y, 15, b.opacity);
                    drawHexagon(b.x, b.y + 25, 15, b.opacity * 0.5); // Chain link visual
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
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
        />
    );
}
