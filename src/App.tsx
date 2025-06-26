import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  TwitterIcon,
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Server,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const homeRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  // Scroll-based section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    const sections = [homeRef, aboutRef, projectsRef, contactRef]
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const sectionRefs = {
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef
    }
    
    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs]
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const skills = [
    { name: 'Frontend', icon: Code, techs: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'ShadcnUI', 'Vite'] },
    { name: 'Backend', icon: Server, techs: ['Node.js', 'Python', 'NextJS', 'FastAPI'] },
    { name: 'Database', icon: Database, techs: ['Appwrite', 'Supabase', 'Firebase', "A little bit of PostgreSQL"] }
  ]

  const projects = [
    {
      title: 'My blog',
      description: 'Developer Blog made from the Brutal Theme by ElianCodes',
      tech: ['Astro', 'UnoCSS', 'Vercel'],
      live: 'https://www.pratham.zone.id'
    },
    {
      title: 'AI Research Agent',
      description: 'Not another AI wrapper',
      tech: ['Python', 'Streamlit', 'Ollama'],
      github: 'https://github.com/PrathamGhaywat/Sophos',
      live: 'https://prathamghaywat.github.io/Sophos/'
    },
    {
      title: 'AudioWiz',
      description: 'A Audio Library that simplifies usage of multiple audio and speech libraries',
      tech: ['Vue.js', 'Express', 'Socket.io', 'PostgreSQL'],
      github: 'https://github.com/PrathamGhaywat/AudioWiz-v.1',
      live: 'https://prathamghaywat.github.io/AudioWiz-v.1/'
    }, 
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="portfolio">
      {/* Animated Background */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Navigation */}
      <nav className="nav">
        <motion.div 
          className="nav-brand"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          &lt;Developer/&gt;
        </motion.div>
        
        <div className="nav-links desktop">
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <motion.button
              key={section}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => scrollToSection(section)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </div>

        <button 
          className="nav-toggle mobile"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <button
              key={section}
              className={`mobile-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </motion.div>
      )}

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <motion.section
          ref={homeRef}
          id="home"
          className="section hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="hero-content"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="hero-title"
              variants={fadeInUp}
            >
              Hi, I'm <span className="highlight">Pratham Ghaywat</span>
            </motion.h1>
            <motion.h2 
              className="hero-subtitle"
              variants={fadeInUp}
            >
              Full Stack Developer
            </motion.h2>
            <motion.p 
              className="hero-description"
              variants={fadeInUp}
            >
              A 14 year old developer who loves coding.
            </motion.p>
            <motion.div 
              className="hero-actions"
              variants={fadeInUp}
            >
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown />
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section
          ref={aboutRef}
          id="about"
          className="section about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="about-content"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp}>About Me</motion.h2>
            <motion.p variants={fadeInUp}>
             Don't want to say too much fluff, but I like to build stuff that actually do something and don't reinvent the  wheel.
            </motion.p>
            
            <motion.div className="skills-grid" variants={fadeInUp}>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  viewport={{ once: true }}
                >
                  <skill.icon className="skill-icon" />
                  <h3>{skill.name}</h3>
                  <div className="skill-techs">
                    {skill.techs.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          ref={projectsRef}
          id="projects"
          className="section projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="projects-content"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp}>Featured Projects</motion.h2>
            <motion.div className="projects-grid" variants={fadeInUp}>
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="project-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  viewport={{ once: true }}
                >
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-links">
                    <a href={project.github} className="project-link">
                      <Github size={20} />
                    </a>
                    <a href={project.live} className="project-link">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          ref={contactRef}
          id="contact"
          className="section contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="contact-content"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp}>Get In Touch</motion.h2>
            <motion.p variants={fadeInUp}>
              Want to talk to me? Look below:
            </motion.p>
            <motion.div className="contact-links" variants={fadeInUp}>
              <a href="mailto:ultimatehobbycoder@tutamail.com" className="contact-link">
                <Mail />
                <span>ultimatehobbycoder@tutamail.com</span>
              </a>
              <a href="https://github.com/PrathamGhaywat" className="contact-link">
                <Github />
                <span>GitHub</span>
              </a>
              <a href="https://x.com/CoderHobby" className="contact-link">
                <TwitterIcon />
                <span>Twitter/ X</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}

export default App
