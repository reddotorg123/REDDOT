import { Video, Bot, BrainCircuit, LineChart, Code2, Users, Rocket, Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const navigation = [
    { name: 'What We Do', href: '#services', hasDropdown: true },
    { name: 'What We Think', href: '#projects' },
    { name: 'Our Products', href: '#products' },
    { name: 'About REDDOT', href: '#about', hasDropdown: true },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact Us', href: '#contact' },
];

export const languages = [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'ES', name: 'Español' },
];

export const services = [
    {
        title: 'AI Agents & Automations',
        description: 'Custom AI agents that automate complex workflows and business processes.',
        icon: Bot,
        tag: 'Ai Agents',
        features: [
            'Multi-agent system architecture',
            'Natural language processing',
            'Task automation & workflow optimization',
            'Decision making algorithms'
        ],
        benefits: [
            'Reduce operational costs by 40%',
            '24/7 autonomous workflow execution',
            'Eliminate human error in repetitive tasks',
            'Scalable workforce on demand'
        ],
        useCases: [
            'Customer support automation',
            'Data entry and processing',
            'Supply chain management',
            'Financial reporting'
        ],
        techStack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'Docker']
    },
    {
        title: 'SaaS Applications',
        description: 'Scalable, AI-powered software as a service solutions built for growth.',
        icon: Rocket,
        tag: 'SaaS',
        features: [
            'Scalable cloud architecture',
            'AI-powered analytics',
            'Real-time data processing',
            'Secure multi-tenancy'
        ],
        benefits: [
            'Rapid automated scaling',
            'Data-driven user insights',
            'Recurring revenue models',
            'High availability architecture'
        ],
        useCases: [
            'Marketing automation platforms',
            'HR management systems',
            'Project management tools',
            'Healthcare management'
        ],
        techStack: ['Next.js', 'React', 'Node.js', 'AWS', 'PostgreSQL']
    },
    {
        title: 'Websites and Mobile Applications',
        description: 'Modern, responsive web and mobile applications enhanced with AI capabilities for superior user experiences.',
        icon: Code2,
        tag: 'App Dev',
        features: [
            'Responsive design',
            'AI chatbots integration',
            'Personalization engines',
            'Cross-platform compatibility'
        ],
        benefits: [
            'Enhanced user engagement',
            'Personalized user journeys',
            'Cross-platform reach',
            'Modern intuitive UI/UX'
        ],
        useCases: [
            'E-commerce platforms',
            'Booking systems',
            'Social networking apps',
            'Educational portals'
        ],
        techStack: ['React Native', 'Flutter', 'Firebase', 'GraphQL', 'Tailwind']
    },
    {
        title: 'Generative AI',
        description: 'Intelligent content generation platform that creates high-quality, engaging content across multiple formats and platforms using advanced AI.',
        icon: BrainCircuit,
        tag: 'Content',
        features: [
            'Multi-format content generation',
            'Brand voice consistency',
            'SEO optimization',
            'Automated scheduling'
        ],
        benefits: [
            '10x faster content production',
            'Consistent brand voice',
            'Higher SEO rankings',
            'Multi-channel distribution'
        ],
        useCases: [
            'Blog post generation',
            'Social media management',
            'Ad copy creation',
            'Email marketing campaigns'
        ],
        techStack: ['GPT-4', 'Midjourney API', 'Python', 'Celery', 'Redis']
    },
    {
        title: 'Internship Program',
        description: 'Comprehensive AI internship program that provides hands-on experience with cutting-edge AI technologies and real-world projects.',
        icon: Users,
        tag: 'Education',
        features: [
            'Hands-on AI project experience',
            '1-on-1 mentorship with AI experts',
            'Real client project exposure',
            'Career guidance'
        ],
        benefits: [
            'Gain 6+ months of practical AI experience',
            'Build a professional AI portfolio',
            'Direct mentorship from industry experts',
            'Potential full-time job opportunities'
        ],
        useCases: [
            'Recent computer science graduates',
            'Career transition to AI field',
            'Students seeking practical experience',
            'Professionals upskilling in AI'
        ],
        techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'Git', 'Docker', 'AWS/Azure']
    },
    {
        title: 'Embedded Systems with IoT',
        description: 'Smart embedded systems and IoT solutions that connect physical devices to intelligent cloud platforms for automation and monitoring.',
        icon: LineChart,
        tag: 'IoT',
        features: [
            'Custom embedded system design',
            'IoT connectivity and protocols',
            'Real-time data monitoring',
            'Edge computing integration'
        ],
        benefits: [
            'Real-time remote monitoring',
            'Predictive maintenance',
            'Energy efficiency',
            'Automated control systems'
        ],
        useCases: [
            'Smart home automation',
            'Industrial IoT (IIoT)',
            'Wearable health devices',
            'Smart agriculture'
        ],
        techStack: ['C/C++', 'Arduino', 'Raspberry Pi', 'MQTT', 'AWS IoT']
    },
    {
        title: 'Data Science and Data Analytics',
        description: 'Transform raw data into actionable insights using advanced AI analytics.',
        icon: LineChart,
        tag: 'Analytics',
        features: [
            'Predictive modeling',
            'Data visualization',
            'Business intelligence',
            'Big data processing'
        ],
        benefits: [
            'Data-driven decision making',
            'Identify market trends',
            ' optimize operational efficiency',
            'Risk mitigation'
        ],
        useCases: [
            'Financial forecasting',
            'Customer churn prediction',
            'Sales performance analysis',
            'Supply chain optimization'
        ],
        techStack: ['Python', 'Pandas', 'Tableau', 'PowerBI', 'Snowflake']
    },
    {
        title: 'Machine Learning and Deep Learning',
        description: 'Tailored AI solutions designed to meet unique business challenges.',
        icon: Code2,
        tag: 'Voice & Vision',
        features: [
            'Computer vision',
            'Speech recognition',
            'Object detection',
            'Voice synthesis'
        ],
        benefits: [
            'Enhanced accessibility',
            'Automated visual inspection',
            'Natural voice interactions',
            'Improved security'
        ],
        useCases: [
            'Facial recognition entry',
            'Voice-controlled assistants',
            'Quality control inspection',
            'Automated transcription'
        ],
        techStack: ['OpenCV', 'Whisper', 'YOLO', 'TensorFlow', 'React']
    },
];

