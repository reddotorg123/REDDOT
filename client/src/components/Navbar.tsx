import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Search, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1]) return match[1];
      const stored = localStorage.getItem("user_selected_lang");
      if (stored) return stored;
    } catch (e) {}
    return "en";
  });
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 50;
      setIsScrolled(current =>
        current === nextIsScrolled ? current : nextIsScrolled
      );
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".lang-dropdown-container")) {
        setIsLangMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/#services" },
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: "/blog" },
    { label: "Career", href: "/career" },
    { label: "Internships", href: "/internship" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-20 gap-4 lg:gap-8">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer py-1 mr-4 lg:mr-8 shrink-0 group"
          whileHover={{ scale: 1.05 }}
          onClick={() => (window.location.href = "/")}
        >
          <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 border border-blue-500/20 shadow-sm group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-300">
            <motion.img
              loading="lazy"
              decoding="async"
              src="/images/reddot-logo-navbar.png"
              alt="REDDOT Logo"
              width={64}
              height={64}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-gradient tracking-tight">
            REDDOT
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-center">
          {navItems.map(item => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("/#")) {
                  const id = item.href.replace("/#", "");
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", `/#${id}`);
                    }
                  }
                }
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group cursor-pointer"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Search */}
          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Search (Ctrl+K)"
            aria-label="Search"
          >
            <Search size={20} />
          </motion.button>

          {/* Language Selector */}
          <div className="relative lang-dropdown-container">
            <motion.button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-slate-600 dark:text-slate-300 flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Change Language"
              aria-label="Language Selector"
            >
              <Globe size={20} />
            </motion.button>

            {isLangMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 overflow-hidden"
              >
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  Select Language
                </div>
                {[
                  { code: "en", name: "English (Default)", native: "English" },
                  { code: "ta", name: "Tamil", native: "தமிழ்" },
                  { code: "hi", name: "Hindi", native: "हिन्दी" },
                  { code: "es", name: "Spanish", native: "Español" },
                  { code: "de", name: "German", native: "Deutsch" },
                  { code: "fr", name: "French", native: "Français" },
                  { code: "ja", name: "Japanese", native: "日本語" },
                  { code: "ar", name: "Arabic", native: "العربية" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLangMenuOpen(false);
                      if (typeof (window as any).changeLanguage === "function") {
                        (window as any).changeLanguage(lang.code);
                      }
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                      selectedLanguage === lang.code
                        ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-slate-800/50"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-slate-400 text-[10px]">{lang.native}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-amber-400" />
            ) : (
              <Moon size={20} className="text-slate-600" />
            )}
          </motion.button>

          {/* Book Consultation Button — Always Visible */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-booking"))
              }
              className="hidden sm:inline-flex bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all opacity-100 border border-blue-400/30 cursor-pointer"
            >
              Book Consultation
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-t border-border"
      >
        <div className="container py-4 flex flex-col gap-4">
          {navItems.map(item => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors py-2"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (item.href.startsWith("/#")) {
                  const id = item.href.replace("/#", "");
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      window.history.pushState(null, "", `/#${id}`);
                    }
                  }
                }
              }}
              whileHover={{ x: 4 }}
            >
              {item.label}
            </motion.a>
          ))}
          <Button
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent("open-booking"));
            }}
            className="w-full bg-gradient-primary text-white"
          >
            Book Consultation
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
