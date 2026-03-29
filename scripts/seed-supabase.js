const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

async function seed() {
  console.log('Starting seed process...');
  
  // NOTE: You must temporarily disable RLS or add an 'Allow All' policy for projects table to run this via Anon Key.
  // Alternatively, use your Service Role Key in .env.local to bypass RLS.
  
  const { data, error } = await supabase
    .from('projects')
    .insert(projects);

  if (error) {
    console.error('Error seeding projects:', error.message);
    if (error.message.includes('permission denied')) {
        console.warn('\nTIP: Make sure you have added a policy to allow INSERTS for the anon key, or use the Service Role Key.');
    }
  } else {
    console.log('Successfully seeded projects!');
  }
}

seed();
