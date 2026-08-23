import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, ArrowRight, Star, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { trpc } from "@/lib/trpc";

const fallbackJobs = [
  {
    id: 1,
    title: 'AI Systems Engineer',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full-time',
    salaryRange: '₹18L - ₹28L',
    description: 'Build next-generation autonomous cognitive agent swarms using state-of-the-art LLMs, RAG frameworks, and live-sync audio/video APIs.',
    requirements: ['2+ years AI engineering experience', 'Python & TypeScript', 'LangChain/LlamaIndex', 'Familiarity with vector DBs'],
  },
  {
    id: 2,
    title: 'Machine Learning Engineer',
    department: 'Engineering',
    location: 'Chennai, India',
    type: 'Full-time',
    salaryRange: '₹15L - ₹24L',
    description: 'Design, fine-tune, and deploy custom domain-specific language models and computer vision pipelines.',
    requirements: ['PyTorch/TensorFlow expertise', 'Fine-tuning & quantization (LoRA/QLoRA)', 'Model pruning & edge deployment', 'Degree in CS/Math'],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote (India)',
    type: 'Full-time',
    salaryRange: '₹12L - ₹20L',
    description: 'Develop responsive, multi-tenant cloud-native SaaS systems with ultra-low latency API architectures.',
    requirements: ['React, Next.js, & Node.js', 'PostgreSQL & Drizzle ORM', 'WebSocket / SSE implementation', '3+ years experience'],
  },
  {
    id: 4,
    title: 'Website Developer',
    department: 'Engineering',
    location: 'Chennai, India',
    type: 'Full-time',
    salaryRange: '₹8L - ₹14L',
    description: 'Craft blazing-fast, accessible, and interactive user-facing web portals and high-end landing pages.',
    requirements: ['Advanced HTML/CSS/Tailwind', 'React & Vite', 'Framer Motion & animations', 'SEO best practices'],
  },
  {
    id: 5,
    title: 'Cybersecurity Specialist',
    department: 'Infrastructure',
    location: 'Bangalore, India',
    type: 'Full-time',
    salaryRange: '₹14L - ₹22L',
    description: 'Protect enterprise topologies, conduct penetration testing audits, and implement zero-trust network boundaries.',
    requirements: ['Zero-trust network architectures', 'Penetration testing and security audits', 'Threat modeling and firewall routing', 'Relevant certifications (CEH, OSCP)'],
  },
  {
    id: 6,
    title: 'Content Creator & Strategist',
    department: 'Product',
    location: 'Remote (India)',
    type: 'Full-time',
    salaryRange: '₹6L - ₹10L',
    description: 'Create high-impact technical blog posts, videos, and documentation detailing REDDOT\'s products and AI capabilities.',
    requirements: ['Excellent technical writing skills', 'Familiarity with AI/ML concepts', 'Social media strategy', 'Design tools (Figma/Canva)'],
  },
];

