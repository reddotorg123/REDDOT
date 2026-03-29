const { createClient } = require('@supabase/supabase-js');

// Load environment directly since we know the values or we can hardcode for the migration script
const supabaseUrl = 'https://gikpzvbxnwcafhlohtku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpa3B6dmJ4bndjYWZobG9odGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NzU0NjUsImV4cCI6MjA5MDI1MTQ2NX0.WCIPxeFX1ONehD2pz1IDI8Oh9hp5g0mlcFNxUxSU52g';

const supabase = createClient(supabaseUrl, supabaseKey);

const projects = [
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
        status: 'Upcoming',  // Changed to Upcoming as per user request to have upcoming projects
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
    // Adding a new upcoming project explicitly
    {
        title: 'Reddot Commerce AI Engine',
        category: 'E-commerce AI',
        description: 'An upcoming AI engine providing hyper-personalized shopping experiences and dynamic pricing out of the box.',
        technologies: ['Next.js', 'Python', 'Redis', 'TensorFlow Recommendation'],
        link: '#',
        status: 'Upcoming',
        image: '',
        details: {
            overview: 'Reddot Commerce AI Engine will revolutionize medium-scale e-commerce by providing enterprise-level recommendations, dynamic pricing, and automated inventory forecasting.',
            features: [
                'Hyper-personalized product recommendations',
                'Dynamic pricing engine based on demand',
                'Visual search capabilities',
                'Automated SEO generation for new products'
            ],
            challenge: 'Processing clickstream data in real-time with zero latency impact on the storefront.',
            solution: 'Implementing a specialized edge-computing architecture with Redis and Vercel Edge functions.'
        }
    }
];

async function migrate() {
    console.log('Starting migration to Supabase...');
    
    // Check if table exists / fetch existing
    const { data: existing, error: fetchErr } = await supabase.from('projects').select('title');
    if (fetchErr) {
        console.error('Error fetching existing projects:', fetchErr);
        return;
    }
    
    console.log(`Found ${existing.length} existing projects in Supabase.`);
    
    const existingTitles = new Set(existing.map(p => p.title));
    
    // Insert new projects
    for (const project of projects) {
        if (!existingTitles.has(project.title)) {
            console.log(`Inserting: ${project.title}`);
            const { error } = await supabase.from('projects').insert([project]);
            if (error) {
                console.error(`Failed to insert ${project.title}:`, error);
            } else {
                console.log(`Successfully inserted ${project.title}`);
            }
        } else {
            console.log(`Skipping ${project.title} (already exists)`);
        }
    }
    
    console.log('Migration complete!');
}

migrate();
