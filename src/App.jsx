import { useState, useEffect, useRef } from "react";
import {
	ChevronRight,
	ChevronsRight,
	Home,
	User as UserIcon,
	Code,
	Mail,
	Github,
	Linkedin,
	FileText,
	RotateCw,
	Lightbulb,
	Briefcase,
	Trash2,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const portfolioData = {
	name: "Om Dwivedi",
	tagline: "Cybernetic Engineer & Digital Architect",
	bio: `// Mission Log_1: Initializing
I am Om Dwivedi, a third-year Computer Science student specializing in crafting digital realities. My work focuses on constructing robust front-end architectures and deploying full-stack solutions. My core directive is to translate complex data into intuitive and elegant user interfaces. I believe in the power of clean code and pixel-perfect design.`,
	skills: {
		"Primary Protocol Stack": [
			"React.js",
			"JavaScript (ES6+)",
			"TypeScript",
			"HTML5",
			"CSS3",
			"Tailwind CSS",
		],
		"Backend & Database": [
			"Node.js",
			"Express.js",
			"MongoDB",
			"PostgreSQL",
			"Firebase",
		],
		"Tools & Systems": ["Git", "VS Code", "Webpack", "Figma", "Linux"],
	},
	projects: [
		{
			title: "E-commerce Platform",
			description:
				"A full-stack e-commerce solution with user authentication, a product catalog, and a secure checkout system. Built to handle high-volume transactions with optimized performance.",
			technologies: ["React", "Node.js", "Express", "MongoDB"],
			code: `import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};`,
			links: {
				github: "https://github.com/yourusername/ecommerce-platform",
				live: "https://your-live-demo.com/ecommerce",
			},
		},
		{
			title: "Real-time Chat App",
			description:
				"A real-time chat application with multiple rooms, user authentication, and private messaging. Utilizes WebSockets for instant data transmission.",
			technologies: ["React", "Node.js", "Socket.IO", "PostgreSQL"],
			code: `// server.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});`,
			links: {
				github: "https://github.com/yourusername/chat-app",
				live: "https://your-live-demo.com/chat-app",
			},
		},
	],
	contact: {
		email: "om.dwivedi@example.com",
		linkedin: "https://www.linkedin.com/in/om-dwivedi129",
		github: "https://github.com/OxMxDev",
		resume: "uploaded:Om%20Dwivedi%20resume%20(1).pdf",
	},
};

const pages = (loadScreen) => ({
	home: () => (
		<>
			<span className="text-green-400 font-bold">// System Status: Online</span>
			<p className="text-xl md:text-2xl mt-2">
				Welcome, Captain {portfolioData.name}.
			</p>
			<p className="text-lg md:text-xl text-gray-400 mt-1">
				Your personal terminal is now active. Use the navigation buttons below
				to access your mission logs, skillset, and project data.
			</p>
			<p className="text-lg md:text-xl text-gray-400 mt-4">
				<span className="text-green-400">
					<ChevronRight size={16} className="inline mr-1" />
					{["home", "about", "skills", "projects", "contact"].map(
						(cmd, index) => (
							<React.Fragment key={cmd}>
								<button
									className="text-green-300 hover:text-white mx-1"
									onClick={() => loadScreen(cmd)}
								>
									{cmd}
								</button>
								{index < 4 && <span className="text-gray-500">|</span>}
							</React.Fragment>
						)
					)}
				</span>
			</p>
		</>
	),
	about: () => (
		<>
			<span className="text-green-400 font-bold">// Mission Log: BIO</span>
			<p className="mt-2 text-lg whitespace-pre-wrap">{portfolioData.bio}</p>
		</>
	),
	skills: () => (
		<>
			<span className="text-green-400 font-bold">
				// System Diagnostics: Skill Matrix
			</span>
			{Object.entries(portfolioData.skills).map(([category, skills]) => (
				<div key={category} className="mt-4">
					<p className="text-lg text-green-300 font-semibold mb-2">
						{category}:
					</p>
					<ul className="flex flex-wrap gap-2 text-sm text-gray-400">
						{skills.map((skill) => (
							<li key={skill} className="bg-gray-700 px-3 py-1 rounded-full">
								{skill}
							</li>
						))}
					</ul>
				</div>
			))}
		</>
	),
	projects: () => (
		<>
			<span className="text-green-400 font-bold">
				// Project Log: Data Recovery
			</span>
			{portfolioData.projects.map((project) => (
				<div
					key={project.title}
					className="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg"
				>
					<h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
					<p className="text-gray-400 mb-2">{project.description}</p>
					<div className="flex flex-wrap gap-2 mb-4 text-sm">
						{project.technologies.map((tech) => (
							<span key={tech} className="bg-gray-700 px-2 py-1 rounded">
								{tech}
							</span>
						))}
					</div>
					<div className="flex gap-4">
						<a
							href={project.links.github}
							target="_blank"
							rel="noopener noreferrer"
							className="text-green-400 hover:text-white transition-colors duration-200"
						>
							View Code
						</a>
						<a
							href={project.links.live}
							target="_blank"
							rel="noopener noreferrer"
							className="text-green-400 hover:text-white transition-colors duration-200"
						>
							Live Demo
						</a>
					</div>
					<div className="mt-4">
						<SyntaxHighlighter
							language="javascript"
							style={vscDarkPlus}
							customStyle={{
								borderRadius: "0.5rem",
								padding: "1rem",
								background: "#1a1a2e",
							}}
						>
							{project.code}
						</SyntaxHighlighter>
					</div>
				</div>
			))}
		</>
	),
	contact: () => (
		<>
			<span className="text-green-400 font-bold">
				// Communication Channel: OPEN
			</span>
			<p className="mt-2 text-lg">
				To initiate a secure transmission, use the communication module below:
			</p>
			<div className="mt-4">
				<p>
					Email:{" "}
					<a
						href={`mailto:${portfolioData.contact.email}`}
						className="text-green-400 hover:text-white"
					>
						{portfolioData.contact.email}
					</a>
				</p>
				<p>
					LinkedIn:{" "}
					<a
						href={portfolioData.contact.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-400 hover:text-white"
					>
						Om Dwivedi
					</a>
				</p>
				<p>
					GitHub:{" "}
					<a
						href={portfolioData.contact.github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-400 hover:text-white"
					>
						OxMxDev
					</a>
				</p>
				<p>
					Resume:{" "}
					<a
						href={portfolioData.contact.resume}
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-400 hover:text-white"
					>
						Download
					</a>
				</p>
			</div>
		</>
	),
});

const App = () => {
	const [booting, setBooting] = useState(true);
	const [bootProgress, setBootProgress] = useState(0);
	const [currentScreen, setCurrentScreen] = useState("home");
	const screenRef = useRef(null);
	const [displayedContent, setDisplayedContent] = useState(null);

	const loadScreen = (screenName) => {
		setCurrentScreen(screenName);
		setDisplayedContent(pages(loadScreen)[screenName]());
	};

	// Boot-up sequence
	useEffect(() => {
		const interval = setInterval(() => {
			setBootProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setTimeout(() => {
						setBooting(false);
						loadScreen("home"); // Load home screen after boot
					}, 500);
					return 100;
				}
				return prev + 10;
			});
		}, 50);
		return () => clearInterval(interval);
	}, []);

	// Scroll to bottom of terminal when new content is added
	useEffect(() => {
		if (screenRef.current) {
			screenRef.current.scrollTop = screenRef.current.scrollHeight;
		}
	}, [displayedContent]);

	return (
		<div className="h-screen w-screen bg-gray-950 text-gray-200 antialiased font-inter p-4 md:p-8 flex flex-col justify-center items-center">
			<style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                .terminal-container {
                    background-color: #1a1a2e;
                    box-shadow: 0 0 20px rgba(52, 211, 153, 0.5);
                    border: 2px solid #34d399;
                    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
                    transition: all 0.3s ease-in-out;
                    max-height: 90vh;
                }
                .terminal-header {
                    background-color: #2a2a4c;
                    border-bottom: 2px solid #34d399;
                }
                .cursor-blink {
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                    from, to { border-color: transparent }
                    50% { border-color: #34d399 }
                }
            `}</style>

			{booting ? (
				<div className="w-full max-w-xl text-center">
					<h2 className="text-xl md:text-3xl text-green-400 font-bold mb-4">
						SYSTEM BOOTSTRAP
					</h2>
					<div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
						<div
							className="h-full bg-green-400 transition-all duration-100 ease-linear"
							style={{ width: `${bootProgress}%` }}
						></div>
					</div>
					<p className="mt-2 text-gray-400 text-sm">{bootProgress}% Complete</p>
				</div>
			) : (
				<div className="w-full max-w-5xl h-[90vh] flex flex-col terminal-container rounded-lg overflow-hidden">
					{/* Header */}
					<div className="flex justify-between items-center p-4 terminal-header">
						<span className="text-green-400 text-lg font-bold">
							<ChevronsRight size={24} className="inline mr-2" />
							{currentScreen.toUpperCase()}
						</span>
						<div className="flex space-x-2">
							<button
								onClick={() => loadScreen("home")}
								className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors duration-200"
							>
								<Home size={16} />
							</button>
							<button
								onClick={() => loadScreen("about")}
								className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors duration-200"
							>
								<UserIcon size={16} />
							</button>
							<button
								onClick={() => loadScreen("skills")}
								className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors duration-200"
							>
								<Briefcase size={16} />
							</button>
							<button
								onClick={() => loadScreen("projects")}
								className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition-colors duration-200"
							>
								<Mail size={16} />
							</button>
							<button
								onClick={() => {
									setDisplayedContent(null);
								}}
								className="bg-red-600 hover:bg-red-500 text-white p-2 rounded transition-colors duration-200"
							>
								<Trash2 size={16} />
							</button>
						</div>
					</div>

					{/* Terminal Screen */}
					<div
						ref={screenRef}
						className="p-4 flex-grow overflow-y-auto text-gray-300"
					>
						{displayedContent}
						<span className="text-green-400 typing-cursor-blink">|</span>
					</div>

					{/* Footer / Input area - for demonstration purposes */}
					<div className="p-4 border-t-2 border-green-700 bg-gray-900 flex justify-between items-center">
						<p className="text-gray-500 text-sm">
							<ChevronRight size={16} className="inline mr-1" />
							Click a command above to proceed...
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
