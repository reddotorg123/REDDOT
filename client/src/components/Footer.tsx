import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email to subscribe to updates.",
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Subscribed successfully!", {
        description: "Thank you for subscribing to REDDOT AI updates & insights.",
        duration: 5000,
      });
      setEmail("");
      setIsSubmitting(false);
    }, 400);
  };

  const footerSections = [
    {
      title: "Products",
      links: [
        { label: "AI Agents", href: "/#services" },
        { label: "Enterprise Software", href: "/#services" },
        { label: "Cloud Solutions", href: "/#services" },
        { label: "Analytics Platform", href: "/#services" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Machine Learning", href: "/#services" },
        { label: "Automation", href: "/#services" },
        { label: "Data Analytics", href: "/#services" },
        { label: "Digital Transformation", href: "/#services" },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "Healthcare", href: "/#industries" },
        { label: "Finance", href: "/#industries" },
        { label: "Manufacturing", href: "/#industries" },
        { label: "Retail", href: "/#industries" },
        { label: "Government", href: "/#industries" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Blog", href: "/blog" },
        { label: "Case Studies", href: "/#case-studies" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/#about" },
        { label: "Careers", href: "/career" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Security", href: "/security" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-background-secondary border-t border-border">
      {/* Newsletter Section */}
      <motion.div
        className="border-b border-border py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-2">
              Stay Updated
            </h3>
            <p className="text-foreground-tertiary">
              Get the latest news on AI, innovation, and technology trends.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-primary text-white cursor-pointer hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container">
          {/* Top Section: Logo and Description */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-border"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4 group">
                <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 border border-blue-500/20 shadow-sm">
                  <img
                    src="/images/reddot-logo-navbar.png"
                    alt="REDDOT Logo"
                    width={72}
                    height={72}
                    className="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-gradient tracking-tight">
                  REDDOT
                </span>
              </div>
              <p className="text-foreground-tertiary leading-relaxed mb-6">
                Engineering Intelligence for the Future. Building AI Systems,
                Enterprise Software, and Smart Technologies for businesses
                worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex flex-col gap-2 text-foreground-tertiary">
                  <div className="flex items-center gap-3 hover:text-foreground transition-colors">
                    <Mail size={18} className="flex-shrink-0" />
                    <a href="mailto:jaikeerthi156@gmail.com">
                      jaikeerthi156@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 hover:text-foreground transition-colors pl-7">
                    <a href="mailto:jagadish2k2006@gmail.com">
                      jagadish2k2006@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 hover:text-foreground transition-colors pl-7">
                    <a href="mailto:reddot.org123@gmail.com">reddot.org123@gmail.com</a>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-foreground-tertiary mt-3">
                  <div className="flex items-center gap-3 hover:text-foreground transition-colors">
                    <Phone size={18} className="flex-shrink-0" />
                    <a href="tel:+918015024729">+91 80150 24729</a>
                  </div>
                  <div className="flex items-center gap-3 hover:text-foreground transition-colors pl-7">
                    <a href="tel:+918072163133">+91 80721 63133</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground-tertiary hover:text-foreground transition-colors mt-3">
                  <MapPin size={18} className="flex-shrink-0" />
                  <span>Chennai, India</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex flex-col justify-between"
              variants={itemVariants}
            >
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  Connect With Us
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map(social => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className="p-3 rounded-lg bg-background-tertiary hover:bg-accent-primary/10 transition-colors"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon
                          size={20}
                          className="text-foreground-tertiary hover:text-accent-primary transition-colors"
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: "2026", label: "Est. Year" },
                  { number: "12+", label: "Sectors Served" },
                  { number: "100%", label: "Commitment" },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-gradient">
                      {stat.number}
                    </p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Links Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16 pb-16 border-b border-border"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {footerSections.map(section => (
              <motion.div key={section.title} variants={itemVariants}>
                <h4 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Section: Copyright */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-500 text-sm">
              © {currentYear} REDDOT Innovative Solutions. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
              >
                Cookie Settings
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-primary opacity-3 rounded-full blur-3xl"
        />
      </div>
    </footer>
  );
});

export default Footer;
