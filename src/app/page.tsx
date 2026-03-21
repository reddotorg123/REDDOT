import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Products from '@/components/sections/Products';
import About from '@/components/sections/About';
import Careers from '@/components/sections/Careers';
import Contact from '@/components/sections/Contact';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <Services />
            <Projects />
            <Products />
            <About />
            <Careers />
            <Contact />
        </main>
    );
}
