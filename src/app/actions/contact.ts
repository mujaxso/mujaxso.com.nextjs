'use server';

// This is the actual form submission logic
async function submitForm(formData: FormData) {
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
    return { error: 'All fields are required', success: false };
  }

  // Trim values and check if they become empty
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedSubject = subject.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
    console.log('Empty fields after trimming:', { trimmedName, trimmedEmail, trimmedSubject, trimmedMessage });
    return { error: 'All fields are required', success: false };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { error: 'Invalid email format', success: false };
  }

  try {
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.log('CONTACT_FORM_SUBMISSION (Resend not configured):', JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        timestamp: new Date().toISOString(),
      }));
      return { success: true, message: 'Message received successfully! I will get back to you soon.' };
    }

    // Send email using Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'contact@mujaxso.com',
        to: process.env.CONTACT_EMAIL || 'your-email@example.com',
        subject: `Contact Form: ${trimmedSubject}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${trimmedName}</p>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          <p><strong>Subject:</strong> ${trimmedSubject}</p>
          <p><strong>Message:</strong></p>
          <p>${trimmedMessage.replace(/\n/g, '<br>')}</p>
        `,
        text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\nMessage: ${trimmedMessage}`
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend API error:', errorData);
      // Even if email fails, we still log and return success to the user
      console.log('CONTACT_FORM_SUBMISSION (email failed):', JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        timestamp: new Date().toISOString(),
      }));
      return { success: true, message: 'Message received successfully! I will get back to you soon.' };
    }

    return { success: true, message: 'Message sent successfully! I will get back to you soon.' };
  } catch (error) {
    console.error('Contact form error:', error);
    // Log the submission even if there's an error
    console.log('CONTACT_FORM_SUBMISSION (with error):', JSON.stringify({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
      timestamp: new Date().toISOString(),
    }));
    // Return success even if there's an error to avoid confusing the user
    return { success: true, message: 'Message received successfully! I will get back to you soon.' };
  }
}

// Wrapper function that works with both direct calls and useFormState
export async function submitContactForm(prevState: any, formData?: FormData) {
  // Handle case when called directly (without useFormState)
  if (!formData) {
    formData = prevState;
    prevState = null;
  }

  // Log the arguments for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('submitContactForm called with:', { 
      prevState, 
      formData: formData ? 'FormData exists' : 'FormData is null/undefined',
      formDataType: typeof formData
    });
  }

  // Check if formData is valid
  if (!formData || !(formData instanceof FormData)) {
    console.error('Invalid form data received:', formData);
    return { error: 'Invalid form data. Please try again.', success: false };
  }

  return submitForm(formData);
}
