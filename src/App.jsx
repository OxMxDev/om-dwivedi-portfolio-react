import { useState, useEffect } from "react";
import TodoApp from "./assets/TodoApp.png"
import PolyFarmacy from "./assets/PolyFarmacy.png"
import Zomo from "./assets/Zomo.png"
import pfp from "./assets/pfp.png"
import "remixicon/fonts/remixicon.css";
function App() {
	const [activeSection, setActiveSection] = useState("home");
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Smooth scroll function
	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setActiveSection(sectionId);
			setIsMenuOpen(false);
		}
	};

	// Skills data
	const skills = [
		{ name: "React", level: 90, icon: "ri-reactjs-line" },
		{ name: "Node.js", level: 85, icon: "ri-nodejs-line" },
		{ name: "TypeScript", level: 88, icon: "ri-code-s-slash-line" },
		{ name: "MongoDB", level: 82, icon: "ri-database-2-line" },
	];

	// Projects data
	const projects = [
		{
			id: 1,
			title: "TaskForge-MERN",
			description:
				"A full-stack task management app built with the MERN stack (MongoDB, Express, React, Node.js). Features include adding, updating, and deleting tasks with a clean and responsive UI.",
			tech: ["React", "Node.js", "MongoDB", "Express"],
			image: TodoApp,
			github: "https://github.com/OxMxDev/TaskForge-MERN",
			live: "https://task-forge-mern.vercel.app/",
		},
		{
			id: 2,
			title: "smart-polypharmacy-checker",
			description:
				"This is a full-stack web application designed to help caregivers and healthcare professionals manage and monitor medication for elderly patients. The application addresses the critical issue of polypharmacy by providing a smart, intuitive platform for identifying potential drug-drug and drug-disease interactions.",
			tech: ["React", "Express", "Node.js", "MongoDB"],
			image: PolyFarmacy,
			github: "https://github.com/OxMxDev/smart-polypharmacy-checker",
			live: "https://smart-polypharmacy-checker.vercel.app/",
		},
		{
			id: 3,
			title: "ZomoReels",
			description:
				"This is a full-stack web application that combines the best of food discovery and social media. Users can explore short, engaging food videos, like and save their favorite content, and visit food partner pages for more information. Content creators can upload videos with descriptions, allowing seamless sharing of culinary experiences.",
			tech: ["React", "Express", "Node.js", "ImageKit", "MongoDB"],
			image: Zomo,
			github: "https://github.com/OxMxDev/ZomoReels",
			
		},
	];

	return (
		<div className="min-h-screen w-full bg-black text-white">
			{/* Navigation */}
			<nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="text-xl font-bold text-white">Full-Stack</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex space-x-8">
							{["home", "about", "projects", "skills"].map((item) => (
								<button
									key={item}
									onClick={() => scrollToSection(item)}
									className={`capitalize transition-colors duration-200 hover:text-white ${
										activeSection === item ? "text-white" : "text-gray-400"
									}`}
								>
									{item}
								</button>
							))}
						</div>

						<button
							onClick={() => scrollToSection("contact")}
							className="hidden md:flex bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors duration-200 items-center gap-2"
						>
							<i className="ri-mail-line"></i>
							Contact Me
						</button>

						{/* Mobile menu button */}
						<button
							className="md:hidden text-gray-400"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<i
								className={`text-2xl ${
									isMenuOpen ? "ri-close-line" : "ri-menu-line"
								}`}
							></i>
						</button>
					</div>

					{/* Mobile Navigation */}
					{isMenuOpen && (
						<div className="md:hidden bg-black/95 border-t border-gray-800 py-4">
							{["home", "about", "projects", "skills", "contact"].map(
								(item) => (
									<button
										key={item}
										onClick={() => scrollToSection(item)}
										className="block w-full text-left px-4 py-2 text-gray-400 hover:text-white capitalize"
									>
										{item}
									</button>
								)
							)}
						</div>
					)}
				</div>
			</nav>

			{/* Hero Section */}
			<section
				id="home"
				className="min-h-screen flex items-center justify-center px-4"
			>
				<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-16">
					<div className="flex-1 text-center lg:text-left">
						<div className="mb-6">
							<h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
								Full-Stack Developer
							</h1>
							<h2 className="text-3xl lg:text-5xl font-bold text-gray-300">
								Building Complete Solutions
							</h2>
						</div>

						<p className="text-lg lg:text-xl text-gray-400 mb-6 max-w-2xl leading-relaxed">
							I craft end-to-end web applications from database design to
							pixel-perfect frontends. React, Node.js, databases, APIs—I handle
							the full stack so you don't have to.
						</p>

						<div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
							{[
								{ icon: "ri-code-line", text: "Frontend" },
								{ icon: "ri-server-line", text: "Backend" },
								{ icon: "ri-database-2-line", text: "Database" },
							].map((item) => (
								<div
									key={item.text}
									className="flex items-center gap-2 text-gray-400"
								>
									<i className={item.icon}></i>
									<span>{item.text}</span>
								</div>
							))}
						</div>

						<div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
							<button
								onClick={() => scrollToSection("contact")}
								className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors duration-200"
							>
								Let's Build Something Amazing
							</button>
							<button
								onClick={() => scrollToSection("projects")}
								className="border-2 border-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:border-gray-500 transition-colors duration-200"
							>
								View My Work
							</button>
						</div>

						<div className="flex gap-4 justify-center lg:justify-start">
							<a
								href="https://github.com/OxMxDev"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-white transition-colors duration-200"
							>
								<i className="ri-github-line text-3xl"></i>
							</a>
							<a
								href="https://www.linkedin.com/in/om-dwivedi129/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 hover:text-white transition-colors duration-200"
							>
								<i className="ri-linkedin-line text-3xl"></i>
							</a>
						</div>
					</div>

					<div className="flex-shrink-0">
						<div className="w-80 h-80 bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl overflow-hidden shadow-2xl">
							<div className="w-full h-full bg-gray-300 flex items-center justify-center">
								<img src={pfp} alt="" />
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-20 px-4 bg-gray-900/50">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl lg:text-5xl font-bold mb-8">About Me</h2>
					<div className="text-lg lg:text-xl text-gray-300 leading-relaxed space-y-6">
						<p>
							Hi! I’m Om Dwivedi, a passionate Full-Stack Developer currently
							pursuing my B.Tech in Computer Science from SRM Institute of
							Science and Technology, Kattankulathur, expecting to graduate in
							2027.
						</p>
						<p>
							I love building end-to-end web applications—from designing
							responsive frontends with React, developing robust backends with
							Node.js and Express, to working with databases and APIs. I enjoy
							turning ideas into real, functional products and continuously
							learning new technologies to stay at the forefront of web
							development.
						</p>
						<p>
							When I’m not coding, I enjoy exploring AI and deep learning
							concepts, solving coding challenges, and experimenting with small
							projects to sharpen my skills.
						</p>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section id="projects" className="py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold mb-4">
							Featured Projects
						</h2>
						<p className="text-xl text-gray-400 max-w-2xl mx-auto">
							Here are some of my recent projects that showcase my full-stack
							development skills
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
						{projects.map((project) => (
							<div
								key={project.id}
								className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl"
							>
								<div className="h-48 bg-gray-800 overflow-hidden">
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
									/>
								</div>

								<div className="p-6">
									<h3 className="text-xl font-bold mb-3">{project.title}</h3>
									<p className="text-gray-400 mb-4 leading-relaxed">
										{project.description}
									</p>

									<div className="flex flex-wrap gap-2 mb-6">
										{project.tech.map((tech) => (
											<span
												key={tech}
												className="bg-gray-800 text-sm px-3 py-1 rounded-full text-gray-300"
											>
												{tech}
											</span>
										))}
									</div>

									<div className="flex gap-4">
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
										>
											<i className="ri-github-line"></i>
											Code
										</a>
										{project.live && (
											<a
												href={project.live}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
											>
												<i className="ri-external-link-line"></i>
												Live Demo
											</a>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section id="skills" className="py-20 px-4 bg-gray-900/50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl lg:text-5xl font-bold mb-4">
							Skills & Technologies
						</h2>
						<p className="text-xl text-gray-400 max-w-2xl mx-auto">
							Here are the technologies I work with to build amazing
							applications
						</p>
					</div>

					<div className="flex flex-wrap justify-center items-center gap-16 lg:gap-20">
						{skills.map((skill, index) => (
							<div
								key={skill.name}
								className="group cursor-pointer"
								style={{
									animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
									animationDelay: `${index * 0.2}s`,
								}}
							>
								<div className="text-center">
									<div className="relative mb-4">
										<i
											className={`${skill.icon} text-8xl lg:text-9xl ${skill.color} 
                        group-hover:scale-110 transition-all duration-300 ease-out
                        drop-shadow-2xl group-hover:drop-shadow-none`}
										></i>
										<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>
									<h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
										{skill.name}
									</h3>
								</div>
							</div>
						))}
					</div>
				</div>

				<style jsx>{`
					@keyframes float {
						0%,
						100% {
							transform: translateY(0px);
						}
						50% {
							transform: translateY(-10px);
						}
					}
				`}</style>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-20 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl lg:text-5xl font-bold mb-8">
						Let's Work Together
					</h2>
					<p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
						Ready to bring your ideas to life? I'm always excited to work on new
						projects and challenges.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						{[
							{
								icon: "ri-mail-line",
								title: "Email",
								value: "omdwivedi234@example.com",
								href: "mailto:omdwivedi234@example.com",
							},
							{
								icon: "ri-phone-line",
								title: "Phone",
								value: "+91 8707564894",
								href: "tel:+15551234567",
							},
							{
								icon: "ri-map-pin-line",
								title: "Location",
								value: "Chennai,Tamil Nadu",
								href: "#",
							},
						].map((contact) => (
							<a
								key={contact.title}
								href={contact.href}
								className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition-colors duration-300 block"
							>
								<i
									className={`${contact.icon} text-3xl text-blue-400 mb-4`}
								></i>
								<h3 className="font-semibold mb-2">{contact.title}</h3>
								<p className="text-gray-400">{contact.value}</p>
							</a>
						))}
					</div>

					<div className="flex gap-4 justify-center">
						<a
							href="https://github.com/OxMxDev"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
						>
							<i className="ri-github-line text-xl"></i>
						</a>
						<a
							href="https://www.linkedin.com/in/om-dwivedi129/"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors duration-200"
						>
							<i className="ri-linkedin-line text-xl"></i>
						</a>
						<a
							href="mailto:hello@example.com"
							className="bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition-colors duration-200"
						>
							<i className="ri-mail-line text-xl"></i>
						</a>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-400">
				<p>
					&copy; 2025 Full-Stack Developer. Built with React & Tailwind CSS.
				</p>
			</footer>
		</div>
	);
}

export default App;