export const projects = [
    {
        title: 'Jarvis AI',
        category: 'AI Assistant',
        description: 'An advanced personal AI assistant capable of handling complex tasks, scheduling, and natural language interactions.',
        technologies: ['Python', 'NLP', 'React', 'FastAPI', 'PostgreSQL'],
        link: 'https://github.com/jaikeerthi07/JARVIS-AI-2.0.git',
        status: 'Completed',
        image: '/images/projects/jarvis.png',
        details: {
            overview: 'Jarvis AI is a sophisticated personal assistant designed to streamline daily productivity and automate routine tasks. Unlike standard voice assistants, Jarvis understands context, remembers past interactions, and can execute complex multi-step workflows.',
            features: [
                'Context-aware conversation capability',
                'Calendar management and smart scheduling',
                'Email summarization and drafting',
                'IoT device control integration',
                'Custom voice profiles'
            ],
            challenge: 'Building a system that could maintain context over long conversations while keeping latency low for real-time interaction.',
            solution: 'Implemented a hybrid memory architecture using Redis for short-term context and a vector database for long-term memory retrieval.'
        }
    },
    {
        title: 'Universal Web Scraper Agent',
        category: 'Automation',
        description: 'A powerful agent that scrapes data from all social media platforms using Apify, enabling comprehensive data gathering and analysis.',
        technologies: ['Apify', 'Node.js', 'Puppeteer', 'MongoDB', 'Docker'],
        link: 'https://github.com/jaikeerthi07/web-scraping.git',
        status: 'Completed',
        image: '/images/projects/scraper.png',
        details: {
            overview: 'The Universal Web Scraper Agent provides enterprise-grade data extraction capabilities. It is built to handle dynamic content, infinite scrolling, and anti-bot measures to gather high-quality structured data from the web.',
            features: [
                'Intelligent proxy rotation to avoid bans',
                'Automatic CAPTCHA solving',
                'Structured output in JSON/CSV formats',
                'Scheduled recurring scraping jobs',
                'Real-time data validation'
            ],
            challenge: 'Overcoming sophisticated anti-scraping technologies implemented by major social media platforms.',
            solution: 'Developed a browser fingerprinting management system that mimics human behavior patterns to remain undetected.'
        }
    },
    {
        title: 'AI Travel Planning App',
        category: 'Consumer App',
        description: 'Intelligent travel companion that generates personalized itineraries, books flights/hotels, and provides real-time travel advice.',
        technologies: ['React Native', 'OpenAI', 'Google Maps API', 'Amadeus API'],
        link: 'https://github.com/jaikeerthi07/travel-planning-itenary-multiagent.git',
        status: 'Completed',
        image: '/images/projects/travel.png',
        details: {
            overview: 'This AI Travel Planning App takes the stress out of trip planning. By analyzing user preferences and real-time travel data, it creates bespoke itineraries giving users a complete travel plan in seconds.',
            features: [
                'Personalized itinerary generation based on budget and interests',
                'Real-time flight and hotel price tracking',
                'Interactive maps with local recommendations',
                'Offline mode for access during travel',
                'Shared trip planning for groups'
            ],
            challenge: 'Integrating data from multiple disparate travel APIs while ensuring real-time availability and pricing accuracy.',
            solution: 'Built a unified caching layer and aggregation engine that normalizes data from all providers into a single coherent schema.'
        }
    },
    {
        title: 'Customized Large Language Model',
        category: 'Enterprise AI',
        description: 'Fine-tuned LLMs tailored for specific industry domains, offering superior accuracy and context-awareness for business needs.',
        technologies: ['PyTorch', 'Transformers', 'Hugging Face', 'AWS SageMaker'],
        link: 'https://github.com/jaikeerthi07/jai-llm.git',
        status: 'Completed',
        image: '/images/projects/llm.png',
        details: {
            overview: 'Our Customized LLM solution provides businesses with private, secure, and highly specialized AI models. We fine-tune state-of-the-art foundation models on proprietary data to deliver exceptional performance in niche domains.',
            features: [
                'Domain-specific vocabulary and knowledge',
                'On-premise deployment options for data security',
                'Reduced hallucination rates compared to general models',
                'Integration with internal knowledge bases',
                'Compliance with industry regulations (HIPAA, GDPR)'
            ],
            challenge: 'Ensuring model accuracy without catastrophic forgetting of general language capabilities during fine-tuning.',
            solution: 'Utilized Parameter-Efficient Fine-Tuning (PEFT) and LoRA techniques to adapt models efficiently while preserving their core reasoning abilities.'
        }
    },
    {
        title: 'AI Medical Silent Emergency System',
        category: 'Healthcare',
        description: 'A silent emergency alert system powered by AI that detects medical distress signals and automatically notifies emergency services.',
        technologies: ['IoT', 'Machine Learning', 'Cloud', 'Azure IoT Hub'],
        link: '#',
        status: 'Completed',
        image: '/images/projects/medical.png',
        details: {
            overview: 'The AI Medical Silent Emergency System is a life-saving innovation that monitors vital signs and detecting abnormalities. It autonomously alerts emergency responders with precise location and patient data when critical thresholds are breached.',
            features: [
                'Real-time vital sign monitoring (HR, SpO2)',
                'Fall detection and anomaly recognition',
                'Silent alert transmission to emergency contacts',
                'GPS location tracking',
                'Secure health data transmission'
            ],
            challenge: 'Minimizing false positives to prevent alarm fatigue while ensuring 100% detection of genuine emergencies.',
            solution: 'Developed a multi-modal sensor fusion algorithm that cross-references vital signs with motion data to verify distress events.'
        }
    },
];

