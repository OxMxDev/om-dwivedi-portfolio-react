import { useState, useEffect, useRef } from "react";
import {
	Home,
	User,
	Lightbulb,
	Briefcase,
	Mail,
	Github,
	Linkedin,
	FileText,
	Menu,
	X,
	Code,
	Globe,
	Database,
	Server,
	Component,
	BookOpen,
	GitBranch,
	Send,
	CheckCircle,
	RotateCw,
	Volume2,
	StopCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";

// This is the main component of your portfolio website
const App = () => {
	// State to manage the active section for navigation highlighting
	const [activeSection, setActiveSection] = useState("home");
	// State to manage the mobile menu visibility
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [audio, setAudio] = useState(null);

	// Ref for the background canvas element
	const canvasRef = useRef(null);

	// A sample object to hold your personal information
	// You can easily replace this with your own data
	const portfolioData = {
		name: "Om Dwivedi",
		tagline: "Building dynamic web experiences with React & Vite",
		about:
			"I'm a passionate third-year computer science student specializing in front-end and full-stack development. I enjoy turning complex problems into simple, beautiful, and intuitive designs. My journey in web development is driven by a curiosity for new technologies and a desire to create impactful digital products.",
		projects: [
			{
				title: "E-commerce Platform",
				description:
					"A full-stack e-commerce site with user authentication, product listings, a shopping cart, and a checkout system. Built with the MERN stack.",
				technologies: [
					"React",
					"Node.js",
					"Express",
					"MongoDB",
					"Tailwind CSS",
				],
				github: "https://github.com/yourusername/ecommerce-platform",
				live: "https://your-live-demo.com/ecommerce",
			},
			{
				title: "Real-time Chat App",
				description:
					"A real-time chat application using WebSockets. Users can create rooms and chat with others instantly.",
				technologies: ["React", "Node.js", "Socket.IO", "TypeScript"],
				github: "https://github.com/yourusername/chat-app",
				live: "https://your-live-demo.com/chat-app",
			},
			{
				title: "Personal Portfolio v1.0",
				description:
					"The first iteration of my personal website, showcasing my skills and projects. A great project to practice core web concepts.",
				technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
				github: "https://github.com/yourusername/old-portfolio",
				live: "https://your-live-demo.com/old-portfolio",
			},
		],
		skills: [
			{ name: "React", icon: <Code /> },
			{ name: "JavaScript", icon: <Globe /> },
			{ name: "HTML5", icon: <Component /> },
			{ name: "CSS3", icon: <Lightbulb /> },
			{ name: "Tailwind CSS", icon: <Briefcase /> },
			{ name: "Node.js", icon: <Server /> },
			{ name: "MongoDB", icon: <Database /> },
			{ name: "Git", icon: <GitBranch /> },
		],
	};

	const handleTextToSpeech = async (text) => {
		if (isSpeaking) {
			if (audio) {
				audio.pause();
				audio.currentTime = 0;
			}
			setIsSpeaking(false);
			return;
		}

		setIsSpeaking(true);
		const payload = {
			contents: [
				{
					parts: [{ text: text }],
				},
			],
			generationConfig: {
				responseModalities: ["AUDIO"],
				speechConfig: {
					voiceConfig: {
						prebuiltVoiceConfig: { voiceName: "Puck" }, // A lively and upbeat voice
					},
				},
			},
			model: "gemini-2.5-flash-preview-tts",
		};

		const apiKey = "";
		const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

		const retryFetch = async (url, options, retries = 5) => {
			let delay = 1000; // 1 second initial delay
			for (let i = 0; i < retries; i++) {
				try {
					const response = await fetch(url, options);
					if (response.status === 429) {
						console.warn(`Rate limit exceeded, retrying in ${delay}ms...`);
						await new Promise((res) => setTimeout(res, delay));
						delay *= 2; // Exponential backoff
						continue;
					}
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return await response.json();
				} catch (error) {
					if (i === retries - 1) throw error;
				}
			}
		};

		try {
			const result = await retryFetch(apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const part = result?.candidates?.[0]?.content?.parts?.[0];
			const audioData = part?.inlineData?.data;
			const mimeType = part?.inlineData?.mimeType;

			if (audioData && mimeType && mimeType.startsWith("audio/")) {
				const pcmData = base64ToArrayBuffer(audioData);
				const pcm16 = new Int16Array(pcmData);
				// The API returns PCM 16-bit audio data at 16000Hz, this is a reasonable assumption
				const wavBlob = pcmToWav(pcm16, 16000);
				const audioUrl = URL.createObjectURL(wavBlob);
				const newAudio = new Audio(audioUrl);

				newAudio.play();
				setAudio(newAudio);

				newAudio.onended = () => setIsSpeaking(false);
			} else {
				throw new Error("Invalid audio response from API");
			}
		} catch (e) {
			console.error("Text-to-speech failed:", e);
			setIsSpeaking(false);
		}
	};

	const base64ToArrayBuffer = (base64) => {
		const binaryString = atob(base64);
		const len = binaryString.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes.buffer;
	};

	const pcmToWav = (pcmData, sampleRate) => {
		const pcm16 = pcmData;
		const dataLength = pcm16.length * 2;
		const buffer = new ArrayBuffer(44 + dataLength);
		const view = new DataView(buffer);

		// RIFF identifier
		writeString(view, 0, "RIFF");
		// File size
		view.setUint32(4, 36 + dataLength, true);
		// RIFF type
		writeString(view, 8, "WAVE");
		// format chunk identifier
		writeString(view, 12, "fmt ");
		// format chunk length
		view.setUint32(16, 16, true);
		// sample format (1 = PCM)
		view.setUint16(20, 1, true);
		// channel count
		view.setUint16(22, 1, true);
		// sample rate
		view.setUint32(24, sampleRate, true);
		// byte rate (sample rate * block align)
		view.setUint32(28, sampleRate * 2, true);
		// block align (channel count * bytes per sample)
		view.setUint16(32, 2, true);
		// bits per sample
		view.setUint16(34, 16, true);
		// data chunk identifier
		writeString(view, 36, "data");
		// data chunk length
		view.setUint32(40, dataLength, true);

		// Write PCM data
		let offset = 44;
		for (let i = 0; i < pcm16.length; i++) {
			view.setInt16(offset, pcm16[i], true);
			offset += 2;
		}

		return new Blob([view], { type: "audio/wav" });
	};

	const writeString = (view, offset, string) => {
		for (let i = 0; i < string.length; i++) {
			view.setUint8(offset + i, string.charCodeAt(i));
		}
	};

	// Effect for the background animation
	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let animationFrameId;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		const particles = [];
		const numParticles = 100;

		class Particle {
			constructor(x, y) {
				this.x = x;
				this.y = y;
				this.size = Math.random() * 2 + 1;
				this.speedX = Math.random() * 0.5 - 0.25;
				this.speedY = Math.random() * 0.5 - 0.25;
				this.color = `rgba(139, 230, 192, ${Math.random()})`; // Green-ish particles
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
				if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
			}

			draw() {
				ctx.fillStyle = this.color;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
			}
		}

		const createParticles = () => {
			for (let i = 0; i < numParticles; i++) {
				particles.push(
					new Particle(
						Math.random() * canvas.width,
						Math.random() * canvas.height
					)
				);
			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (const particle of particles) {
				particle.update();
				particle.draw();
			}
			animationFrameId = requestAnimationFrame(animate);
		};

		createParticles();
		animate();

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	// Helper function to handle smooth scrolling
	const scrollToSection = (id) => {
		document.getElementById(id).scrollIntoView({ behavior: "smooth" });
		setActiveSection(id);
		setIsMenuOpen(false); // Close menu on mobile after clicking a link
	};

	// Effect to update the active section based on scroll position
	useEffect(() => {
		const sections = ["home", "about", "skills", "projects", "contact"];
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.5, // Highlight section when 50% of it is in view
			}
		);

		sections.forEach((section) => {
			const el = document.getElementById(section);
			if (el) {
				observer.observe(el);
			}
		});

		return () => {
			sections.forEach((section) => {
				const el = document.getElementById(section);
				if (el) {
					observer.unobserve(el);
				}
			});
		};
	}, []);

	return (
		<div className="relative bg-gray-950 text-gray-200 font-inter min-h-screen">
			{/* Background Canvas */}
			<canvas
				ref={canvasRef}
				className="absolute top-0 left-0 w-full h-full -z-10 opacity-30"
			></canvas>

			{/* Tailwind CSS CDN is loaded in index.html for this immersive block */}
			{/* <script src="https://cdn.tailwindcss.com"></script> */}
			<style>
				{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .nav-item { transition: color 0.3s ease, transform 0.3s ease; }
        .nav-item.active { @apply text-green-400 font-bold transform scale-110; }
        .section-container { min-height: 100vh; padding-top: 6rem; padding-bottom: 6rem; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; z-index: 10; }
        .card-project { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-project:hover { transform: translateY(-8px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .slide-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.5s forwards;
          animation-timing-function: ease-out;
        }
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .glow-border {
          position: relative;
          z-index: 1;
          display: inline-block;
          border-radius: 9999px;
          padding: 4px; /* Adjust padding for glow thickness */
        }
        .glow-border::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(45deg, #84e18d, #34d399, #10b981);
          border-radius: 9999px;
          z-index: -1;
          opacity: 0.8;
          filter: blur(10px);
          animation: glow 3s infinite alternate;
        }
        @keyframes glow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        `}
			</style>

			{/* Header component with fixed position for navigation */}
			<header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm shadow-lg p-4 transition-all duration-300 ease-in-out">
				<div className="container mx-auto flex justify-between items-center px-4 md:px-0">
					<h1 className="text-2xl font-bold text-green-400">OD.</h1>
					<nav className="hidden md:flex space-x-6 text-lg">
						<button
							onClick={() => scrollToSection("home")}
							className={`nav-item ${activeSection === "home" ? "active" : ""}`}
						>
							Home
						</button>
						<button
							onClick={() => scrollToSection("about")}
							className={`nav-item ${
								activeSection === "about" ? "active" : ""
							}`}
						>
							About
						</button>
						<button
							onClick={() => scrollToSection("skills")}
							className={`nav-item ${
								activeSection === "skills" ? "active" : ""
							}`}
						>
							Skills
						</button>
						<button
							onClick={() => scrollToSection("projects")}
							className={`nav-item ${
								activeSection === "projects" ? "active" : ""
							}`}
						>
							Projects
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className={`nav-item ${
								activeSection === "contact" ? "active" : ""
							}`}
						>
							Contact
						</button>
					</nav>
					<button
						className="md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
				{/* Mobile menu */}
				{isMenuOpen && (
					<nav className="md:hidden flex flex-col items-center bg-gray-900 absolute top-full left-0 right-0 py-4 space-y-4 shadow-lg animate-fade-in-down">
						<button
							onClick={() => scrollToSection("home")}
							className={`nav-item text-xl ${
								activeSection === "home" ? "active" : ""
							}`}
						>
							Home
						</button>
						<button
							onClick={() => scrollToSection("about")}
							className={`nav-item text-xl ${
								activeSection === "about" ? "active" : ""
							}`}
						>
							About
						</button>
						<button
							onClick={() => scrollToSection("skills")}
							className={`nav-item text-xl ${
								activeSection === "skills" ? "active" : ""
							}`}
						>
							Skills
						</button>
						<button
							onClick={() => scrollToSection("projects")}
							className={`nav-item text-xl ${
								activeSection === "projects" ? "active" : ""
							}`}
						>
							Projects
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className={`nav-item text-xl ${
								activeSection === "contact" ? "active" : ""
							}`}
						>
							Contact
						</button>
					</nav>
				)}
			</header>

			<main className="container mx-auto px-4 md:px-0 relative z-10">
				{/* Hero Section */}
				<section
					id="home"
					className="section-container text-center"
					style={{ minHeight: "100vh" }}
				>
					<div className="max-w-4xl slide-in-up flex flex-col items-center">
						<div className="mb-8 glow-border animate-fade-in-down">
							<img
								src="https://placehold.co/200x200/22c55e/ffffff?text=OD" // Changed text to OD
								alt="Your Profile Picture"
								className="w-48 h-48 rounded-full object-cover border-4 border-gray-950"
							/>
						</div>
						<h2 className="text-4xl md:text-6xl font-bold mb-2 text-white animate-fade-in-up">
							Hi, I'm{" "}
							<span className="text-green-400">{portfolioData.name}</span>.
						</h2>
						<p
							className="text-xl md:text-2xl text-gray-400 font-light mb-8 animate-fade-in-up"
							style={{ animationDelay: "0.2s" }}
						>
							{portfolioData.tagline}
						</p>
						<div
							className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
							style={{ animationDelay: "0.4s" }}
						>
							<button
								onClick={() => scrollToSection("projects")}
								className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
							>
								View My Work
							</button>
							<a
								href="uploaded:Om%20Dwivedi%20resume%20(1).pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
							>
								Download Resume
							</a>
						</div>
						<div
							className="flex justify-center gap-4 text-white mt-8 animate-fade-in-up"
							style={{ animationDelay: "0.6s" }}
						>
							<a
								href="https://github.com/OxMxDev"
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
								aria-label="GitHub"
							>
								<Github size={24} />
							</a>
							<a
								href="http://www.linkedin.com/in/om-dwivedi129"
								target="_blank"
								rel="noopener noreferrer"
								className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
								aria-label="LinkedIn"
							>
								<Linkedin size={24} />
							</a>
						</div>
					</div>
				</section>

				{/* About Section */}
				<section id="about" className="section-container">
					<div className="max-w-4xl text-center md:text-left">
						<h3 className="text-4xl md:text-5xl font-bold mb-6 text-white slide-in-up">
							<User size={40} className="inline-block mr-3 text-green-400" />
							About Me
						</h3>
						<div className="flex flex-col md:flex-row items-center gap-4 mb-8">
							<p
								className="text-lg md:text-xl leading-relaxed text-gray-300 slide-in-up flex-grow"
								style={{ animationDelay: "0.1s" }}
							>
								{portfolioData.about}
							</p>
							<button
								onClick={() => handleTextToSpeech(portfolioData.about)}
								className="flex-shrink-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-green-400 font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
								disabled={isSpeaking}
							>
								{isSpeaking ? <StopCircle size={24} /> : <Volume2 size={24} />}
							</button>
						</div>
					</div>
				</section>

				{/* Skills Section */}
				<section id="skills" className="section-container">
					<div className="max-w-4xl w-full text-center">
						<h3 className="text-4xl md:text-5xl font-bold mb-8 text-white slide-in-up">
							<Lightbulb
								size={40}
								className="inline-block mr-3 text-green-400"
							/>
							Skills
						</h3>
						<div
							className="grid grid-cols-2 md:grid-cols-4 gap-6 slide-in-up"
							style={{ animationDelay: "0.2s" }}
						>
							{portfolioData.skills.map((skill, index) => (
								<div
									key={index}
									className="bg-gray-800 p-6 rounded-xl flex flex-col items-center shadow-lg transition-all duration-300 hover:bg-gray-700 hover:scale-105 group"
								>
									<div className="text-green-400 mb-3 group-hover:text-green-300 transition-colors duration-300">
										{skill.icon}
									</div>
									<span className="text-lg font-semibold text-gray-200 group-hover:text-white">
										{skill.name}
									</span>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Projects Section */}
				<section id="projects" className="section-container">
					<div className="max-w-6xl w-full text-center">
						<h3 className="text-4xl md:text-5xl font-bold mb-8 text-white slide-in-up">
							<Briefcase
								size={40}
								className="inline-block mr-3 text-green-400"
							/>
							My Projects
						</h3>
						<div className="grid md:grid-cols-2 gap-8">
							{portfolioData.projects.map((project, index) => (
								<div
									key={index}
									className="bg-gray-800 p-8 rounded-xl shadow-lg card-project slide-in-up"
									style={{ animationDelay: `${0.2 + index * 0.1}s` }}
								>
									<h4 className="text-2xl font-bold mb-2 text-white">
										{project.title}
									</h4>
									<p className="text-gray-400 mb-4">{project.description}</p>
									<div className="flex flex-wrap gap-2 mb-4">
										{project.technologies.map((tech, i) => (
											<span
												key={i}
												className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
											>
												{tech}
											</span>
										))}
									</div>
									<div className="flex gap-4 justify-center md:justify-start">
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
										>
											<Github size={20} /> Code
										</a>
										<a
											href={project.live}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors duration-300"
										>
											<Globe size={20} /> Live Demo
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Contact Section */}
				<section id="contact" className="section-container">
					<div className="max-w-2xl w-full text-center">
						<h3 className="text-4xl md:text-5xl font-bold mb-8 text-white slide-in-up">
							<Mail size={40} className="inline-block mr-3 text-green-400" />
							Get In Touch
						</h3>
						<p
							className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8 slide-in-up"
							style={{ animationDelay: "0.1s" }}
						>
							I'm currently seeking internship opportunities and would love to
							hear from you.
						</p>
						<ContactForm />
					</div>
				</section>
			</main>

			<footer className="bg-gray-900 text-center text-gray-500 p-4 mt-12">
				<p>
					&copy; {new Date().getFullYear()} Om Dwivedi. All rights reserved.
				</p>
			</footer>
		</div>
	);
};

// Contact Form Component using react-hook-form
const ContactForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isRefining, setIsRefining] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState(null);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const watchMessage = watch("message");

	const retryFetch = async (url, options, retries = 5) => {
		let delay = 1000;
		for (let i = 0; i < retries; i++) {
			try {
				const response = await fetch(url, options);
				if (response.status === 429) {
					console.warn(`Rate limit exceeded, retrying in ${delay}ms...`);
					await new Promise((res) => setTimeout(res, delay));
					delay *= 2;
					continue;
				}
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				if (i === retries - 1) throw error;
			}
		}
	};

	const refineMessage = async () => {
		setIsRefining(true);
		setError(null);
		try {
			const prompt = `Refine the following message for a professional context, correcting any grammar and improving the clarity and tone. The message is for a job application or inquiry. Please keep the original intent of the message. Return only the refined message text. Here is the message: "${watchMessage}"`;
			const payload = {
				contents: [
					{
						parts: [{ text: prompt }],
					},
				],
				model: "gemini-2.5-flash-preview-05-20",
			};

			const apiKey = "";
			const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

			const result = await retryFetch(apiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const refinedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
			if (refinedText) {
				setValue("message", refinedText);
			} else {
				setError("Failed to refine message with AI. Please try again.");
			}
		} catch (e) {
			console.error("AI refinement failed:", e);
			setError("Failed to refine message with AI. Please try again.");
		} finally {
			setIsRefining(false);
		}
	};

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		setError(null);

		// Replace these with your actual EmailJS IDs
		const serviceID = "service_mowwi6q"; // e.g., 'service_xxxxxxxx'
		const templateID = "template_avj00ay"; // e.g., 'template_xxxxxxxx'
		const publicKey = "8oDFzNy5p-hSxSK9o"; // e.g., 'your_public_key'

		const emailjsUrl = "https://api.emailjs.com/api/v1.0/email/send";

		try {
			const payload = {
				service_id: serviceID,
				template_id: templateID,
				user_id: publicKey,
				template_params: {
					from_name: data.name,
					from_email: data.email,
					message: data.message,
				},
			};

			const response = await fetch(emailjsUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`EmailJS error! status: ${response.status} - ${errorText}`
				);
			}

			setIsSubmitted(true);
			reset();
		} catch (e) {
			console.error("Error sending email: ", e);
			setError(
				`Failed to send message: ${e.message}. Please check your EmailJS setup.`
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
				<CheckCircle size={40} />
				<p className="text-xl font-semibold">Message Sent!</p>
				<p>Thank you for reaching out. I'll get back to you shortly.</p>
				<button
					onClick={() => setIsSubmitted(false)}
					className="mt-4 px-4 py-2 bg-green-700 hover:bg-green-800 rounded-lg transition-colors duration-300"
				>
					Send another message
				</button>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-xl mx-auto space-y-6"
		>
			<div className="flex flex-col text-left">
				<label htmlFor="name" className="text-gray-400 mb-1">
					Name
				</label>
				<input
					id="name"
					type="text"
					{...register("name", { required: "Name is required" })}
					className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
				/>
				{errors.name && (
					<span className="text-red-400 text-sm mt-1">
						{errors.name.message}
					</span>
				)}
			</div>

			<div className="flex flex-col text-left">
				<label htmlFor="email" className="text-gray-400 mb-1">
					Email
				</label>
				<input
					id="email"
					type="email"
					{...register("email", {
						required: "Email is required",
						pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
					})}
					className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
				/>
				{errors.email && (
					<span className="text-red-400 text-sm mt-1">
						{errors.email.message}
					</span>
				)}
			</div>

			<div className="flex flex-col text-left">
				<div className="flex justify-between items-center">
					<label htmlFor="message" className="text-gray-400 mb-1">
						Message
					</label>
					<button
						type="button"
						onClick={refineMessage}
						disabled={isRefining || !watchMessage}
						className="flex items-center gap-1 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors duration-300"
					>
						{isRefining ? (
							<RotateCw size={16} className="animate-spin" />
						) : (
							"✨ Refine with AI"
						)}
					</button>
				</div>
				<textarea
					id="message"
					rows="5"
					{...register("message", { required: "Message is required" })}
					className="bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:border-green-500 transition-colors"
				></textarea>
				{errors.message && (
					<span className="text-red-400 text-sm mt-1">
						{errors.message.message}
					</span>
				)}
			</div>

			{error && (
				<div className="p-4 bg-red-800 text-white rounded-lg">{error}</div>
			)}

			<button
				type="submit"
				disabled={isSubmitting}
				className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-lg shadow-lg transition-all duration-300
          ${
						isSubmitting
							? "bg-green-800 cursor-not-allowed"
							: "bg-green-500 hover:bg-green-600 transform hover:scale-105"
					}`}
			>
				{isSubmitting ? (
					<>
						<RotateCw size={20} className="animate-spin" /> Sending...
					</>
				) : (
					<>
						<Send size={20} /> Send Message
					</>
				)}
			</button>

			<div className="flex justify-center gap-4 text-white mt-8">
				<a
					href="mailto:your.email@example.com"
					className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
					aria-label="Email"
				>
					<Mail size={24} />
				</a>
				<a
					href="https://github.com/OxMxDev"
					target="_blank"
					rel="noopener noreferrer"
					className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
					aria-label="GitHub"
				>
					<Github size={24} />
				</a>
				<a
					href="http://www.linkedin.com/in/om-dwivedi129"
					target="_blank"
					rel="noopener noreferrer"
					className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
					aria-label="LinkedIn"
				>
					<Linkedin size={24} />
				</a>
				<a
					href="uploaded:Om%20Dwivedi%20resume%20(1).pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300"
					aria-label="Resume"
				>
					<FileText size={24} />
				</a>
			</div>
		</form>
	);
};

export default App;
