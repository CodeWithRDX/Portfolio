import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading' | null
    const [statusMsg, setStatusMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
                        <form className="contact-form" onSubmit={handleSubmit}>
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
                                <textarea id="message" rows="5" placeholder="How can I help you?" value={formData.message} onChange={handleChange} required></textarea>
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
