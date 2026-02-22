import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import SquishyButton from "./SquishyButton";

const CONTACTS = [
  {
    icon: "ri-mail-line",
    title: "Email",
    value: "omdwivedi234@example.com",
    href: "mailto:omdwivedi234@example.com",
    color: "var(--accent)",
  },
  {
    icon: "ri-phone-line",
    title: "Phone",
    value: "+91 8707564894",
    href: "tel:+918707564894",
    color: "var(--accent)",
  },
  {
    icon: "ri-map-pin-line",
    title: "Location",
    value: "Chennai, Tamil Nadu",
    href: "#contact",
    color: "var(--accent)",
  },
];

const SOCIALS = [
  { href: "https://github.com/OxMxDev", icon: "ri-github-fill", label: "GitHub" },
  { href: "https://www.linkedin.com/in/om-dwivedi129/", icon: "ri-linkedin-fill", label: "LinkedIn" },
  { href: "mailto:omdwivedi234@example.com", icon: "ri-mail-fill", label: "Email" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Get a free access key at https://web3forms.com (just enter your email)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio Contact Form",
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClasses = (field) =>
    `w-full bg-white/[0.03] border ${
      errors[field]
        ? "border-red-500/60"
        : "border-[var(--border-glass)] focus:border-[var(--accent)]"
    } rounded-xl px-4 py-3.5 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors duration-200 text-sm`;

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden" aria-label="Contact information">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] opacity-10"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative max-w-6xl mx-auto"
        variants={shouldReduceMotion ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Section header */}
        <motion.div className="text-center mb-14" variants={shouldReduceMotion ? {} : itemVariants}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Let's Work{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Fill out the form
            and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Two-column layout: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ─── Contact Form (3 cols) ─── */}
          <motion.div className="lg:col-span-3" variants={shouldReduceMotion ? {} : itemVariants}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass rounded-2xl p-6 sm:p-8 space-y-5"
            >
              {/* Name & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Name <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    className={inputClasses("name")}
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-red-400 mt-1.5" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className={inputClasses("email")}
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-400 mt-1.5" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  autoComplete="off"
                  className={inputClasses("subject")}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Message <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or just say hi..."
                  required
                  className={`${inputClasses("message")} resize-y min-h-[120px]`}
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-400 mt-1.5" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-1">
                <SquishyButton
                  type="submit"
                  variant="filled"
                  className="w-full sm:w-auto"
                  ariaLabel="Send message"
                >
                  {status === "sending" ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <i className="ri-check-line" aria-hidden="true"></i>
                      Sent Successfully!
                    </>
                  ) : status === "error" ? (
                    <>
                      <i className="ri-error-warning-line" aria-hidden="true"></i>
                      Failed — Try Again
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-fill" aria-hidden="true"></i>
                      Send Message
                    </>
                  )}
                </SquishyButton>
              </div>

              {/* Success / Error toast */}
              {status === "success" && (
                <motion.div
                  className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                >
                  <i className="ri-checkbox-circle-line text-lg" aria-hidden="true"></i>
                  Thanks for reaching out! I'll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="flex items-center gap-2 text-sm text-[var(--accent-rose)] bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  <i className="ri-error-warning-line text-lg" aria-hidden="true"></i>
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* ─── Right sidebar: Contact info + Socials (2 cols) ─── */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={shouldReduceMotion ? {} : containerVariants}
          >
            {CONTACTS.map((contact) => (
              <motion.a
                key={contact.title}
                href={contact.href}
                className="glass rounded-2xl p-5 hover:border-white/15 transition-all duration-300 flex items-center gap-4 group"
                variants={shouldReduceMotion ? {} : itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { x: 4, transition: { type: "spring", stiffness: 300 } }
                }
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${contact.color}15` }}
                >
                  <i
                    className={`${contact.icon} text-2xl`}
                    style={{ color: contact.color }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{contact.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{contact.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Socials card */}
            <motion.div
              className="glass rounded-2xl p-5"
              variants={shouldReduceMotion ? {} : itemVariants}
            >
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">
                Follow Me
              </h3>
              <div className="flex gap-3">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-colors duration-200"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -3 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-xl`} aria-hidden="true"></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
