INSERT INTO projects (title, category, description, technologies, link, status, image, details) VALUES
(
    'Dynamic Spectrum Allocation',
    'Telecommunications AI',
    'An AI-powered system for dynamically allocating wireless spectrum bands to maximize bandwidth efficiency and reduce interference.',
    ARRAY['Python', 'TensorFlow', 'Reinforcement Learning', 'SDR', 'Cloud'],
    'https://github.com/jaikeerthi07/dynamic-spectrum-allocation.git',
    'Completed',
    '/images/projects/dynamic_spectrum.png',
    '{"overview": "Dynamic Spectrum Allocation leverages deep reinforcement learning to intelligently manage and assign radio frequencies in real-time. This ensures optimal bandwidth utilization for IoT networks, 5G cells, and autonomous communications.", "features": ["Real-time spectrum sensing and cognitive radio integration", "Deep Q-Learning for optimal channel assignment", "Interference mitigation algorithms", "Scalable architecture for multi-node networks", "Simulated SDR (Software Defined Radio) environments"], "challenge": "Traditional static frequency allocation leads to massive bandwidth waste. Creating a sub-millisecond AI decision engine that could out-perform static routing was a massive engineering hurdle.", "solution": "Built a highly optimized Reinforcement Learning agent deployed at edge nodes for instantaneous, decentralized spectrum negotiation."}'::jsonb
);
