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
  Target
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { Progress } from "./components/ui/progress";
import TodoApp from "./assets/TodoApp.png";
import PolyFarmacy from "./assets/PolyFarmacy.png";
import Zomo from "./assets/Zomo.png";
import pfp from "./assets/pfp.png";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    { name: "React", level: 90, icon: "⚛️", category: "Frontend" },
    { name: "Node.js", level: 85, icon: "🟢", category: "Backend" },
    { name: "TypeScript", level: 88, icon: "🔷", category: "Language" },
    { name: "MongoDB", level: 82, icon: "🍃", category: "Database" },
    { name: "Express.js", level: 87, icon: "🚀", category: "Backend" },
    { name: "Tailwind CSS", level: 92, icon: "🎨", category: "Frontend" },
  ];

  const projects = [
    {
      id: 1,
      title: "TaskForge-MERN",
      description: "A comprehensive task management application built with the MERN stack. Features real-time updates, user authentication, and an intuitive drag-and-drop interface for seamless productivity.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: TodoApp,
      github: "https://github.com/OxMxDev/TaskForge-MERN",
      live: "https://task-forge-mern.vercel.app/",
      featured: true,
      stats: { stars: 24, forks: 8 }
    },
    {
      id: 2,
      title: "Smart Polypharmacy Checker",
      description: "Healthcare solution addressing polypharmacy risks for elderly patients. Features drug interaction detection, dosage optimization, and comprehensive medication management dashboard.",
      tech: ["React", "Express", "Node.js", "MongoDB"],
      image: PolyFarmacy,
      github: "https://github.com/OxMxDev/smart-polypharmacy-checker",
      live: "https://smart-polypharmacy-checker.vercel.app/",
      featured: true,
      stats: { stars: 18, forks: 5 }
    },
    {
      id: 3,
      title: "ZomoReels",
      description: "Social media platform combining food discovery with short-form video content. Features video uploads, social interactions, and restaurant partnerships with seamless content management.",
      tech: ["React", "Express", "Node.js", "ImageKit", "MongoDB"],
      image: Zomo,
      github: "https://github.com/OxMxDev/ZomoReels",
      featured: false,
      stats: { stars: 12, forks: 3 }
    },
  ];

  const achievements = [
    { icon: <Code className="w-6 h-6" />, title: "15+ Projects", description: "Full-stack applications built" },
    { icon: <Star className="w-6 h-6" />, title: "50+ GitHub Stars", description: "Community recognition" },
    { icon: <Zap className="w-6 h-6" />, title: "3+ Years", description: "Development experience" },
    { icon: <Target className="w-6 h-6" />, title: "100%", description: "Client satisfaction rate" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Navigation */}
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Om Dwivedi
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-200 ${
                    activeSection === item ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </Button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button onClick={() => scrollToSection("contact")} className="bg-primary hover:bg-primary/90">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                className="md:hidden bg-card/95 backdrop-blur-md border-t border-border"
              >
                <div className="py-4 space-y-2">
                  {["home", "about", "projects", "skills", "contact"].map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      onClick={() => scrollToSection(item)}
                      className="w-full justify-start capitalize"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-16 relative z-10">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
                <Rocket className="w-4 h-4 mr-2" />
                Available for Opportunities
              </Badge>
              <h1 className="text-4xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-blue-400 bg-clip-text text-transparent">
                  Full-Stack
                </span>
                <br />
                <span className="text-muted-foreground">Developer</span>
              </h1>
            </motion.div>

            <motion.p 
              className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I craft exceptional digital experiences from concept to deployment. 
              Specializing in React, Node.js, and modern web technologies to build 
              scalable applications that drive business growth.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { icon: <Code className="w-5 h-5" />, text: "Frontend" },
                { icon: <Server className="w-5 h-5" />, text: "Backend" },
                { icon: <Database className="w-5 h-5" />, text: "Database" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2 text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border/50"
                  whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                >
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button 
                size="lg" 
                onClick={() => scrollToSection("contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                Let's Work Together
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection("projects")}
                className="border-border hover:bg-accent"
              >
                <Eye className="w-4 h-4 mr-2" />
                View My Work
              </Button>
            </motion.div>

            <motion.div 
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/OxMxDev", label: "GitHub" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://www.linkedin.com/in/om-dwivedi129/", label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                >
                  {social.icon}
                </motion.a>
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
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-border/20 bg-gradient-to-br from-primary/20 to-blue-500/20 backdrop-blur-sm">
                <img 
                  src={pfp} 
                  alt="Om Dwivedi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 animate-glow" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              About Me
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Passionate About <span className="text-primary">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Currently pursuing B.Tech in Computer Science at SRM Institute of Science and Technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-0">
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      Hi! I'm <span className="text-primary font-semibold">Om Dwivedi</span>, a passionate Full-Stack Developer 
                      with a keen eye for creating exceptional digital experiences. I specialize in building 
                      scalable web applications that solve real-world problems.
                    </p>
                    <p>
                      My journey in web development started with curiosity and has evolved into a passion for 
                      crafting clean, efficient code. I love working with modern technologies like React, 
                      Node.js, and cloud platforms to bring innovative ideas to life.
                    </p>
                    <p>
                      When I'm not coding, I enjoy exploring emerging technologies, contributing to open-source 
                      projects, and sharing knowledge with the developer community.
                    </p>
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
                    <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="text-primary mb-3 flex justify-center">
                          {achievement.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              Portfolio
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing my expertise in full-stack development through real-world applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={project.featured ? "xl:col-span-2" : ""}
              >
                <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {project.stats.stars}
                      </div>
                    </div>
                    <CardDescription className="leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      {project.live && (
                        <Button size="sm" asChild className="flex-1">
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              Expertise
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proficient in modern technologies and frameworks for building scalable applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">{skill.category}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{skill.level}%</Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Let's Build Something <span className="text-primary">Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your ideas to life? I'm always excited to work on new projects and challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email",
                value: "omdwivedi234@gmail.com",
                href: "mailto:omdwivedi234@gmail.com",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Phone",
                value: "+91 8707564894",
                href: "tel:+918707564894",
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Location",
                value: "Chennai, Tamil Nadu",
                href: "#",
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">{contact.title}</h3>
                    <p className="text-muted-foreground">{contact.value}</p>
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
            <div className="flex gap-4 justify-center mb-8">
              {[
                { icon: <Github className="w-5 h-5" />, href: "https://github.com/OxMxDev", label: "GitHub" },
                { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/om-dwivedi129/", label: "LinkedIn" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:omdwivedi234@gmail.com", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <Mail className="w-4 h-4 mr-2" />
              Start a Conversation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-8 px-4 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Separator className="mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-center md:text-left">
              &copy; 2025 Om Dwivedi. Crafted with ❤️ using React & Tailwind CSS.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Available for hire
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;