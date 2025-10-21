
import React from 'react';
import { FaArrowRight, FaCalendarAlt, FaBullhorn, FaBookOpen, FaPalette, FaRunning,  } from 'react-icons/fa';
import Codeforces from "../assets/images/codeforces-logo.png";
import School from "../assets/images/school-image.jpg";
import ContactUs from '../components/Contact';
const mockNews = [
  { id: 1, title: 'Annual Science Fair Winners Announced', date: 'Oct 18, 2025', snippet: 'Our students showcased amazing projects this year, pushing the boundaries of creativity and innovation.' },
  { id: 2, title: 'Varsity Soccer Team Wins State Championship', date: 'Oct 15, 2025', snippet: 'A thrilling 2-1 victory in overtime brought home the trophy. Go Titans!' },
  { id: 3, title: 'School Play "Odyssey" Receives Rave Reviews', date: 'Oct 12, 2025', snippet: 'The drama department\'s latest production was a stunning success.' },
];

const mockEvents = [
  { id: 1, title: 'Parent-Teacher Conferences', date: '2025-11-05', time: '4:00 PM - 7:00 PM' },
  { id: 2, title: 'Fall Music Concert', date: '2025-11-12', time: '7:30 PM' },
  { id: 3, title: 'Thanksgiving Break', date: '2025-11-27', time: 'All Day' },
];


const Hero = () => (
  <section 
    className="relative h-[70vh] min-h-[450px] flex items-center justify-center text-center text-white bg-cover bg-center"
    style={{ backgroundImage: `url(${School})` }}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
    
    <div className="relative z-10 p-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Welcome to Shiv Jyoti School
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl font-light mb-8">
        Nurturing Minds, Building Futures
      </p>
      <a 
        href="/admissions" 
        className="bg-blue-600 text-white py-3 px-7 rounded-md font-semibold text-lg inline-flex items-center gap-2
                   transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
      >
        Apply Now <FaArrowRight className="text-sm" />
      </a>
    </div>
  </section>
);

const WelcomeMessage = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        A Message from Our Principal
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <img 
          src={Codeforces} // Replace with actual image
          alt="Principal Jane Doe" 
          className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover flex-shrink-0 shadow-lg"
        />
        <div className="text-center md:text-left">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to Shiv Jyoti school, where we believe in the potential of every student. Our community is built on a foundation of academic excellence, personal growth, and mutual respect. We are dedicated to providing an environment where students can explore their passions, challenge themselves, and prepare to become the leaders of tomorrow.
          </p>
          <a href="/about/principal" className="text-blue-700 font-semibold text-lg hover:underline">
            Read More from Mrs. Jyoti
          </a>
        </div>
      </div>
    </div>
  </section>
);

const InfoCards = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div className="bg-white p-8 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <FaBookOpen className="text-5xl text-blue-600 mb-4 mx-auto" />
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Academics</h3>
        <p className="text-gray-600 leading-relaxed mb-6">A rigorous, college-preparatory curriculum designed to challenge and inspire.</p>
        <a href="/academics" className="text-blue-600 font-semibold hover:underline">Learn More &rarr;</a>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <FaPalette className="text-5xl text-blue-600 mb-4 mx-auto" />
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Arts & Music</h3>
        <p className="text-gray-600 leading-relaxed mb-6">Explore your creativity in our state-of-the-art studios and performance halls.</p>
        <a href="/arts" className="text-blue-600 font-semibold hover:underline">Discover Programs &rarr;</a>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <FaRunning className="text-5xl text-blue-600 mb-4 mx-auto" />
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Athletics</h3>
        <p className="text-gray-600 leading-relaxed mb-6">Join one of our 20+ championship-winning teams and build character.</p>
        <a href="/athletics" className="text-blue-600 font-semibold hover:underline">Go Titans! &rarr;</a>
      </div>

    </div>
  </section>
);

const NewsAndEvents = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold flex items-center gap-3 border-b-2 border-gray-200 pb-4 mb-8 text-gray-800">
          <FaBullhorn /> Latest News
        </h2>
        <div className="flex flex-col gap-8">
          {mockNews.map(item => (
            <article key={item.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <span className="text-sm text-gray-500 font-semibold mb-1 block">{item.date}</span>
              <h3 className="text-xl font-semibold mb-2">
                <a href={`/news/${item.id}`} className="text-gray-900 hover:text-blue-700 transition-colors">{item.title}</a>
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">{item.snippet}</p>
              <a href={`/news/${item.id}`} className="text-blue-700 font-semibold hover:underline">Read Story</a>
            </article>
          ))}
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <h2 className="text-3xl font-bold flex items-center gap-3 border-b-2 border-gray-200 pb-4 mb-8 text-gray-800">
          <FaCalendarAlt /> Upcoming Events
        </h2>
        <div className="flex flex-col gap-6">
          {mockEvents.map(item => (
            <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 border-2 border-blue-600 rounded-lg 
                              flex flex-col items-center justify-center text-blue-700 font-bold">
                <span className="text-xs uppercase leading-none">
                  {new Date(item.date).toLocaleString('default', { month: 'short' })}
                </span>
                <span className="text-3xl leading-none">
                  {new Date(item.date).getUTCDate()}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold">
                  <a href={`/events/${item.id}`} className="text-gray-900 hover:text-blue-700">{item.title}</a>
                </h3>
                <p className="text-sm text-gray-600">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
        <a 
          href="/calendar" 
          className="mt-8 inline-block bg-green-600 text-white py-2 px-5 rounded-md font-semibold 
                     transition-colors hover:bg-green-700 w-full text-center"
        >
          View Full Calendar
        </a>
      </div>

    </div>
  </section>
);

const Home = () => {
  return (
    <main>
      <Hero />
      <WelcomeMessage />
      <InfoCards />
      <NewsAndEvents />
      <ContactUs/>
    </main>
  );
};

export default Home;