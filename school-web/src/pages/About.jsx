import React from 'react';
import { History, Quote, Target, Eye, HeartHandshake, Globe, Lightbulb, Users } from 'lucide-react';

// --- Components ---

const AboutHero = () => (
  <section 
    className="relative py-24 md:py-32 flex items-center justify-center text-center text-white bg-cover bg-center"
    style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/222/fff?text=Shiv+Jyoti+School+Building')" }} // Replace with actual image
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>
    <div className="relative z-10 p-4 max-w-4xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        About Shiv Jyoti School
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-200">
        Empowering students with knowledge, character, and vision since 1995.
      </p>
    </div>
  </section>
);

const MissionVision = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Mission */}
        <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 text-white rounded-full">
              <Target className="text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            To provide a rigorous and holistic education that fosters critical thinking, creativity, and ethical leadership. We are dedicated to nurturing every student's potential in a supportive and inclusive environment, preparing them to contribute positively to a rapidly changing global society.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-600 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-600 text-white rounded-full">
              <Eye className="text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            To be a beacon of educational excellence where students transform into compassionate, innovative, and responsible global citizens. We envision a community where learning is a lifelong passion and integrity is the foundation of character.
          </p>
        </div>

      </div>
    </div>
  </section>
);

const PrincipalMessage = () => (
  <section className="py-16 md:py-24 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        
        {/* Image */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-lg transform translate-x-3 translate-y-3"></div>
            <img 
              src="https://via.placeholder.com/400x500/333/fff?text=Principal" // Replace with Principal's photo
              alt="Principal" 
              className="relative rounded-lg shadow-xl w-full max-w-sm object-cover z-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Principal's Message</h2>
          <h3 className="text-xl text-blue-600 font-semibold mb-6">Mr. A. K. Sharma</h3>
          
          <div className="relative">
            <Quote className="absolute -top-4 -left-2 text-4xl text-gray-200 z-0 opacity-50" size={48} />
            <div className="relative z-10 space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Welcome to Shiv Jyoti School. It is my privilege to lead this vibrant community of learners. We believe that education is not just about filling a bucket, but lighting a fire.
              </p>
              <p>
                Our curriculum is designed to challenge students while providing the support they need to succeed. We focus not only on academic excellence but also on character development, ensuring our students grow into well-rounded individuals who are ready to face the challenges of the future with confidence and integrity.
              </p>
              <p>
                I invite you to explore our website and discover what makes Shiv Jyoti School a special place for your child's growth.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

const CoreValues = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Core Values</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Lightbulb, title: "Excellence", desc: "We strive for the highest standards in everything we do." },
          { icon: HeartHandshake, title: "Integrity", desc: "We are honest, transparent, and ethical in our actions." },
          { icon: Users, title: "Community", desc: "We foster a supportive and inclusive family environment." },
          { icon: Globe, title: "Innovation", desc: "We embrace new ideas and creative solutions for learning." },
        ].map((val, idx) => (
          <div key={idx} className="text-center p-6 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <val.icon className="text-4xl" size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{val.title}</h3>
            <p className="text-gray-600">{val.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SchoolHistory = () => (
  <section className="py-16 md:py-24 bg-blue-900 text-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start gap-12">
        <div className="md:w-1/3">
          <div className="flex items-center gap-3 mb-4 text-blue-300">
            <History className="text-2xl" />
            <span className="uppercase tracking-widest font-bold">Our History</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">A Legacy of Learning</h2>
          <p className="text-blue-100 leading-relaxed mb-6">
            From humble beginnings to a premier institution, our journey has been defined by a relentless pursuit of quality education.
          </p>
        </div>
        
        <div className="md:w-2/3 space-y-8 border-l-2 border-blue-700 pl-8 relative">
          {[
            { year: "1995", title: "Foundation", desc: "Shiv Jyoti School was established with just 50 students and a vision to serve the community." },
            { year: "2005", title: "Campus Expansion", desc: "Inaugurated our current 5-acre campus with state-of-the-art science labs and sports facilities." },
            { year: "2015", title: "Digital Revolution", desc: "Introduced smart classrooms and a fully digital library to enhance learning experiences." },
            { year: "2023", title: "Excellence Award", desc: "Recognized as the 'Best School in the District' for academic and co-curricular achievements." },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-blue-900"></div>
              <span className="text-blue-300 font-bold text-xl block mb-1">{item.year}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-blue-100">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const About = () => {
  return (
    <main>
      <AboutHero />
      <MissionVision />
      <PrincipalMessage />
      <CoreValues />
      <SchoolHistory />
    </main>
  );
};

export default About;