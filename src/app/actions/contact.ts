'use server';

import nodemailer from 'nodemailer';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // Log form data for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Contact form data received:', { name, email, subject, message });
  }

  // Check if fields exist and are not null/undefined
  if (!name || !email || !subject || !message) {
    console.log('Missing fields detected:', { name, email, subject, message });
    return { error: 'All fields are required' };
  }

  // Trim values and check if they become empty
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
    console.log('Empty fields after trimming:', { trimmedName, trimmedEmail, trimmedSubject, trimmedMessage });
    return { error: 'All fields are required' };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { error: 'Invalid email format' };
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content - use trimmed values
    const mailOptions = {
      from: `"Contact Form" <${process.env.SMTP_FROM_EMAIL || trimmedEmail}>`,
      to: process.env.CONTACT_EMAIL || 'contact@mujaxso.com',
      subject: `Contact Form: ${trimmedSubject}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nMessage: ${trimmedMessage}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Subject:</strong> ${trimmedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${trimmedMessage.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Contact form error:', error);
    return { error: 'Failed to send message. Please try again later.' };
  }
}
