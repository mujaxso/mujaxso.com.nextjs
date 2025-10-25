'use server';

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
    // Log the contact form submission (this will appear in Vercel's logs)
    console.log('CONTACT_FORM_SUBMISSION:', JSON.stringify({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
      timestamp: new Date().toISOString(),
    }));

    // In a real application, you might want to:
    // 1. Store in a database (like Supabase, which has a free tier)
    // 2. Send to a Discord webhook
    // 3. Use a service like Formspree
    // 4. Send to a Google Sheet
    // But for now, we'll just log and return success
    
    return { success: true, message: 'Message received successfully! I will get back to you soon.' };
  } catch (error) {
    console.error('Contact form error:', error);
    return { error: 'Failed to process message. Please try again later.' };
  }
}