export default function Career() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const { data: dbJobs } = trpc.career.getJobs.useQuery();
  const applyMutation = trpc.career.submitApplication.useMutation();

  const jobs = (dbJobs || fallbackJobs).map(j => ({
    id: j.id,
    title: j.title,
    department: j.department,
    location: j.location,
    type: j.type,
    salary: j.salaryRange || '',
    description: j.description,
    requirements: j.requirements,
  })).filter(j => j.type.toLowerCase() === 'full-time');

  const [applyingToJob, setApplyingToJob] = useState<typeof jobs[0] | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<{
    applicantName: string;
    email: string;
    phone: string;
    linkedinUrl: string;
    resumeUrl: string;
  }>();

  const handleApplySubmit = async (data: any) => {
    if (!applyingToJob) return;
    applyMutation.mutate({
      jobId: applyingToJob.id,
      applicantName: data.applicantName,
      email: data.email,
      phone: data.phone || undefined,
      linkedinUrl: data.linkedinUrl || undefined,
      resumeUrl: data.resumeUrl || undefined,
    }, {
      onSuccess: (res) => {
        toast.success('Application submitted!', {
          description: res.message,
          duration: 5000,
        });
        reset();
        setApplyingToJob(null);
      },
      onError: (err) => {
        toast.error('Submission failed', {
          description: err.message || 'Please try again later.'
        });
      }
    });
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end center'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const departments = ['all', 'Engineering', 'Product', 'Infrastructure', 'Research', 'Sales'];

  const filteredJobs = departmentFilter === 'all' 
    ? jobs 
    : jobs.filter(job => job.department === departmentFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as any },
    },
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut' as any,
            }}
           style={{ willChange: 'transform, opacity' }} />
          <motion.div
            className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut' as any,
            }}
           style={{ willChange: 'transform, opacity' }} />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y: parallaxY }}
          className="container text-center relative z-10"
        >

          <motion.h1
            className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Build the Future
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              of AI with Us
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Founded in 2024, REDDOT is a pioneering AI engineering company. Join our fast-growing team of builders in India working on next-generation intelligence products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            <Button
              onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              View Open Positions <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Culture Section with Image */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <img
                src="/images/reddot-lab.png"
                alt="REDDOT AI team collaboration"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />

              {/* Floating Badge */}
              <motion.div
                className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
               style={{ willChange: 'transform, opacity' }} >
                <p className="text-sm font-semibold text-blue-600">Active Indian Startup</p>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Life at REDDOT
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We believe in building a culture of innovation, collaboration, and continuous learning where every team member can grow and make an impact.
              </p>

              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { title: 'Innovation First', desc: 'Work on cutting-edge projects that push boundaries' },
                  { title: 'Growth Mindset', desc: 'Continuous learning and professional development' },
                  { title: 'Work-Life Balance', desc: 'Flexible arrangements and comprehensive benefits' },
                  { title: 'Diverse Team', desc: 'Inclusive environment celebrating different perspectives' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4"
                    variants={itemVariants}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section id="open-positions" className="py-24 bg-background-secondary relative scroll-mt-20">
        <div className="container">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-slate-600">
              We're hiring talented people to join our growing team
            </p>
          </motion.div>

          {/* Department Filter */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {departments.map((dept) => (
              <motion.button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  departmentFilter === dept
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* Job List (VDart Style) */}
          <motion.div
            className="flex flex-col gap-4 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                className="group relative rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
                variants={itemVariants}
              >
                {/* Main Row */}
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 cursor-pointer"
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm">
                      <span className="flex items-center gap-1.5 font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        <Briefcase size={14} /> {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign size={14} className="text-slate-400" /> {job.salary}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 flex items-center gap-4">
                    <Button
                      className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-8 py-5 text-md font-semibold shadow-md hover:shadow-xl transition-all"
                      onClick={(e) => { e.stopPropagation(); setApplyingToJob(job); setSelectedJob(null); }}
                    >
                      Apply Now
                    </Button>
                    <div className={`p-2 rounded-full transition-transform duration-300 hidden md:block ${selectedJob === job.id ? 'rotate-90 bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                {selectedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-100 bg-slate-50 p-6 md:p-8"
                  >
                    <div className="max-w-3xl">
                      <h4 className="font-semibold text-foreground mb-3 text-lg">Job Description</h4>
                      <p className="text-slate-600 text-base mb-8 leading-relaxed">
                        {job.description}
                      </p>
                      
                      <h4 className="font-semibold text-foreground mb-4 text-lg">Requirements</h4>
                      <ul className="space-y-3">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="text-base text-slate-600 flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No Open Full-Time Positions</h3>
                <p className="text-slate-600">We are not currently hiring for full-time roles. Please check out our Internship Programs below!</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Internship Promo Section */}
      <section className="py-24 bg-gradient-to-b from-background to-slate-50 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
            
            <div className="flex-1 text-center md:text-left relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Are you a student or recent graduate?</h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                Launch your career in AI with our exclusive internship programs. Work on cutting-edge systems, get mentored by top engineers, and make a real impact.
              </p>
              <Button
                variant="secondary"
                className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold text-lg px-8 py-6 rounded-xl shadow-lg"
                onClick={() => window.location.href = '/internship'}
              >
                View Internship Programs
              </Button>
            </div>
            
            <div className="hidden md:flex relative z-10">
              <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                <div className="text-5xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-foreground mb-4">
              Benefits & Perks
            </h2>
            <p className="text-lg text-slate-600">
              We invest in our team's growth and well-being
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { title: 'Health & Wellness Cover', desc: 'Comprehensive medical insurance for employees and families', icon: '🏥' },
              { title: 'EPF & Performance Bonus', desc: 'Statutory provident fund contributions and performance incentives', icon: '💰' },
              { title: 'Flexible Hybrid Model', desc: 'Modern collaborative workplace with flexible remote working', icon: '🏠' },
              { title: 'Upskilling & Certification', desc: 'Stipends for AI/ML certifications, cloud exams, and courses', icon: '📚' },
              { title: 'Top-Tier Tech Stack', desc: 'High-performance workstations, GPU cloud access, and AI tools', icon: '🖥️' },
              { title: 'Paid Leave & Wellness Days', desc: 'Annual paid time off, sick leave, and mental wellness breaks', icon: '✈️' },
              { title: 'Workspace Support', desc: 'Ergonomic workstation and connectivity allowances', icon: '⚡' },
              { title: 'Hackathons & Offsites', desc: 'Regular engineering hack days, AI demos, and team offsites', icon: '🎉' },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-500 transition-all dark:bg-slate-900 dark:border-slate-800"
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  boxShadow: '0 15px 30px rgba(37, 99, 235, 0.1)',
                }}
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear' as any,
          }}
        />

        <div className="container text-center relative z-10">
          <motion.h2
            className="text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Join REDDOT?
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Explore our open positions and apply today to be part of the team building the future of AI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 font-semibold rounded-lg cursor-pointer shadow-xl"
            >
              View All Jobs
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Job Application Modal */}
      {applyingToJob && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setApplyingToJob(null)}
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Apply for Position</h3>
                <p className="text-blue-600 font-semibold text-sm">{applyingToJob.title} · {applyingToJob.department}</p>
              </div>
              <motion.button
                onClick={() => setApplyingToJob(null)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-slate-500" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleApplySubmit)} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('applicantName', { required: 'Full name is required' })}
                  type="text"
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground"
                />
                {errors.applicantName && (
                  <p className="text-red-500 text-xs mt-1">{errors.applicantName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                  })}
                  type="email"
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone & LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">LinkedIn Profile</label>
                  <input
                    {...register('linkedinUrl')}
                    type="url"
                    placeholder="linkedin.com/in/username"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Resume (PDF, DOCX) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    title="Upload Resume"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64 = reader.result as string;
                          // insert filename into the data URL
                          const withName = base64.replace('data:', `data:${file.type};name=${file.name};`);
                          setValue('resumeUrl', withName);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {/* Register the hidden field so react-hook-form tracks it for required validation */}
                  <input type="hidden" {...register('resumeUrl', { required: 'Resume is required' })} />
                </div>
                {errors.resumeUrl && (
                  <p className="text-red-500 text-xs mt-1">{errors.resumeUrl.message}</p>
                )}
              </div>

              {/* Job Details reminder */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">Applying for</p>
                <p className="font-bold text-foreground">{applyingToJob.title}</p>
                <div className="flex gap-4 mt-1 text-sm text-slate-600">
                  <span>📍 {applyingToJob.location}</span>
                  <span>💼 {applyingToJob.type}</span>
                  <span>💰 {applyingToJob.salary}</span>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setApplyingToJob(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={applyMutation.isPending}
                >
                  {applyMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
