
import React, { useEffect, useState } from "react";
import "./style.css";
import Headphones3D from "./Headphones3D";
import HeadphonesBox3D from "./HeadphonesBox3d";

import bot from "./assets/bot.png";
import pro from "./assets/pro.png";
import air from "./assets/air.png";
import introVideo from "./assets/intro.mp4";

const products = [
  {
    name: "ORBIT ONE",
    type: "Wireless Headphones",
    price: "$249",
    image: bot,
    description: "Pure sound. Zero distractions.",
    feature: "Adaptive Noise Cancellation",
    battery: "40 Hours Battery",
    details:
      "Experience immersive wireless audio with adaptive noise cancellation. Every detail feels clear, balanced and beautifully defined.",
  },
  {
    name: "ORBIT PRO",
    type: "Studio Headphones",
    price: "$329",
    image: pro,
    description: "Precision in every frequency.",
    feature: "Studio-grade Audio",
    battery: "50 Hours Battery",
    details:
      "Discover studio-inspired sound with rich lows, precise mids and detailed highs. Designed for focused listening and creative sessions.",
  },
  {
    name: "ORBIT AIR",
    type: "Travel Headphones",
    price: "$199",
    image: air,
    description: "Freedom without boundaries.",
    feature: "Lightweight Design",
    battery: "35 Hours Battery",
    details:
      "Move freely with a lightweight design, comfortable fit and dependable wireless performance for everyday journeys.",
  },
];

const features = [
  {
    number: "01",
    category: "SOUND",
    icon: "〰",
    title: "Spatial Precision",
    description:
      "Rich, detailed audio creates an immersive listening experience. Balanced frequencies and carefully tuned acoustics bring every detail closer.",
    footer: "ENGINEERED FOR IMMERSION",
  },
  {
    number: "02",
    category: "COMFORT",
    icon: "◉",
    title: "All-day Design",
    description:
      "Soft-touch materials, cushioned earcups and thoughtful ergonomics deliver a comfortable fit for long listening sessions.",
    footer: "MADE TO MOVE WITH YOU",
  },
  {
    number: "03",
    category: "CONTROL",
    icon: "⌁",
    title: "Effortless Control",
    description:
      "Intuitive controls make adjusting your listening experience simple. Switch between your favourite moments without unnecessary distractions.",
    footer: "YOUR SOUND. YOUR RULES.",
  },
];

