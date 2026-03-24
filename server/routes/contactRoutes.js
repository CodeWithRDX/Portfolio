const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const { generateContactEmailTemplate, generateReceiptEmailTemplate } = require('../utils/emailTemplate');

// ── Allowed origins (add your Vercel domain here) ──────────────────────────
const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    process.env.CLIENT_ORIGIN,   // e.g. https://your-portfolio.vercel.app
].filter(Boolean);

// ── Rate limiter: max 3 submissions per 15 min per IP ──────────────────────
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests. Please try again after 15 minutes.' }
});

// ── Input length limits ────────────────────────────────────────────────────
const LIMITS = { name: 100, email: 200, subject: 200, message: 3000 };

// POST /api/contact — Save a new contact submission
router.post('/', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message, website } = req.body;

        // ── 1. Honeypot check ────────────────────────────────────────────────
        // Bots autofill all fields; real users never see or touch this field.
        if (website) {
            // Silently return success so bots don't know they were caught.
            return res.status(200).json({ success: true, message: 'Message sent successfully!' });
        }

        // ── 2. Origin / Referer validation ────────────────────────────────────
        const origin  = req.headers.origin  || '';
        const referer = req.headers.referer || '';
        const isAllowedOrigin  = !origin  || ALLOWED_ORIGINS.some(o => origin.startsWith(o)) || origin.endsWith('.vercel.app');
        const isAllowedReferer = !referer || ALLOWED_ORIGINS.some(o => referer.startsWith(o)) || referer.includes('.vercel.app');
        if (!isAllowedOrigin || !isAllowedReferer) {
            return res.status(403).json({ success: false, message: 'Forbidden.' });
        }

        // ── 3. Required fields check ──────────────────────────────────────────
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // ── 4. Input length limits ────────────────────────────────────────────
        if (name.length > LIMITS.name || email.length > LIMITS.email ||
            subject.length > LIMITS.subject || message.length > LIMITS.message) {
            return res.status(400).json({ success: false, message: 'One or more fields exceed the maximum allowed length.' });
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
                html: generateContactEmailTemplate(name, email, subject, message)
            };

            const receiptMailOptions = {
                from: `"Raushan Kumar" <${process.env.EMAIL_USER}>`,
                to: email, // Send to the person who filled out the form
                subject: `Thank you for contacting me, ${name}!`,
                html: generateReceiptEmailTemplate(name)
            };

            // Send email synchronously to prevent Vercel from killing the process
            await transporter.sendMail(mailOptions);
            await transporter.sendMail(receiptMailOptions);
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
