'use server';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return { error: 'All fields are required' };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email format' };
  }

  // Here you would typically send email, save to database, etc.
  console.log('Contact form submission:', {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  });

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: 'Message sent successfully!' };
}
