import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import './App.css'

function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('sash_userName') || '');
  const [entered, setEntered] = useState(() => localStorage.getItem('sash_entered') === 'true');
  const [nameInput, setNameInput] = useState('');
  const [finaleUnlocked, setFinaleUnlocked] = useState(false);
  const [finaleInput, setFinaleInput] = useState('');
  const audioRef = useRef(null);
 
  const handleEnter = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      const name = nameInput.trim();
      setUserName(name);
      setEntered(true);
      localStorage.setItem('sash_userName', name);
      localStorage.setItem('sash_entered', 'true');
    }
  }

  const handleFinaleUnlock = (e) => {
    e.preventDefault();
    setFinaleUnlocked(true);
    triggerFinale();
  }

  const triggerFinale = () => {
    // Play crackers sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Crackers / Confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }

  // Floating background particles
  const particles = Array.from({ length: 20 });

  if (!entered) {
    return (
      <div className="gateway">
        {/* Animated Particles Background */}
        <div className="particles-container">
          {particles.map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * -500],
                x: [null, Math.random() * 200 - 100],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="gateway-card"
        >
          <div className="logo-container">
            <img src="/images/logo.png" alt="Sash.Ai Logo" className="brand-logo-img" />
            {/* <h1>Sash.Ai</h1> */}
          </div>
          <h2>Initialize Memory Vault Protocol</h2>
          <form onSubmit={handleEnter}>
            <input 
              type="text" 
              placeholder="Enter your security clearance name" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              autoFocus
            />
            <button type="submit">Unlock</button>
          </form>
        </motion.div>
      </div>
    )
  }

  const galleryImages = [
    '/images/1.jpeg', '/images/2.jpeg', '/images/3.jpeg', '/images/4.jpeg', '/images/5.jpeg', 
    '/images/6.jpeg', '/images/7.jpeg', '/images/8.jpeg', '/images/9.jpeg', '/images/10.jpeg', 
    '/images/12.jpeg', '/images/13.jpeg'
  ]

  const offsiteImages = [
    '/images/offsite 1.jpeg', '/images/offsite 2.jpeg', '/images/offsite 3.jpeg', 
    '/images/offsite 4.jpeg', '/images/offsite 5.jpeg', '/images/offsite 6.jpeg', 
    '/images/offsite 7.jpeg', '/images/offsite 8.jpeg'
  ]

  return (
    <div className="main-app">
      <audio ref={audioRef} src="/cracker.mp3" preload="auto"></audio>
      
      {/* Background Animated Waves */}
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Main Page Particles */}
      <div className="particles-container global-particles">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -800],
              x: [null, Math.random() * 400 - 200],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Sash.Ai Logo" className="nav-logo-img" />
          Sash.Ai
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section hero">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="hero-content"
        >
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Welcome, {userName}. Let's look back at
          </motion.h3>
          <h1 className="glitch" data-text="1 Year of Sash.Ai">1 Year of Sash.Ai</h1>
          <p>Building the Future of Voice Calling & Enterprise Products</p>
        </motion.div>
      </section>

      {/* Leadership Section */}
      <section className="section leadership">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="leader-card"
        >
          <div className="leader-image-wrapper">
            <img src="/images/CEO and Cofounder.jpeg" alt="CEO and Cofounder" />
            <div className="image-overlay"></div>
          </div>
          <div className="leader-text">
            <h2>The Visionaries</h2>
            <p>Under their guidance, we've pushed boundaries, solved impossible problems, and forged a legacy. Here is to our CEO and Cofounder.</p>
          </div>
        </motion.div>
      </section>

      {/* The Journey Section */}
      <section className="section journey">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Gallery of the Sash
        </motion.h2>
        <div className="masonry-grid">
          {galleryImages.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx % 4 * 0.1 }}
              viewport={{ once: true }}
              className="grid-item"
            >
              <img src={src} alt="Memory" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Offsite Section */}
      <section className="section offsite">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-title"
        >
          The Offsite
        </motion.h2>
        <div className="horizontal-scroll">
          {offsiteImages.map((src, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-scroll-item"
            >
              <img src={src} alt="Offsite" loading="lazy" />
            </motion.div>
          ))}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="h-scroll-item video-item"
          >
            <video src="/images/offsitev 1.mp4" autoPlay loop muted playsInline></video>
          </motion.div>
        </div>
      </section>

      {/* Grand Finale */}
      <section className="section finale">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          viewport={{ once: true, margin: "-200px" }}
          className="finale-content"
        >
          {!finaleUnlocked ? (
            <div className="finale-gate">
              <h2>One Last Thing...</h2>
              <p>Enter a wish for our next year to reveal the surprise!</p>
              <form onSubmit={handleFinaleUnlock} className="finale-form">
                <input 
                  type="text" 
                  placeholder="e.g. More Enterprise Projects!" 
                  value={finaleInput}
                  onChange={(e) => setFinaleInput(e.target.value)}
                  required
                />
                <button type="submit" className="party-btn">Celebrate 🚀</button>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <h1>Happy 1st Year Anniversary!</h1>
              <h2>Sash.Ai</h2>
              <p>Thank you to everyone who made this year extraordinary.</p>
              {finaleInput && <div className="wish-text">"{finaleInput}"</div>}
              <button className="party-btn" onClick={triggerFinale}>Party Again! 🎆</button>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  )
}

export default App
