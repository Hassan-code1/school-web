import React, { useState } from 'react';
import { 
  FaFileInvoiceDollar, 
  FaCreditCard, 
  FaExclamationTriangle, 
  FaQuestionCircle, 
  FaChevronDown,
  FaUniversity 
} from 'react-icons/fa';

// --- Mock Data ---
// In a real application, fetch this data from your school's API.
const mockFeeData = [
  { id: 1, grade: 'Nursery & KG', admission: '₹ 5,000', tuition: '₹ 20,000', annual: '₹ 1,000', total: '₹ 26,000' },
  { id: 2, grade: 'Class I - V', admission: '₹ 5,000', tuition: '₹ 22,000', annual: '₹ 1,000', total: '₹ 28,000' },
  { id: 3, grade: 'Class VI - VIII', admission: '₹ 5,000', tuition: '₹ 25,000', annual: '₹ 2,000', total: '₹ 32,000' },
  { id: 4, grade: 'Class IX - X', admission: '₹ 5,000', tuition: '₹ 30,000', annual: '₹ 2,000', total: '₹ 37,000' },
  { id: 5, grade: 'Class XI - XII (Science)', admission: '₹ 5,000', tuition: '₹ 40,000', annual: '₹ 5,000', total: '₹ 50,000' },
  { id: 6, grade: 'Class XI - XII (Commerce)', admission: '₹ 5,000', tuition: '₹ 35,000', annual: '₹ 3,000', total: '₹ 43,000' },
];

const mockFaqs = [
  { 
    q: 'Are there any sibling discounts?', 
    a: 'Yes, Shiv Jyoti School offers a 10% discount on the tuition fee for the second child and a 15% discount for the third child.' 
  },
  { 
    q: 'What is the fee payment schedule?', 
    a: 'Fees can be paid annually (with a 3% discount) or in four quarterly installments. The due dates are April 10th, July 10th, October 10th, and January 10th.' 
  },
  { 
    q: 'Are books, uniforms, and transportation included?', 
    a: 'No, the cost of books, uniforms, and transportation is separate and not included in the fee structure listed above. These can be availed separately.' 
  },
  { 
    q: 'What is the policy for late fee payment?', 
    a: 'A late fee of ₹100 per day will be charged after the due date for each installment. We encourage all parents to pay the fees on time.' 
  },
];


/**
 * Hero section for the Fee Page
 */
const FeeHero = () => (
  <section 
    className="relative py-24 md:py-32 flex items-center justify-center text-center text-white bg-cover bg-center"
    style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/555/fff?text=Shiv+Jyoti+School+Campus')" }} // Replace with your image
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>
    <div className="relative z-10 p-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Tuition & Fees
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl font-light">
        Shiv Jyoti School | Academic Session 2025-2026
      </p>
    </div>
  </section>
);

/**
 * The main fee structure table
 */
const FeeTable = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
        Fee Structure (2025-2026)
      </h2>
      <p className="text-center text-lg text-gray-600 mb-12">
        All fees are listed in Indian Rupees (INR) and are per annum.
      </p>
      
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Grade / Class
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Admission Fee (One Time)
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Tuition Fee (Annual)
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Annual Charges
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-blue-50 text-blue-800">
                Total Payable
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockFeeData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {item.admission}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {item.tuition}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {item.annual}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-800 bg-blue-50">
                  {item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

/**
 * Section for payment details and policies
 */
const PaymentInfo = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Payment Methods */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <FaCreditCard className="text-blue-600" /> How to Pay
          </h3>
          <div className="space-y-4 text-gray-700">
            <p className="font-semibold text-lg">Online Payment Portal:</p>
            <p>The most convenient way to pay is through our secure parent portal.</p>
            <a 
              href="/portal/login" // Link to the portal
              className="inline-block bg-blue-600 text-white py-2 px-5 rounded-md font-semibold transition-colors hover:bg-blue-700"
            >
              Go to Parent Portal
            </a>
            
            <p className="font-semibold text-lg pt-4">Bank Transfer (NEFT/RTGS):</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Account Name:</strong> Shiv Jyoti School</li>
              <li><strong>Account Number:</strong> 12345678901</li>
              <li><strong>Bank:</strong> State Bank of India</li>
              <li><strong>Branch:</strong> Ranpur Kota</li>
              <li><strong>IFSC Code:</strong> SBIN0012345</li>
            </ul>
          </div>
        </div>

        {/* Important Notes */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <FaExclamationTriangle className="text-red-500" /> Important Policies
          </h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li><strong>Admission Fee</strong> is non-refundable.</li>
            <li><strong>Annual Charges</strong> include library, lab, sports, and co-curricular activity fees.</li>
            <li><strong>Fee Revision:</strong> The school management reserves the right to revise the fee structure annually.</li>
            <li><strong>Withdrawal:</strong> A one-month notice in writing is required for student withdrawal. Tuition fees for the current quarter must be paid in full.</li>
            <li><strong>Late Fee:</strong> A fine of ₹100 per day will be applicable after the 10th of the first month of each quarter.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/**
 * A single, reusable FAQ item
 */
const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-5 text-left"
      >
        <span className="text-lg font-semibold text-gray-800">{q}</span>
        <FaChevronDown 
          className={`text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 py-5' : 'max-h-0'}`}
      >
        <p className="text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

/**
 * FAQ Section
 */
const FeeFaq = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 flex items-center justify-center gap-3">
        <FaQuestionCircle /> Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {mockFaqs.map((faq, index) => (
          <FaqItem key={index} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  </section>
);


/**
 * Main Fee Page Component
 */
const FeePage = () => {
  return (
    <main>
      <FeeHero />
      <FeeTable />
      <PaymentInfo />
      <FeeFaq />
    </main>
  );
};

export default FeePage;