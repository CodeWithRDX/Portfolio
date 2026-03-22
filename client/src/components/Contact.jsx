import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [honeypot, setHoneypot] = useState(''); // hidden bot trap
    const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading' | null
    const [statusMsg, setStatusMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Honeypot check — if a bot filled this hidden field, silently fake success
        if (honeypot) {
            setTimeout(() => {
                setStatus('success');
                setStatusMsg('Message sent successfully! I\'ll get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => { setStatus(null); setStatusMsg(''); }, 5000);
            }, 1200);
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    website: '',            // honeypot value (always empty for real users)
                    _t: Date.now()          // submission timestamp nonce
                })
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setStatusMsg('Message sent successfully! I\'ll get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
                setStatusMsg(data.message || 'Something went wrong.');
            }
        } catch (err) {
            setStatus('error');
            setStatusMsg('Failed to connect to server. Please try again later.');
        }

        setTimeout(() => { setStatus(null); setStatusMsg(''); }, 5000);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="section-title"><span>Get In Touch</span></h2>

                <div className="contact-container">
                    <div className="contact-info animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="contact-subtitle">Let's talk about everything!</h3>
                        <p className="contact-description">
                            Don't like forms? Send me an email. 👋
                        </p>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <div className="contact-icon-wrapper">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:codewithrdx@gmail.com">codewithrdx@gmail.com</a>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="contact-icon-wrapper">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4>Location</h4>
                                    <p>India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper glass-panel animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" placeholder="Project Inquiry" value={formData.subject} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows="3" placeholder="How can I help you?" value={formData.message} onChange={handleChange} required></textarea>
                            </div>

                            {/* Honeypot field — hidden from humans, visible to bots */}
                            <div className="honeypot-field" aria-hidden="true">
                                <label htmlFor="website">Leave this empty</label>
                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    value={honeypot}
                                    onChange={(e) => setHoneypot(e.target.value)}
                                    tabIndex="-1"
                                    autoComplete="off"
                                />
                            </div>

                            {status && (
                                <div className={`form-status ${status}`}>
                                    {status === 'success' && <CheckCircle size={18} />}
                                    {status === 'error' && <AlertCircle size={18} />}
                                    {status === 'loading' ? 'Sending...' : statusMsg}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Sending...' : <>Send Message <Send size={18} /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