export const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'CEO, TechFlow',
        content: 'Reddot.co.in transformed our business operations with their incredible AI automation solutions.',
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Founder, StartUp Inc',
        content: 'The AI chatbot they built for us increased our lead generation by 300% in just one month.',
        rating: 5,
    },
];

export const products = [
    {
        name: 'Nexus AI',
        description: 'A cutting-edge AI assistant for enterprise teams.',
        icon: '/images/products/nexus.png',
        url: 'https://nexus-ai.example.com',
    },
    {
        name: 'Echo Stream',
        description: 'Real-time voice-to-text platform for creators.',
        icon: '/images/products/echo.png',
        url: 'https://echo-stream.example.com',
    },
    {
        name: 'Vector Hub',
        description: 'The ultimate repository for vector-based AI models.',
        icon: '/images/products/vector.png',
        url: 'https://vector-hub.example.com',
    },
];



export const contactInfo = {
    email: ['keerthijai909@gmail.com', 'jagadish2k2006@gmail.com'],
    phone: ['+91 80721 63133', '+91 80150 24729'],
    location: 'Chennai, India',
    social: [
        { name: 'GitHub', icon: Github, href: '#' },
        { name: 'LinkedIn', icon: Linkedin, href: '#' },
        { name: 'Twitter', icon: Twitter, href: '#' },
        { name: 'Instagram', icon: Instagram, href: '#' },
    ],
    businessHours: '9 AM - 6 PM IST',
};