function GlassBox() {
  return (
    <div className="glass-box-scene">
      <svg
        className="glass-box-svg"
        viewBox="0 0 440 400"
        role="img"
        aria-label="Transparent ORBIT headphone display box"
      >
        <defs>
          <linearGradient id="glassFace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".22" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity=".025" />
            <stop offset="100%" stopColor="#a9c5ff" stopOpacity=".12" />
          </linearGradient>

          <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset="100%" stopColor="#9ca9bb" stopOpacity=".48" />
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#glassEdge)" strokeWidth="4">
          <path d="M140 95 V63 Q140 43 160 43 H190 Q210 43 210 63 V95" />
          <path d="M230 95 V63 Q230 43 250 43 H280 Q300 43 300 63 V95" />
        </g>

        <g stroke="url(#glassEdge)" strokeWidth="2">
          <path
            d="M65 125 L220 65 L375 125 L220 190 Z"
            fill="url(#glassFace)"
          />
          <path
            d="M65 125 L65 295 L220 365 L220 190 Z"
            fill="url(#glassFace)"
          />
          <path
            d="M220 190 L375 125 L375 295 L220 365 Z"
            fill="url(#glassFace)"
          />
          <path d="M65 295 L220 230 L375 295" fill="none" opacity=".55" />
        </g>

        <path
          d="M83 145 V280 L204 337"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          opacity=".65"
        />
        <path
          d="M357 145 V280 L236 337"
          fill="none"
          stroke="#a9c5ff"
          strokeWidth="2"
          opacity=".55"
        />
        <path
          d="M95 125 L220 78 L345 125"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity=".7"
        />
      </svg>

      <div className="box-headphones3d">
        <HeadphonesBox3D />
      </div>

      <div className="box-orbit orbit-path-one">
        <span />
      </div>

      <div className="box-orbit orbit-path-two">
        <span />
      </div>

      <div className="box-floor-glow" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");
  const [flippedProducts, setFlippedProducts] = useState([]);
  const [flippedFeatures, setFlippedFeatures] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notice) return;

    const timer = setTimeout(() => setNotice(""), 2800);
    return () => clearTimeout(timer);
  }, [notice]);

  const product = products[activeProduct];

  const changeProduct = (direction) => {
    setActiveProduct(
      (current) => (current + direction + products.length) % products.length
    );
  };

  const toggleProductFlip = (index) => {
    setFlippedProducts((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
    setActiveProduct(index);
  };

  const toggleFeatureFlip = (index) => {
    setFlippedFeatures((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  const addToCart = (item) => {
    setCartCount((count) => count + 1);
    setNotice(`${item.name} added to your bag.`);
  };

  const handleNav = () => setMenuOpen(false);

  if (loading) {
    return (
      <div className="loading-screen">
        <video
          className="loading-video"
          src={introVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
        />

        <div className="loading-video-overlay" />

        <div className="loader-content">
          <div className="loader-logo">
            O<span>.</span>
          </div>
          <p>ENGINEERING THE EXTRAORDINARY</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <a className="brand" href="#home" onClick={handleNav}>
          ORBIT<span>.</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={handleNav}>Home</a>
          <a href="#collection" onClick={handleNav}>Collection</a>
          <a href="#technology" onClick={handleNav}>Technology</a>
          <a href="#about" onClick={handleNav}>Our Story</a>
        </nav>

        <button
          className="cart-button"
          onClick={() =>
            setNotice(
              cartCount
                ? `Your bag contains ${cartCount} item(s).`
                : "Your bag is empty. Explore the collection!"
            )
          }
        >
          BAG <span>{cartCount}</span>
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="live-dot" /> SOUND, REIMAGINED
            </p>

            <h1>
              Hear beyond
              <br />
              <span>the ordinary.</span>
            </h1>

            <p className="hero-description">
              Meet a new dimension of sound. Thoughtfully engineered
              headphones that turn every moment into an experience.
            </p>

            <div className="hero-actions">
              <a href="#collection" className="primary-button">
                Explore collection <span>↗</span>
              </a>
              <a href="#technology" className="text-button">
                Discover our technology <span>→</span>
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>40<span>h</span></strong>
                <small>Battery life</small>
              </div>
              <div>
                <strong>360°</strong>
                <small>Spatial audio</small>
              </div>
              <div>
                <strong>01<span>ms</span></strong>
                <small>Fast response</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="visual-label label-top">OBJECT 001 / ORBIT</div>

            <div className="hero-product">
              <Headphones3D />
            </div>

            <div className="floating-tag tag-top">
              <span className="tag-dot" />
              Adaptive noise cancelling
            </div>

            <div className="floating-tag tag-bottom">
              <span>01</span> Designed for immersion
            </div>

            <div className="visual-index">01 — 03</div>
          </div>

          <a className="scroll-cue" href="#collection">
            <span /> SCROLL TO EXPLORE
          </a>
        </section>

        {/* MOVING TEXT */}
        <section className="marquee" aria-label="ORBIT features">
          <div className="marquee-track">
            {[0, 1, 2, 3].map((item) => (
              <span key={item}>
                PURE SOUND <i>✳</i> PRECISE ENGINEERING <i>✳</i>
                BUILT FOR YOU <i>✳</i>
              </span>
            ))}
          </div>
        </section>

        {/* COLLECTION */}
        <section className="collection section" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE ORBIT COLLECTION</p>
              <h2>Find your <span>frequency.</span></h2>
            </div>

            <p className="section-intro">
              Three distinct expressions. One uncompromising approach to sound.
            </p>
          </div>

          <div className="product-showcase">
            <div className={`showcase-visual product-${activeProduct}`}>
              <span className="showcase-number">
                0{activeProduct + 1} / 03
              </span>

              <img
                src={product.image}
                alt={product.name}
                className="collection-product-image"
              />

              <span className="showcase-caption">ORBIT AUDIO SYSTEM</span>
            </div>

            <div className="showcase-info">
              <p className="eyebrow">SIGNATURE SERIES</p>
              <h3>{product.name}</h3>
              <p className="product-type">{product.type}</p>
              <p className="product-description">{product.description}</p>

              <div className="product-price">{product.price}</div>

              <button
                className="primary-button add-button"
                onClick={() => addToCart(product)}
              >
                Add to bag <span>↗</span>
              </button>

              <div className="carousel-controls">
                <button
                  onClick={() => changeProduct(-1)}
                  aria-label="Previous product"
                >
                  ←
                </button>

                <div className="carousel-dots">
                  {products.map((item, index) => (
                    <button
                      key={item.name}
                      className={index === activeProduct ? "active" : ""}
                      onClick={() => setActiveProduct(index)}
                      aria-label={`View ${item.name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => changeProduct(1)}
                  aria-label="Next product"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCT FLIP CARDS */}
          <div className="product-cards">
            {products.map((item, index) => (
              <button
                type="button"
                className={`product-card ${
                  index === activeProduct ? "selected" : ""
                } ${flippedProducts.includes(index) ? "is-flipped" : ""}`}
                key={item.name}
                onClick={() => toggleProductFlip(index)}
                aria-label={`Flip ${item.name} card`}
                aria-pressed={flippedProducts.includes(index)}
              >
                <span className="flip-card-inner">
                  <span className="flip-card-front">
                    <span className="flip-number">0{index + 1} / ORBIT</span>
                    <span className="flip-title">{item.name}</span>
                    <span className="flip-type">{item.type}</span>
                    <span className="flip-description">
                      {item.description}
                    </span>
                    <span className="flip-feature">{item.feature}</span>
                    <span className="flip-price">{item.price}</span>
                    <span className="flip-hint">TAP TO DISCOVER ↗</span>
                  </span>

                  <span className="flip-card-back">
                    <img src={item.image} alt="" />
                    <span className="flip-back-overlay" />
                    <span className="flip-back-content">
                      <span className="flip-number">ORBIT / 0{index + 1}</span>
                      <span className="flip-back-name">{item.name}</span>
                      <span className="flip-back-description">
                        {item.details}
                      </span>
                      <span className="flip-back-battery">{item.battery}</span>
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* NEW: CRAFTSMANSHIP — AFTER COLLECTION */}
        <section className="craftsmanship section-padding" id="craftsmanship">
          <div className="section-heading">
            <span className="eyebrow">ENGINEERED WITH INTENTION</span>
            <h2>
              Every detail.
              <br />
              <span>Every frequency.</span>
            </h2>
            <p>
              Designed around the details you feel, and the sound you never
              forget.
            </p>
          </div>

          <div className="craft-grid">
            <article className="craft-card">
              <span className="craft-number">01 / MATERIALS</span>
              <div className="craft-symbol">◈</div>
              <h3>Refined by Design</h3>
              <p>
                Clean silhouettes, considered finishes, and details made to
                feel exceptional.
              </p>
            </article>

            <article className="craft-card">
              <span className="craft-number">02 / COMFORT</span>
              <div className="craft-symbol">◎</div>
              <h3>Made for More</h3>
              <p>
                A considered fit for long listening sessions, from quiet
                mornings to late nights.
              </p>
            </article>

            <article className="craft-card">
              <span className="craft-number">03 / SOUND</span>
              <div className="craft-symbol">〰</div>
              <h3>Feel Every Layer</h3>
              <p>
                Discover the detail, depth, and atmosphere behind every track.
              </p>
            </article>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section className="technology section" id="technology">
          <div className="tech-copy">
            <p className="eyebrow">
              <span className="live-dot" /> ENGINEERED BEYOND THE ORDINARY
            </p>

            <h2>
              Sound has a universe.
              <br />
              <span>We bring it closer.</span>
            </h2>

            <p className="tech-description">
              Every ORBIT headphone is built around the science of sound.
              Precision-tuned acoustic drivers reveal the finest details,
              while adaptive noise cancellation helps silence the world
              around you. Spatial audio creates a deeper sense of dimension,
              and intelligent sound control keeps every listening moment
              effortless.
            </p>

            <div className="tech-highlights">
              <div className="tech-highlight">
                <span className="tech-highlight-number">01</span>
                <div>
                  <h4>Precision Audio</h4>
                  <p>Every frequency, carefully tuned.</p>
                </div>
              </div>

              <div className="tech-highlight">
                <span className="tech-highlight-number">02</span>
                <div>
                  <h4>Adaptive Silence</h4>
                  <p>Less outside noise. More of your world.</p>
                </div>
              </div>

              <div className="tech-highlight">
                <span className="tech-highlight-number">03</span>
                <div>
                  <h4>Spatial Immersion</h4>
                  <p>Sound that feels beyond the ordinary.</p>
                </div>
              </div>
            </div>

            <a href="#about" className="text-button">
              Discover our philosophy <span>→</span>
            </a>
          </div>

          {/* SOLAR SYSTEM */}
          <div className="tech-orb solar-system">
            <div className="solar-glow" />

            <div className="planet-orbit orbit-1">
              <span className="planet planet-1" />
            </div>
            <div className="planet-orbit orbit-2">
              <span className="planet planet-2" />
            </div>
            <div className="planet-orbit orbit-3">
              <span className="planet planet-3" />
            </div>
            <div className="planet-orbit orbit-4">
              <span className="planet planet-4" />
            </div>
            <div className="planet-orbit orbit-5">
              <span className="planet planet-5" />
            </div>
            <div className="planet-orbit orbit-6">
              <span className="planet planet-6" />
            </div>
            <div className="planet-orbit orbit-7">
              <span className="planet planet-7" />
            </div>
            <div className="planet-orbit orbit-8">
              <span className="planet planet-8" />
            </div>
            <div className="planet-orbit orbit-9">
              <span className="planet planet-9" />
            </div>

            <div className="solar-sun">
              <span>O</span>
            </div>

            <div className="solar-caption">
              <span className="solar-caption-dot" />
              ORBITAL ACOUSTIC SYSTEM
            </div>
          </div>

          {/* TECHNOLOGY FLIP CARDS */}
          <div className="feature-grid">
            {features.map((feature, index) => (
              <button
                type="button"
                key={feature.number}
                className={`feature-card ${
                  flippedFeatures.includes(index) ? "is-flipped" : ""
                }`}
                onClick={() => toggleFeatureFlip(index)}
                aria-label={`Flip ${feature.category} card`}
                aria-pressed={flippedFeatures.includes(index)}
              >
                <span className="feature-card-inner">
                  <span className="feature-card-front">
                    <span className="feature-number">
                      {feature.number} / {feature.category}
                    </span>
                    <span className="feature-icon">{feature.icon}</span>
                    <span className="feature-title">{feature.title}</span>
                    <span className="feature-summary">
                      {index === 0
                        ? "Sound that brings every detail closer."
                        : index === 1
                        ? "Comfort designed around your day."
                        : "Simple, intuitive listening controls."}
                    </span>
                    <span className="feature-bottom">TAP TO EXPLORE ↗</span>
                  </span>

                  <span className="feature-card-back">
                    <span className="feature-number">
                      ORBIT / {feature.category}
                    </span>
                    <span className="feature-back-icon">{feature.icon}</span>
                    <span className="feature-title">{feature.title}</span>
                    <span className="feature-description">
                      {feature.description}
                    </span>
                    <span className="feature-bottom">{feature.footer}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* NEW: CHOOSE YOUR ORBIT — AFTER TECHNOLOGY */}
        <section className="orbit-compare section-padding" id="compare">
          <div className="section-heading">
            <span className="eyebrow">FIND YOUR FREQUENCY</span>
            <h2>
              Three ways to <span>feel sound.</span>
            </h2>
            <p>Different worlds. One unmistakable ORBIT identity.</p>
          </div>

          <div className="compare-grid">
            {products.map((item, index) => (
              <article
                className={`compare-card ${
                  index === 1 ? "compare-featured" : ""
                }`}
                key={item.name}
              >
                {index === 1 && (
                  <span className="compare-tag">STUDIO SERIES</span>
                )}

                <span className="compare-index">0{index + 1}</span>
                <h3>{item.name}</h3>
                <p className="compare-type">{item.type}</p>

                <div className="compare-line" />

                <p>{item.description}</p>
                <strong>{item.price}</strong>

                <button
                  type="button"
                  className="compare-select"
                  onClick={() => {
                    setActiveProduct(index);
                    document
                      .getElementById("collection")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  EXPLORE MODEL ↗
                </button>
              </article>
            ))}
          </div>

          <p className="compare-note">
            Explore each model to discover the ORBIT that fits your world.
          </p>
        </section>

        {/* OUR STORY / GLASS BOX */}
        <section className="story section" id="about">
          <div className="story-visual">
            <GlassBox />
            <span className="story-caption">LESS NOISE. MORE MEANING.</span>
          </div>

          <div className="story-copy">
            <p className="eyebrow">OUR PHILOSOPHY</p>
            <h2>
              Made for the moments <span>that matter.</span>
            </h2>
            <p>
              ORBIT began with a simple idea: technology should make everyday
              life feel extraordinary. We focus on considered design,
              purposeful innovation and sound that brings people closer to
              what they love.
            </p>
            <a className="primary-button" href="#home">
              Back to the beginning <span>↑</span>
            </a>
          </div>
        </section>

        {/* NEW: BRAND MANIFESTO — REPLACES OLD CLOSING BANNER */}
        <section className="brand-manifesto">
          <div className="manifesto-orbit" />

          <span className="eyebrow">THIS IS YOUR UNIVERSE</span>

          <h2>
            The world never stops.
            <br />
            <span>Your sound takes you elsewhere.</span>
          </h2>

          <p>
            Find your space. Follow your frequency. Make every moment yours.
          </p>

          <a className="manifesto-link" href="#collection">
            FIND YOUR ORBIT <span>↗</span>
          </a>
        </section>
      </main>

      {/* SHORT PREMIUM FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand">ORBIT</div>
            <p>Designed for the way you listen.</p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#collection">Collection</a>
            <a href="#technology">Technology</a>
            <a href="#about">Our Story</a>
          </nav>

          <a className="footer-top-link" href="#home">
            BACK TO TOP ↑
          </a>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} ORBIT STUDIO. ALL RIGHTS RESERVED.
          </span>
          <div>
            <span>BUILT AROUND SOUND.</span>
          </div>
        </div>
      </footer>

      {/* NOTIFICATION */}
      {notice && (
        <div className="notice" role="status">
          <span>✓</span> {notice}
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
