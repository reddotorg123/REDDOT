"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetworkAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isVisible = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Performance Optimization: Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible.current = entry.isIntersecting;
            },
            { threshold: 0.1 }
        );

        observer.observe(canvas);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        console.log("Neural Network Animation: Canvas initialized", canvas.width, canvas.height);

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;
        
        const nodes: { x: number, y: number, vx: number, vy: number, connections: number[], pulse: number }[] = [];
        const numNodes = 70; // Increased density

        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                connections: [],
                pulse: Math.random() * Math.PI * 2
            });
        }

        nodes.forEach((node, i) => {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150 && Math.random() > 0.8) {
                    node.connections.push(j);
                }
            }
        });

        function draw() {
            if (!canvas || !ctx) return;
            
            // Performance Optimization: Skip drawing if not visible
            if (!isVisible.current) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                node.pulse += 0.03;
                const brightness = 0.4 + Math.sin(node.pulse) * 0.4;

                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(168, 85, 247, ${brightness})`;
                ctx.fill();

                node.connections.forEach(targetIdx => {
                    const target = nodes[targetIdx];
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${brightness * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();

                    // Firing synapsis signal
                    if (Math.sin(node.pulse) > 0.95) {
                        ctx.beginPath();
                        const signalX = node.x + (target.x - node.x) * ((Math.sin(node.pulse * 5) + 1) / 2);
                        const signalY = node.y + (target.y - node.y) * ((Math.sin(node.pulse * 5) + 1) / 2);
                        ctx.arc(signalX, signalY, 2.5, 0, Math.PI * 2);
                        ctx.fillStyle = "#A855F7";
                        ctx.fill();
                    }
                });
            });

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
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-70"
        />
    );
}
