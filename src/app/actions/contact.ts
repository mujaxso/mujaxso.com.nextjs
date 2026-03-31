'use server';

import { Resend } from 'resend';

export async function submitContactForm(formData: FormData) {
  try {
    // Honeypot check
    const botcheck = formData.get('botcheck') as string;
    if (botcheck?.trim()) {
      console.log('Honeypot triggered');
      return { success: true, message: 'Thank you for your message! I will get back to you soon.' };
    }

    // Get form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject_line') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return { 
        success: false, 
        message: 'Please fill in all required fields: name, email, and message.' 
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return {
        success: false,
        message: 'Please provide a valid email address.'
      };
    }

    // Get environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    // Use contact@mujaxso.com as the recipient
    // Make sure this email is verified in Resend and not on the suppression list
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@mujaxso.com';
    
    // Log environment status for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Environment check:', {
        hasResendApiKey: !!resendApiKey,
        hasContactEmail: !!contactEmail,
        contactEmail
      });
    }

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      // In development, simulate success
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Simulating email send');
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          success: true,
          message: 'Thank you for your message! (Development mode: Email not actually sent)'
        };
      }
      // In production, provide a more specific error message
      return {
        success: false,
        message: 'The contact form is temporarily unavailable due to a configuration issue. Please email me directly at contact@mujaxso.com or try again later. (Error: RESEND_API_KEY not configured in production environment)'
      };
    }

    const resend = new Resend(resendApiKey);

    console.log('Sending email via Resend:', { name, email, subject, message });

    // Use contact@mujaxso.com as the sender (requires domain verification in Resend)
    // If domain is not verified, this will fail
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <contact@mujaxso.com>',
      to: [contactEmail],
      replyTo: email,
      subject: subject?.trim() || `New message from ${name} via website contact form`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; }
              .content { padding: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #555; }
              .value { padding: 8px; background-color: #f9f9f9; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name.trim()}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${email.trim()}</div>
                </div>
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject?.trim() || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value" style="white-space: pre-wrap;">${message.trim()}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        ----------------------------
        Name: ${name.trim()}
        Email: ${email.trim()}
        Subject: ${subject?.trim() || 'Not specified'}
        Message:
        ${message.trim()}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      // Check if the error is related to domain verification
      if (error.message?.includes('domain') || error.message?.includes('verify') || error.message?.includes('sender')) {
        return {
          success: false,
          message: `Failed to send email: ${error.message}. This may be because the domain mujaxso.com needs to be verified in Resend. Please contact me directly at contact@mujaxso.com for now.`
        };
      }
      // Check if the error is related to suppression list
      if (error.message?.includes('suppression') || error.message?.includes('suppressed')) {
        return {
          success: false,
          message: `Failed to send email: The recipient email is on the suppression list. Please remove ${contactEmail} from Resend's suppression list or use a different email address.`
        };
      }
      return {
        success: false,
        message: `Failed to send email: ${error.message}. Please try again later.`
      };
    }

    console.log('Resend success:', data);
    return {
      success: true,
      message: 'Thank you for your message! I have received it and will get back to you within 24 hours.'
    };

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    
    // Check for network errors
    if (error.message?.includes('fetch') || error.message?.includes('network') || error.message?.includes('connection')) {
      return {
        success: false,
        message: 'Network error. Please check your internet connection and try again.'
      };
    }
    
    return {
      success: false,
      message: 'I apologize for the inconvenience, but there was an issue sending your message. Please try again or use one of my other contact methods.'
    };
  }
}
