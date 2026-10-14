const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

// Initialize Resend with API Key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

// POST endpoint: /api/contact/send
router.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in Name, Email, and Message fields.' 
    });
  }

  try {
    const data = await resend.emails.send({
      from: 'Vishwagnani Website <onboarding@resend.dev>',
      to: 'vishwagnanisevatrust@gmail.com',
      reply_to: email,
      subject: `📩 New Contact Inquiry: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #2C3238; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <h2 style="color: #E57E51; margin-bottom: 20px; font-size: 20px;">
            New Contact Message - Vishwagnani Seva Trust
          </h2>
          <p style="font-size: 14px; margin-bottom: 8px;"><strong>Full Name:</strong> ${name}</p>
          <p style="font-size: 14px; margin-bottom: 8px;"><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #6BB5C8;">${email}</a></p>
          <p style="font-size: 14px; margin-bottom: 16px;"><strong>Subject:</strong> ${subject || 'N/A'}</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">Message:</p>
          <div style="font-size: 14px; line-height: 1.6; background-color: #FBF6F0; padding: 16px; border-radius: 12px; border: 1px solid #f0e6da;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `
    });

    console.log('✅ Resend Email Delivered:', data);
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('❌ Resend Email Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

module.exports = router;