import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "AI/ML Development",
    budget: "under-50,000",
    timeline: "1 to 3 Months",
    requirements: "",
  });

  const formRef = useRef<HTMLFormElement>(null);
  const contactMutation = trpc.contact.submit.useMutation();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Map Google Form entry names to state keys
    let key = name;
    if (name === "entry.37726783") key = "name";
    else if (name === "entry.279976118") key = "email";
    else if (name === "entry.338811961") key = "phone";
    else if (name === "entry.217308409") key = "service";
    else if (name === "entry.994001715") key = "budget";
    else if (name === "entry.2032630066") key = "requirements";

    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new URLSearchParams();
    formDataToSend.append("entry.37726783", formData.name);
    formDataToSend.append("entry.279976118", formData.email);
    formDataToSend.append("entry.338811961", formData.phone);
    formDataToSend.append("entry.217308409", formData.service);
    formDataToSend.append("entry.994001715", formData.budget);
    formDataToSend.append(
      "entry.2032630066",
      `Project Duration & Timeline: ${formData.timeline}\nOpinions & Project Requirements:\n${formData.requirements}`
    );

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSd9xzigYIo05fAFYmueoGpA7HVEOzYdqGEvghj9RunqFHFZcg/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataToSend.toString(),
      }
    )
      .then(() => {
        toast.success("Message Sent!", {
          description: "Your details have been successfully submitted.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "AI/ML Development",
          budget: "under-50,000",
          timeline: "1 to 3 Months",
          requirements: "",
        });
      })
      .catch(() => {
        toast.error("Failed to send message", {
          description: "Please try again later.",
        });
      });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Enterprise & Direct Inquiries",
      contact: "reddot.org123@gmail.com",
      link: "mailto:reddot.org123@gmail.com",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Phone,
      title: "Phone",
      description: "Direct line (Mon - Sat)",
      contact: "+91 80150 24729",
      link: "tel:+918015024729",
      color: "from-purple-600 to-purple-400",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Chat with our team on WhatsApp",
      contact: "+91 80150 24729",
      link: "https://wa.me/918015024729",
      color: "from-green-600 to-green-400",
    },
    {
      icon: MapPin,
      title: "Office",
      description: "Visit us in person",
      contact: "Chennai, India",
      link: "#",
      color: "from-red-600 to-red-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as any },
    },
  };

  return (
    <div className="w-full" ref={containerRef}>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut" as any,
            }}
            style={{ willChange: "transform, opacity" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut" as any,
            }}
            style={{ willChange: "transform, opacity" }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-10"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut" as any,
            }}
            style={{ willChange: "transform, opacity" }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y: parallaxY, opacity }}
          className="container text-center relative z-10"
        >

          <motion.h1
            className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a question or ready to start your next project? We'd love to
            hear from you and discuss how we can help transform your business.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Methods - 3D Cards */}
      <section className="py-24 bg-background relative">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-foreground mb-4">
              Multiple Ways to Connect
            </h2>
            <p className="text-lg text-slate-600">
              Choose your preferred method to reach out to our team
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={idx}
                  href={method.link}
                  target={method.link.startsWith("http") ? "_blank" : undefined}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`}
                  />

                  {/* Icon & Arrow Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-slate-800 group-hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <Send className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors mb-1">
                      {method.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-white/80 transition-colors mb-2 font-medium">
                      {method.description}
                    </p>
                    <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors whitespace-pre-line">
                      {method.contact}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section with Image */}
      <section className="py-24 bg-background-secondary relative overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 -z-10" style={{ y: parallaxY }}>
          <div className="absolute inset-0 bg-gradient-to-r from-background-secondary via-transparent to-background-secondary" />
          <img
            src="/images/hero-bg.webp"
            alt="AI infrastructure workspace"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <form
                ref={formRef}
                action="https://docs.google.com/forms/d/e/1FAIpQLSd9xzigYIo05fAFYmueoGpA7HVEOzYdqGEvghj9RunqFHFZcg/formResponse"
                method="POST"
                target="hidden_iframe"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Full Name & Email Address (Side by Side on medium screens) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="entry.37726783"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="entry.279976118"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                      required
                    />
                  </motion.div>
                </div>

                {/* Phone Number & Type of Service (Side by Side on medium screens) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="entry.338811961"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.22 }}
                  >
                    <label
                      htmlFor="service-needed"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Type of Service Needed
                    </label>
                    <select
                      id="service-needed"
                      name="entry.217308409"
                      title="Type of Service Needed"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-background transition-all text-foreground text-sm font-medium"
                    >
                      <option value="AI/ML Development">
                        AI/ML Development
                      </option>
                      <option value="Web Development">Web Development</option>
                      <option value="Cybersecurity Solutions">
                        Cybersecurity Solutions
                      </option>
                      <option value="Embedded Systems & IoT">
                        Embedded Systems & IoT
                      </option>
                      <option value="VLSI Design">VLSI Design</option>
                      <option value="SEM System Deployment">
                        SEM System Deployment
                      </option>
                      <option value="Other Services">Other Services</option>
                    </select>
                  </motion.div>
                </div>

                {/* Cost (Budget) & Duration/Timeline (Side by Side on medium screens) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.24 }}
                  >
                    <label
                      htmlFor="project-budget"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Estimated Budget (Cost)
                    </label>
                    <select
                      id="project-budget"
                      name="entry.994001715"
                      title="Estimated Budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-background transition-all text-foreground text-sm font-medium"
                    >
                      <option value="under-50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹2 Lakhs">
                        ₹50,000 - ₹2 Lakhs
                      </option>
                      <option value="₹2 Lakhs - ₹10 Lakhs">
                        ₹2 Lakhs - ₹10 Lakhs
                      </option>
                      <option value="₹10 Lakhs+">₹10 Lakhs+</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.26 }}
                  >
                    <label
                      htmlFor="project-timeline"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Project Duration & Timeline
                    </label>
                    <select
                      id="project-timeline"
                      name="timeline"
                      title="Project Timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-background transition-all text-foreground text-sm font-medium"
                    >
                      <option value="Less than 1 Month">
                        Less than 1 Month
                      </option>
                      <option value="1 to 3 Months">1 to 3 Months</option>
                      <option value="3 to 6 Months">3 to 6 Months</option>
                      <option value="6+ Months">6+ Months</option>
                    </select>
                  </motion.div>
                </div>

                {/* Hidden field combining timeline and requirements for Google Forms */}
                <input
                  type="hidden"
                  name="entry.2032630066"
                  value={`Project Duration & Timeline: ${formData.timeline}\nOpinions & Project Requirements:\n${formData.requirements}`}
                />

                {/* Opinions & Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                >
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Opinions & Requirements
                  </label>
                  <Textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Provide your requirements, opinions, and notes about the project..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full"
                >
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-600/50 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <img
                loading="lazy"
                decoding="async"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Team meeting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />

              {/* Floating Stats */}
              <motion.div
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text-sm text-slate-600 mb-1">Response Time</p>
                <p className="text-2xl font-bold text-blue-600">24 Hours</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Location Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Office
            </h2>
            <p className="text-lg text-slate-600">
              Visit us in person or schedule a virtual meeting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Office Visual & Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden h-[420px] border border-slate-200 dark:border-slate-800 relative group shadow-xl"
            >
              <img
                loading="lazy"
                decoding="async"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="REDDOT HQ Innovation Campus, Chennai"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full w-fit mb-2 border border-blue-800/60 backdrop-blur-sm">
                  Chennai Technology Corridor
                </span>
                <h4 className="text-xl font-bold">REDDOT AI Global HQ</h4>
                <p className="text-xs text-slate-300">OMR IT Expressway, Chennai, India</p>
              </div>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-blue-500 transition-all dark:bg-slate-900 dark:border-slate-800 shadow-md">
                <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  REDDOT AI India HQ
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  REDDOT Towers, 4th Floor
                  <br />
                  OMR IT Expressway, Chennai, Tamil Nadu 600096
                  <br />
                  India
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=OMR+Chennai+Tamil+Nadu+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-md text-sm cursor-pointer"
                >
                  Get Directions
                </a>
              </div>

              <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-blue-500 transition-all dark:bg-slate-900 dark:border-slate-800 shadow-md">
                <h4 className="text-lg font-bold text-foreground mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                  <p>
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM IST
                  </p>
                  <p>
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM IST
                  </p>
                  <p>
                    <strong>Sunday:</strong> Closed
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-blue-500 transition-all dark:bg-slate-900 dark:border-slate-800 shadow-md">
                <h4 className="text-lg font-bold text-foreground mb-2">
                  Schedule a Virtual Consultation
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  Can't visit in person? Connect directly with our enterprise AI engineering team.
                </p>
                <Button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-booking"))
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 font-bold py-3 rounded-xl shadow-lg cursor-pointer"
                >
                  Book a Consultation Call
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear" as any,
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
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Let's discuss how REDDOT can help you achieve your goals with
            innovative AI solutions and enterprise software.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-booking"))
              }
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 font-semibold rounded-lg"
            >
              Schedule a Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Hidden iframe for Google Form submission */}
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        className="hidden"
        title="Hidden submission frame"
      ></iframe>
    </div>
  );
}
