import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let name: string | null = null;
    let email: string | null = null;
    let subject: string | null = null;
    let message: string | null = null;

    if (contentType.includes('application/json')) {
      const jsonData = await request.json();
      name = jsonData.name;
      email = jsonData.email;
      subject = jsonData.subject;
      message = jsonData.message;
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      name = formData.get('name') as string;
      email = formData.get('email') as string;
      subject = formData.get('subject') as string;
      message = formData.get('message') as string;
    } else {
      return NextResponse.json(
        { error: 'Unsupported content type' },
        { status: 400 }
      );
    }

    // Log form data for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form data received:', { name, email, subject, message });
      console.log('Content-Type:', contentType);
    }

    // Check if fields exist and are not null/undefined
    if (!name || !email || !subject || !message) {
      console.log('Missing fields detected:', { name, email, subject, message });
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Trim values and check if they become empty
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      console.log('Empty fields after trimming:', { trimmedName, trimmedEmail, trimmedSubject, trimmedMessage });
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.log('CONTACT_FORM_SUBMISSION (Resend not configured):', JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        subject: trimmedSubject,
        message: trimmedMessage,
        timestamp: new Date().toISOString(),
      }));
      return NextResponse.json(
        { success: true, message: 'Message received successfully! I will get back to you soon.' },
        { status: 200 }
      );
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
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully! I will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
