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
                from: `"${name}" <${email}>`,
                to: process.env.EMAIL_USER, // Send to your own email
                subject: `New Portfolio Contact: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                html: `<p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Subject:</strong> ${subject}</p>
                       <br/>
                       <p><strong>Message:</strong></p>
                       <p>${message}</p>`
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
