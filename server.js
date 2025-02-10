const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'theperfecthp@gmail.com',
        pass: 'your-app-specific-password'
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    const mailOptions = {
        from: email,
        to: 'theperfecthp@gmail.com',
        subject: `Contact Form: ${subject}`,
        text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 