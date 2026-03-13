const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// Rate limiter: maximum 3 requests per 15 minutes per IP
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// POST /api/contact — Save a new contact submission
router.post('/', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const newContact = await Contact.create({ name, email, subject, message });

        // Setup Nodemailer transporter
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // You can change this to your email provider
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
                replyTo: `"${name}" <${email}>`,
                to: process.env.EMAIL_USER, // Send to your own email
                subject: `📬 New Contact: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 0; border-radius: 10px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px 32px;">
                            <h2 style="color: #fff; margin: 0; font-size: 1.4rem;">📬 New Portfolio Message</h2>
                        </div>
                        <div style="padding: 28px 32px; background: #ffffff;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #555; width: 90px;"><strong>Name:</strong></td>
                                    <td style="padding: 8px 0; color: #222;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555;"><strong>Email:</strong></td>
                                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #555;"><strong>Subject:</strong></td>
                                    <td style="padding: 8px 0; color: #222;">${subject}</td>
                                </tr>
                            </table>
                            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;"/>
                            <p style="margin: 0 0 8px; color: #555;"><strong>Message:</strong></p>
                            <div style="background: #f3f4f6; border-left: 4px solid #8b5cf6; padding: 16px; border-radius: 6px; color: #222; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                        </div>
                        <div style="padding: 16px 32px; background: #f3f4f6; text-align: center; color: #888; font-size: 0.8rem;">
                            Sent via your portfolio contact form • Reply to respond to ${name}
                        </div>
                    </div>
                `
            };

            // Send email asynchronously (don't block the response)
            transporter.sendMail(mailOptions).catch(err => {
                console.error('Nodemailer error:', err.message);
            });
        }

        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: newContact
        });
    } catch (error) {
        console.error('Contact submission error:', error.message);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// GET /api/contact — Retrieve all contact submissions
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        console.error('Fetch contacts error:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
