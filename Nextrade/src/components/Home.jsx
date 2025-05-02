import { auth } from "../firebaseconfigurations/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../components/Home.css";
import backgroundVideo from '../assets/videoplayback.mp4';
import aiImage from '../assets/ai.avif';

export default function Home() {
    const navigate = useNavigate();
    const [userPhoto, setUserPhoto] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const infoRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/");
        } else {
            setUserPhoto(auth.currentUser.photoURL || "default-photo-url");
            setUserName(auth.currentUser.displayName);
            setUserEmail(auth.currentUser.email);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (infoRef.current) {
            observer.observe(infoRef.current);
        }

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            if (infoRef.current) {
                observer.unobserve(infoRef.current);
            }
            window.removeEventListener("scroll", handleScroll);
        };
    }, [navigate]);

    async function handleLogout() {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <h2>NexTrade AI</h2>
                </div>

                <div className={`nav-center ${menuOpen ? "active" : ""}`}>
                    <a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</a>
                    <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
                </div>

                <div className="nav-right">
                    <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
                        <span className={`menu-line ${menuOpen ? "open" : ""}`}></span>
                    </button>

                    {userPhoto && (
                        <img
                            src={userPhoto}
                            alt="Profile"
                            className="profile-pic"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                    )}

                    {dropdownOpen && (
                        <div className="profile-dropdown">
                            <img src={userPhoto} alt="Profile" className="dropdown-pic" />
                            <p className="dropdown-name">{userName}</p>
                            <p className="dropdown-email">{userEmail}</p>
                            <button onClick={handleLogout} className="dropdown-logout">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <section className="hero-section" id="home">
                <div className="hero-video-container">
                    <video className="hero-video" autoPlay loop muted>
                        <source src={backgroundVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="hero-text-container">
                    <h1 className="hero-title">AI-Powered Trading</h1>
                    <p className="hero-subtitle">Real-time market analysis</p>
                </div>
            </section>

            <section className="info-section" ref={infoRef}>
                <div className="info-container">
                    <div className="info-content">
                        <h2>The AI Advantage</h2>
                        <p>
                            <strong>Our trading platform</strong> leverages advanced <strong>machine learning algorithms</strong> to deliver
                            smarter portfolio optimization, real-time market predictions, and adaptive risk
                            management — all working simultaneously to maximize your returns.
                        </p>
                    </div>
                    <div className="info-image">
                        <img src={aiImage} alt="AI Illustration" className="info-img" />
                    </div>
                </div>
            </section>

            <section className="fea-section">
                <div className="fea-content">
                    <div className="fea-text">
                        <h2 className="fea-title">Stay ahead of the markets — intelligently</h2>
                        <p className="fea-description">
                            In today's fast-moving financial world, reacting late can cost you opportunities. That's why we built the AI-Powered Smart Portfolio Optimizer: a tool that reads financial headlines, gauges real-time sentiment, and reshapes investment decisions instantly — all without you lifting a finger.
                        </p>
                    </div>
                </div>
            </section>

            <section className="services-section" id="services">
                <div className="services-content">
                    <h2 className="services-title">Our AI-Powered Services</h2>
                    <p className="services-subtitle">Harness cutting-edge artificial intelligence to elevate your investment strategy</p>
                    <div className="services-container">
                        <div className="service-card" onClick={() => document.getElementById('portfolio-optimizer-demo')?.scrollIntoView({ behavior: 'smooth' })}>
                            <div className="service-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5zm-2.5 6.5c-.3 0-.5.2-.5.5v5c0 .3.2.5.5.5s.5-.2.5-.5v-5c0-.3-.2-.5-.5-.5zm-4.3-3.7c-.2-.2-.5-.3-.7-.3s-.5.1-.7.3l-3.8 3.8-1.4-1.4c-.2-.2-.5-.3-.7-.3s-.5.1-.7.3c-.4.4-.4 1 0 1.4l2.1 2.1c.2.2.5.3.7.3s.5-.1.7-.3l4.5-4.5c.4-.4.4-1 0-1.4z"/>
                                </svg>
                            </div>
                            <h3>Portfolio Optimizer</h3>
                            <p>Optimize your portfolio with AI-driven risk-adjusted strategies that maximize returns while minimizing exposure.</p>
                            <button className="service-cta">Explore Feature</button>
                        </div>

                        <div className="service-card" onClick={() => document.getElementById('market-analyzer-demo')?.scrollIntoView({ behavior: 'smooth' })}>
                            <div className="service-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
                                </svg>
                            </div>
                            <h3>Market Analyzer</h3>
                            <p>Get real-time market insights, predictive analytics, and sentiment analysis powered by our proprietary AI models.</p>
                            <button className="service-cta">Explore Feature</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-us-section" id="about">
                <div className="about-us-container">
                    <h2 className="about-us-title">About Us</h2>
                    <p className="about-us-description">
                        We aim to level the playing field for every investor — bringing Wall Street-style AI tools to individuals and small firms. With real-time sentiment sensing and risk optimization, you can react with the market, not after it. Because in modern finance, speed and intelligence aren't just advantages — they're necessities.
                    </p>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <h3>NexTrade AI</h3>
                        <p className="footer-tagline">Empowering investors with cutting-edge AI trading solutions.</p>
                    </div>
                    <div className="footer-links-container">
                        <div className="footer-links">
                            <h4 className="footer-heading">Company</h4>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-links">
                            <h4 className="footer-heading">Services</h4>
                            <ul>
                                <li><a href="#ai-trading">AI Trading</a></li>
                                <li><a href="#analytics">Market Analytics</a></li>
                                <li><a href="#portfolio">Portfolio Tools</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-newsletter">
                        <h4 className="footer-heading">Stay Updated</h4>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your email address" />
                            <button type="submit">Connect</button>
                        </form>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-container">
                        <p>&copy; {new Date().getFullYear()} NexTrade AI. All rights reserved.</p>
                        <div className="footer-legal-links">
                            <a href="#terms">Terms of Service</a>
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#disclosures">Disclosures</a>
                            <a href="#cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>

            {showScrollTop && (
                <button
                    className="scroll-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    title="Back to top"
                >
                    ↑
                </button>
            )}

        </>
    );
}
