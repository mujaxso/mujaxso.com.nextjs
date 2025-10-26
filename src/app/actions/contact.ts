'use server';

export async function submitContactForm(formData: FormData) {
  try {
    // Honeypot check
    const botcheck = formData.get('botcheck') as string;
    if (botcheck?.trim()) {
      console.log('Honeypot triggered');
      return { success: true, message: 'Thank you for your message! I will get back to you soon.' };
    }

    // Prepare the data for Web3Forms
    const payload = {
      access_key: 'c5ce3857-f4f2-47f4-a977-126b08374ab1',
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject_line'),
      message: formData.get('message'),
      from_name: 'My Website Contact Form',
      botcheck: botcheck
    };

    console.log('Sending to Web3Forms:', JSON.stringify(payload, null, 2));

    // Add timeout to the fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const result = await response.json();
    console.log('Web3Forms result:', result);
    
    if (result.success) {
      return { success: true, message: 'Thank you for your message! I have received it and will get back to you within 24 hours.' };
    } else {
      return { success: false, message: result.message || 'I apologize, but there was an issue sending your message. Please try again or reach out through one of my other contact methods.' };
    }
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    if (error.name === 'AbortError') {
      return { success: false, message: 'The request timed out. Please check your internet connection and try again.' };
    }
    return { success: false, message: 'I apologize for the inconvenience, but there seems to be a network issue. Please try again in a moment or use one of my other contact methods.' };
  }
}
