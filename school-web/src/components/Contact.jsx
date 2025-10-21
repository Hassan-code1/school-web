import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactInfoItem = ({ icon, title, children }) => {
  const IconComponent = icon;
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <IconComponent className="text-blue-600 text-xl" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};

/**
 * The main Contact Us page/section component.
 */
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null); // { type: 'success' | 'error', text: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    // --- API Submission Simulation ---
    // In a real application, you would send `formData` to a backend API here.
    // Example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   if (!response.ok) throw new Error('Network response was not ok.');
    //   setFormMessage({ type: 'success', text: 'Thank you! Your message has been sent.' });
    //   setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    // } catch (error) {
    //   setFormMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    // } finally {
    //   setIsSubmitting(false);
    // }
    // --- End of Simulation ---

    // Simulating a 1-second network delay for this example:
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form Data Submitted:', formData);
    setFormMessage({ type: 'success', text: 'Thank you! Your message has been sent.' });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="space-y-12">
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
              <address className="space-y-6 not-italic">
                <ContactInfoItem icon={FaMapMarkerAlt} title="Our Address">
                  <p>123 Ranpur, kota, rajasthan</p>
                </ContactInfoItem>
                <ContactInfoItem icon={FaPhoneAlt} title="Call Us">
                  <a href="tel:+91 6375019785" className="text-blue-600 hover:text-blue-800 hover:underline">
                    +91 6375019785
                  </a>
                </ContactInfoItem>
                <ContactInfoItem icon={FaEnvelope} title="Email Us">
                  <a href="mailto:hk747p@gmail.com" className="text-blue-600 hover:text-blue-800 hover:underline">
                    hk747p@gmail.com
                  </a>
                </ContactInfoItem>
                <ContactInfoItem icon={FaClock} title="Office Hours">
                  <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                </ContactInfoItem>
              </address>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Location</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14458.124482801826!2d75.8247023147779!3d25.049981489040505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f873f4fed661b%3A0x3120cfb5f427a045!2sIIIT%20Kota!5e0!3m2!1sen!2sus!4v1761021288072!5m2!1sen!2sus" 
                width="600" 
                height="450" 
                style={{border:0}} 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                className='w-full h-full'
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-900 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-900 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-900 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-900 resize-y 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md 
                             transition-all duration-300 hover:bg-blue-700 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              
              {formMessage && (
                <div
                  className={`p-4 rounded-md text-center font-medium ${
                    formMessage.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {formMessage.text}
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;