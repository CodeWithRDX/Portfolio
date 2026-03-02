const connectDB = require('../lib/db');
const Contact = require('../models/Contact');

module.exports = async function handler(req, res) {
    await connectDB();

    if (req.method === 'POST') {
        try {
            const { name, email, subject, message } = req.body;

            if (!name || !email || !subject || !message) {
                return res.status(400).json({ success: false, message: 'All fields are required.' });
            }

            const newContact = await Contact.create({ name, email, subject, message });

            return res.status(201).json({
                success: true,
                message: 'Message sent successfully!',
                data: newContact
            });
        } catch (error) {
            console.error('Contact submission error:', error.message);
            return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
        }
    }

    if (req.method === 'GET') {
        try {
            const contacts = await Contact.find().sort({ createdAt: -1 });
            return res.status(200).json({ success: true, data: contacts });
        } catch (error) {
            console.error('Fetch contacts error:', error.message);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
};
