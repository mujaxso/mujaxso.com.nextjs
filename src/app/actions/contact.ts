'use server';

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

    // Prepare the data for Web3Forms
    const payload: any = {
      access_key: 'c5ce3857-f4f2-47f4-a977-126b08374ab1',
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || 'Quick message from website footer',
      message: message.trim(),
      from_name: 'My Website Contact Form',
    };
    
    // Only add botcheck if it has a value
    if (botcheck && botcheck.trim()) {
      payload.botcheck = botcheck.trim();
    }

    console.log('Sending to Web3Forms:', JSON.stringify(payload, null, 2));

    // Add timeout to the fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; NextJS-Server-Action)',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        redirect: 'follow'
      });

      clearTimeout(timeoutId);

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Check if the response is OK before processing
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      console.log('Web3Forms result:', result);
      
      if (result.success) {
        return { 
          success: true, 
          message: 'Thank you for your message! I have received it and will get back to you within 24 hours.' 
        };
      } else {
        console.error('Web3Forms returned error:', result);
        return { 
          success: false, 
          message: result.message || 'I apologize, but there was an issue sending your message. Please try again or reach out through one of my other contact methods.' 
        };
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.error('Fetch error:', fetchError);
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    if (error.name === 'AbortError') {
      return { 
        success: false, 
        message: 'The request timed out. Please check your internet connection and try again.' 
      };
    }
    // Check for network errors
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
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
