import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code, 
  Server, 
  Database,
  Menu,
  X,
  Download,
  Eye,
  Star,
  Zap,
  Rocket,
  Target,
  Calendar,
  Award,
  Users,
  TrendingUp,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Coffee,
  Heart,
  ArrowRight,
  CheckCircle,
  Globe,
  Smartphone,
  Palette,
  Shield,
  Clock,
  MessageSquare,
  Sun,
  Moon,
  User
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { Progress } from "./components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./components/ui/hover-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import TodoApp from "./assets/TodoApp.png";
import PolyFarmacy from "./assets/PolyFarmacy.png";
import Zomo from "./assets/Zomo.png";
import pfp from "./assets/pfp.png";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const ids = ["home", "about", "experience", "projects", "skills", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && visible.target && visible.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { root: null, rootMargin: "0px 0px -40% 0px", threshold: [0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const skills = [
    { name: "React", level: 95, icon: "⚛️", category: "Frontend", color: "from-blue-500 to-cyan-500" },
    { name: "Node.js", level: 90, icon: "🟢", category: "Backend", color: "from-green-500 to-emerald-500" },
    { name: "TypeScript", level: 88, icon: "🔷", category: "Language", color: "from-blue-600 to-indigo-600" },
    { name: "MongoDB", level: 85, icon: "🍃", category: "Database", color: "from-green-600 to-teal-600" },
    { name: "Express.js", level: 92, icon: "🚀", category: "Backend", color: "from-gray-600 to-gray-800" },
    { name: "Tailwind CSS", level: 96, icon: "🎨", category: "Frontend", color: "from-cyan-500 to-blue-500" },
    { name: "Next.js", level: 87, icon: "▲", category: "Framework", color: "from-black to-gray-800" },
    { name: "Python", level: 82, icon: "🐍", category: "Language", color: "from-yellow-500 to-orange-500" },
  ];

  const projects = [
    {
      id: 1,
      title: "TaskForge-MERN",
      description: "A comprehensive task management application built with the MERN stack. Features real-time updates, user authentication, and an intuitive drag-and-drop interface for seamless productivity.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      image: TodoApp,
      github: "https://github.com/OxMxDev/TaskForge-MERN",
      live: "https://task-forge-mern.vercel.app/",
      featured: true,
      stats: { stars: 24, forks: 8, commits: 156 },
      highlights: ["Real-time collaboration", "Drag & Drop", "Authentication", "Responsive Design"]
    },
    {
      id: 2,
      title: "Smart Polypharmacy Checker",
      description: "Healthcare solution addressing polypharmacy risks for elderly patients. Features drug interaction detection, dosage optimization, and comprehensive medication management dashboard.",
      tech: ["React", "Express", "Node.js", "MongoDB", "Chart.js"],
      image: PolyFarmacy,
      github: "https://github.com/OxMxDev/smart-polypharmacy-checker",
      live: "https://smart-polypharmacy-checker.vercel.app/",
      featured: true,
      stats: { stars: 18, forks: 5, commits: 89 },
      highlights: ["Healthcare Focus", "Drug Interactions", "Data Visualization", "Patient Safety"]
    },
    {
      id: 3,
      title: "ZomoReels",
      description: "Social media platform combining food discovery with short-form video content. Features video uploads, social interactions, and restaurant partnerships with seamless content management.",
      tech: ["React", "Express", "Node.js", "ImageKit", "MongoDB"],
      image: Zomo,
      github: "https://github.com/OxMxDev/ZomoReels",
      featured: false,
      stats: { stars: 12, forks: 3, commits: 67 },
      highlights: ["Video Processing", "Social Features", "Content Management", "Restaurant API"]
    },
  ];

  const achievements = [
    { 
      icon: <Code className="w-8 h-8" />, 
      title: "15+", 
      subtitle: "Projects Completed",
      description: "Full-stack applications built with modern technologies",
      color: "from-blue-500 to-purple-600"
    },
    { 
      icon: <Star className="w-8 h-8" />, 
      title: "50+", 
      subtitle: "GitHub Stars",
      description: "Community recognition and open-source contributions",
      color: "from-yellow-500 to-orange-500"
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "3+", 
      subtitle: "Years Experience",
      description: "Continuous learning and professional development",
      color: "from-green-500 to-teal-500"
    },
    { 
      icon: <Target className="w-8 h-8" />, 
      title: "100%", 
      subtitle: "Client Satisfaction",
      description: "Delivering quality solutions that exceed expectations",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const experience = [
    {
      title: "Full-Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      description: "Developing custom web applications for clients across various industries, focusing on modern React and Node.js solutions.",
      achievements: ["Built 15+ production applications", "Maintained 99% client satisfaction", "Reduced development time by 40%"]
    },
    {
      title: "Frontend Developer",
      company: "Personal Projects",
      period: "2021 - 2022",
      description: "Focused on mastering React ecosystem and modern frontend development practices through personal projects.",
      achievements: ["Mastered React & TypeScript", "Built responsive designs", "Implemented modern UI/UX patterns"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "Om delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateLab",
      content: "Working with Om was a game-changer for our startup. He built our MVP quickly and efficiently, helping us launch ahead of schedule.",
      avatar: "MC"
    }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              x: mousePosition.x * -0.02,
              y: mousePosition.y * -0.02,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>

        {/* Enhanced Navigation */}
        <motion.nav 
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrollY > 50 ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-lg' : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.05 }}
              >
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={pfp} alt="Om Dwivedi" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">OD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    Om Dwivedi
                  </div>
                  <div className="text-xs text-muted-foreground">Full-Stack Developer</div>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {["home", "about", "experience", "projects", "skills"].map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    onClick={() => scrollToSection(item)}
                    aria-current={activeSection === item ? "page" : undefined}
                    className={`capitalize transition-all duration-200 hover:bg-primary/10 ${
                      activeSection === item ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                  </Button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle theme"
                  onClick={toggleTheme}
                  className="border border-transparent hover:border-border"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                      <Download className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download my resume</p>
                  </TooltipContent>
                </Tooltip>
                <Button onClick={() => scrollToSection("contact")} aria-label="Hire me contact section" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Hire Me
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border rounded-b-lg"
                  id="mobile-menu"
                >
                  <div className="py-4 space-y-2 px-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                      >
                        {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                      </Button>
                    </div>
                    {["home", "about", "experience", "projects", "skills", "contact"].map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        onClick={() => scrollToSection(item)}
                        className="w-full justify-start capitalize"
                        aria-current={activeSection === item ? "page" : undefined}
                      >
                        {item}
                      </Button>
                    ))}
                    <Separator className="my-2" />
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-20 relative z-10">
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                  <Badge variant="secondary" className="text-sm px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Available for Opportunities
                  </Badge>
                </div>
                
                <h1 className="text-5xl lg:text-8xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-primary to-blue-400 bg-clip-text text-transparent">
                    Full-Stack
                  </span>
                  <br />
                  <span className="text-muted-foreground">Developer</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                  I craft exceptional digital experiences that drive business growth. 
                  Specializing in <span className="text-primary font-semibold">React</span>, <span className="text-primary font-semibold">Node.js</span>, 
                  and modern web technologies.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {[
                  { icon: <Globe className="w-5 h-5" />, text: "Web Development", color: "from-blue-500 to-cyan-500" },
                  { icon: <Smartphone className="w-5 h-5" />, text: "Mobile-First", color: "from-green-500 to-emerald-500" },
                  { icon: <Palette className="w-5 h-5" />, text: "UI/UX Design", color: "from-purple-500 to-pink-500" },
                  { icon: <Shield className="w-5 h-5" />, text: "Secure & Scalable", color: "from-orange-500 to-red-500" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className={`flex items-center gap-2 text-sm font-medium bg-gradient-to-r ${item.color} bg-clip-text text-transparent bg-card/50 backdrop-blur-sm px-4 py-3 rounded-full border border-border/50 hover:border-primary/30 transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <Briefcase className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Let's Work Together
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection("projects")}
                  className="border-border hover:bg-accent group"
                >
                  <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  View My Work
                </Button>
              </motion.div>

              <motion.div 
                className="flex gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {[
                  { icon: <Github className="w-6 h-6" />, href: "https://github.com/OxMxDev", label: "GitHub", color: "hover:bg-gray-100 dark:hover:bg-gray-800" },
                  { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/om-dwivedi129/", label: "LinkedIn", color: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
                  { icon: <Mail className="w-6 h-6" />, href: "mailto:omdwivedi234@gmail.com", label: "Email", color: "hover:bg-green-50 dark:hover:bg-green-900/20" },
                ].map((social, index) => (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 rounded-full bg-card border border-border ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                        whileHover={{ y: -2 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                      >
                        {social.icon}
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/20 bg-gradient-to-br from-primary/20 to-blue-500/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img 
                    src={pfp} 
                    alt="Om Dwivedi" 
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-lg backdrop-blur-sm"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code className="w-8 h-8 text-primary" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-lg backdrop-blur-sm"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Rocket className="w-8 h-8 text-blue-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                <User className="w-4 h-4 mr-2" />
                About Me
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Passionate About <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Innovation</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Currently pursuing B.Tech in Computer Science at SRM Institute of Science and Technology, 
                with a focus on building scalable web applications that make a difference.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                      <p>
                        Hi! I'm <span className="text-primary font-semibold">Om Dwivedi</span>, a passionate Full-Stack Developer 
                        with a keen eye for creating exceptional digital experiences. I specialize in building 
                        scalable web applications that solve real-world problems and drive business growth.
                      </p>
                      <p>
                        My journey in web development started with curiosity and has evolved into a passion for 
                        crafting clean, efficient code. I love working with modern technologies like React, 
                        Node.js, and cloud platforms to bring innovative ideas to life.
                      </p>
                      <p>
                        When I'm not coding, I enjoy exploring emerging technologies, contributing to open-source 
                        projects, and sharing knowledge with the developer community. I believe in continuous 
                        learning and staying updated with the latest industry trends.
                      </p>
                      
                      <div className="flex flex-wrap gap-3 pt-4">
                        {["Problem Solver", "Team Player", "Quick Learner", "Detail Oriented"].map((trait) => (
                          <Badge key={trait} variant="secondary" className="text-xs px-3 py-1">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group hover:scale-105">
                        <CardContent className="p-0">
                          <div className={`text-white mb-4 flex justify-center p-4 rounded-2xl bg-gradient-to-r ${achievement.color} group-hover:scale-110 transition-transform duration-300`}>
                            {achievement.icon}
                          </div>
                          <h3 className="text-3xl font-bold mb-1">{achievement.title}</h3>
                          <p className="text-sm font-medium text-primary mb-2">{achievement.subtitle}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Education & Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    Education & Learning
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">B.Tech Computer Science</h4>
                      <p className="text-primary font-medium mb-1">SRM Institute of Science and Technology</p>
                      <p className="text-sm text-muted-foreground mb-4">2021 - 2025 (Expected)</p>
                      <p className="text-sm text-muted-foreground">
                        Focusing on software engineering, data structures, algorithms, and modern web technologies.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Key Learnings</h4>
                      <div className="space-y-2">
                        {["Full-Stack Development", "Database Design", "System Architecture", "Software Engineering"].map((skill) => (
                          <div key={skill} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                <Briefcase className="w-4 h-4 mr-2" />
                Experience
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Professional <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Building expertise through hands-on projects and continuous learning
              </p>
            </motion.div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="w-fit mt-2 md:mt-0">
                          <Calendar className="w-3 h-3 mr-1" />
                          {exp.period}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-primary">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                <Rocket className="w-4 h-4 mr-2" />
                Portfolio
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Featured <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Showcasing my expertise in full-stack development through real-world applications that solve complex problems
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="mb-12">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="featured" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {projects.filter(p => p.featured).map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} featured />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {projects.slice(0, 3).map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Expertise
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Technical <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Skills</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Proficient in modern technologies and frameworks for building scalable, performant applications
              </p>
            </motion.div>

            <Tabs defaultValue="frontend" className="mb-12">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="frontend" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.filter(skill => skill.category === "Frontend" || skill.category === "Framework").map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="backend" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.filter(skill => skill.category === "Backend" || skill.category === "Language").map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="database" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.filter(skill => skill.category === "Database").map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tools" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SkillCard skill={{ name: "Git", level: 90, icon: "🔧", category: "Tools", color: "from-orange-500 to-red-500" }} index={0} />
                  <SkillCard skill={{ name: "Docker", level: 75, icon: "🐳", category: "Tools", color: "from-blue-500 to-cyan-500" }} index={1} />
                  <SkillCard skill={{ name: "AWS", level: 70, icon: "☁️", category: "Tools", color: "from-yellow-500 to-orange-500" }} index={2} />
                </div>
              </TabsContent>
            </Tabs>

            {/* Skills Overview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-center">Skills Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">3+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">15+</div>
                      <div className="text-sm text-muted-foreground">Technologies</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">20+</div>
                      <div className="text-sm text-muted-foreground">Projects Built</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">100%</div>
                      <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Testimonials
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                What Clients <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Say</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Feedback from satisfied clients and collaborators
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-xs text-primary">{testimonial.company}</p>
                        </div>
                      </div>
                      <blockquote className="text-muted-foreground italic leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="flex gap-1 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Let's Build Something <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Amazing</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to bring your ideas to life? I'm always excited to work on new projects and challenges. 
                Let's discuss how we can create something extraordinary together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: "Email",
                  value: "omdwivedi234@gmail.com",
                  href: "mailto:omdwivedi234@gmail.com",
                  color: "from-blue-500 to-cyan-500",
                  description: "Drop me a line anytime"
                },
                {
                  icon: <Phone className="w-8 h-8" />,
                  title: "Phone",
                  value: "+91 8707564894",
                  href: "tel:+918707564894",
                  color: "from-green-500 to-emerald-500",
                  description: "Let's have a conversation"
                },
                {
                  icon: <MapPin className="w-8 h-8" />,
                  title: "Location",
                  value: "Chennai, Tamil Nadu",
                  href: "#",
                  color: "from-purple-500 to-pink-500",
                  description: "Available for remote work"
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group hover:scale-105 h-full">
                    <CardContent className="p-0">
                      <div className={`text-white mb-6 flex justify-center p-4 rounded-2xl bg-gradient-to-r ${contact.color} group-hover:scale-110 transition-transform duration-300 mx-auto w-fit`}>
                        {contact.icon}
                      </div>
                      <h3 className="font-bold mb-2 text-xl">{contact.title}</h3>
                      <p className="text-primary font-medium mb-2">{contact.value}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20 backdrop-blur-sm">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Whether you need a complete web application, want to improve your existing platform, 
                    or just have an idea you'd like to discuss, I'm here to help make it happen.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Start a Conversation
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Button>
                  </div>

                  <div className="flex gap-6 justify-center">
                    {[
                      { icon: <Github className="w-6 h-6" />, href: "https://github.com/OxMxDev", label: "GitHub", color: "hover:bg-gray-100 dark:hover:bg-gray-800" },
                      { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/om-dwivedi129/", label: "LinkedIn", color: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
                      { icon: <Mail className="w-6 h-6" />, href: "mailto:omdwivedi234@gmail.com", label: "Email", color: "hover:bg-green-50 dark:hover:bg-green-900/20" },
                    ].map((social, index) => (
                      <Tooltip key={social.label}>
                        <TooltipTrigger asChild>
                          <motion.a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-4 rounded-full bg-card border border-border ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                            whileHover={{ y: -2 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            {social.icon}
                          </motion.a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{social.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-border bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={pfp} alt="Om Dwivedi" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">OD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-bold">Om Dwivedi</div>
                  <div className="text-sm text-muted-foreground">Full-Stack Developer</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-xs border-green-500/20 bg-green-500/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Available for hire
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Quick Response
                </Badge>
              </div>
            </div>
            
            <Separator className="mb-8" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-center md:text-left">
                &copy; 2025 Om Dwivedi. Crafted with <Heart className="w-4 h-4 inline text-red-500" /> using React & Tailwind CSS.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Made in India 🇮🇳</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Powered by <Coffee className="w-4 h-4 inline" /> & Code</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

// Project Card Component
const ProjectCard = ({ project, index, featured = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    viewport={{ once: true }}
    className={featured ? "md:col-span-2" : ""}
  >
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 h-full">
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${featured ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.featured && (
          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge variant="secondary" className="text-xs bg-black/50 text-white border-0">
            <Star className="w-3 h-3 mr-1" />
            {project.stats.stars}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 mb-2">
              {project.title}
            </CardTitle>
            <CardDescription className="leading-relaxed text-sm">
              {project.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                {tech}
              </Badge>
            ))}
          </div>

          {project.highlights && (
            <div>
              <h4 className="text-sm font-medium mb-2 text-primary">Key Features:</h4>
              <div className="grid grid-cols-2 gap-1">
                {project.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" asChild className="flex-1 group/btn">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                Code
              </a>
            </Button>
            {project.live && (
              <Button size="sm" asChild className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 group/btn">
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Skill Card Component
const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    viewport={{ once: true }}
  >
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group hover:scale-105">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
              {skill.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">{skill.category}</p>
            </div>
          </div>
          <Badge variant="secondary" className="font-bold">{skill.level}%</Badge>
        </div>
        <div className="space-y-2">
          <Progress value={skill.level} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Proficiency</span>
            <span>{skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : skill.level >= 70 ? 'Intermediate' : 'Beginner'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default App;