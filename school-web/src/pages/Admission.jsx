import React, { useState } from 'react';
import { FaWpforms, FaCalendarCheck, FaCheckCircle, FaUserGraduate, FaUserFriends, FaInfoCircle } from 'react-icons/fa';
import School from "../assets/images/school-image.jpg";

const AdmissionHero = () => (
  <section 
    className="relative py-24 md:py-32 flex items-center justify-center text-center text-white bg-cover bg-center"
    style={{ backgroundImage: `url(${School})` }} // Replace with your image
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>
    <div className="relative z-10 p-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Apply to Shiv Jyoti School
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl font-light">
        Your journey to excellence begins here.
      </p>
    </div>
  </section>
);

const AdmissionProcessStep = ({ icon, title, description }) => {
  const IconComponent = icon;
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="flex-shrink-0 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
        <IconComponent className="text-4xl" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};


const AdmissionPage = () => {
  const initialFormData = {
    studentFirstName: '',
    studentLastName: '',
    studentDOB: '',
    studentGender: '',
    applyingForGrade: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    relationship: '',
    previousSchool: '',
    whyOurSchool: '',
    agreeToTerms: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    // --- API Submission Simulation ---
    // In a real application, you'd send `formData` to a secure backend endpoint.
    // Example:
    // try {
    //   const response = await fetch('/api/admissions', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   if (!response.ok) throw new Error('Submission failed.');
    //   setFormMessage({ type: 'success', text: 'Application submitted successfully! We will be in touch soon.' });
    //   setFormData(initialFormData); // Clear the form
    // } catch (error) {
    //   setFormMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    // } finally {
    //   setIsSubmitting(false);
    // }
    // --- End of Simulation ---

    // Simulating a 2-second network delay:
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form Data Submitted:', formData);
    setFormMessage({ type: 'success', text: 'Application submitted successfully! We will be in touch soon.' });
    setFormData(initialFormData);
    setIsSubmitting(false);
  };

  const inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <main>
      <AdmissionHero />

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Admission Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AdmissionProcessStep 
              icon={FaWpforms} 
              title="1. Submit Application" 
              description="Complete and submit the online admission form below with all the required documents." 
            />
            <AdmissionProcessStep 
              icon={FaCalendarCheck} 
              title="2. Schedule Interview" 
              description="Our admissions team will review your application and contact you to schedule a student and parent interview." 
            />
            <AdmissionProcessStep 
              icon={FaCheckCircle} 
              title="3. Admission Decision" 
              description="After the interview, our committee will make a final decision, and you will be notified via email." 
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Online Application Form
          </h2>
          
          <form 
            onSubmit={handleSubmit} 
            className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-2xl border border-gray-100"
          >

            <fieldset className="mb-8">
              <legend className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-3">
                <FaUserGraduate /> Student Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentFirstName" className={labelStyle}>Student's First Name</label>
                  <input type="text" name="studentFirstName" id="studentFirstName" value={formData.studentFirstName} onChange={handleChange} required className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="studentLastName" className={labelStyle}>Student's Last Name</label>
                  <input type="text" name="studentLastName" id="studentLastName" value={formData.studentLastName} onChange={handleChange} required className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="studentDOB" className={labelStyle}>Date of Birth</label>
                  <input type="date" name="studentDOB" id="studentDOB" value={formData.studentDOB} onChange={handleChange} required className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="studentGender" className={labelStyle}>Gender</label>
                  <select name="studentGender" id="studentGender" value={formData.studentGender} onChange={handleChange} required className={inputStyle}>
                    <option value="" disabled>Please select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="applyingForGrade" className={labelStyle}>Applying for Grade</label>
                  <select name="applyingForGrade" id="applyingForGrade" value={formData.applyingForGrade} onChange={handleChange} required className={inputStyle}>
                    <option value="" disabled>Please select a grade...</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset className="mb-8">
              <legend className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-3">
                <FaUserFriends /> Parent/Guardian Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parentName" className={labelStyle}>Full Name</label>
                  <input type="text" name="parentName" id="parentName" value={formData.parentName} onChange={handleChange} required className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="relationship" className={labelStyle}>Relationship to Student</label>
                  <select name="relationship" id="relationship" value={formData.relationship} onChange={handleChange} required className={inputStyle}>
                    <option value="" disabled>Please select...</option>
                    <option value="parent">Parent</option>
                    <option value="guardian">Guardian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="parentEmail" className={labelStyle}>Email Address</label>
                  <input type="email" name="parentEmail" id="parentEmail" value={formData.parentEmail} onChange={handleChange} required className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="parentPhone" className={labelStyle}>Phone Number</label>
                  <input type="tel" name="parentPhone" id="parentPhone" value={formData.parentPhone} onChange={handleChange} required className={inputStyle} />
                </div>
              </div>
            </fieldset>

            <fieldset className="mb-8">
              <legend className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-3">
                <FaInfoCircle /> Additional Information
              </legend>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="previousSchool" className={labelStyle}>
                    Previous School (if applicable)
                  </label>
                  <input type="text" name="previousSchool" id="previousSchool" value={formData.previousSchool} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label htmlFor="whyOurSchool" className={labelStyle}>
                    Why are you interested in Shiv Jyoti School? (Optional)
                  </label>
                  <textarea name="whyOurSchool" id="whyOurSchool" rows="5" value={formData.whyOurSchool} onChange={handleChange} className={`${inputStyle} resize-y`}></textarea>
                </div>
              </div>
            </fieldset>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                    I certify that all information provided is true and accurate to the best of my knowledge.
                  </label>
                </div>
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-md 
                           transition-all duration-300 hover:bg-blue-700 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdmissionPage;