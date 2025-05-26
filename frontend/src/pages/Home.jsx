// import React from "react";
// import Hero from "../components/Hero";
// import Biography from "../components/Biography";
// import Departments from "../components/Departments";

// const Home = () => {
//   return (
//     <>
//       <Hero
//         title={
//           <>
//             Diagnosense Smarter Detection Healthier Futures
//             <br />
//             <span className="text-gray-600">
//               AI-Powered Lung Cancer Detection You Can Trust
//             </span>
//           </>
//         }
//         imageUrl="/hero.png"
//       />

//       <Biography imageUrl={"/about.jpg"} />
//       <Departments />
//     </>
//   );
// };

// export default Home;

import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import { Users, Microscope, MessageSquareText, HeartPulse, Award, Clock, Globe } from 'lucide-react';

const Home = () => {
  return (
    <>
      <Hero
        title={
          <>
            Diagnosense Smarter Detection Healthier Futures
            <br />
            <span className="text-gray-600">
              AI-Powered Lung Cancer Detection You Can Trust
            </span>
          </>
        }
        imageUrl="/hero.png"
      />

      <Biography imageUrl={"/about.jpg"} />
      <Departments />
      {/* Our Mission */}
      <section className="mission-section">
        <div className="contain">
          <div className="two-column">
            <div className="column">
              <h2>Our Mission</h2>
              <p>
                At DiagnoSense, we're committed to revolutionizing healthcare by making early lung cancer detection
                accessible to everyone. Our mission is to save lives through timely diagnosis and personalized
                healthcare guidance.
              </p><br/>
              <p>
                We believe that by combining cutting-edge AI technology with medical expertise, we can significantly
                improve patient outcomes and reduce the burden of late-stage cancer diagnosis.
              </p>
            </div>
            <div className="column">
              <div className="image-container">
                <img src="/mission.jpg" alt="Medical professionals reviewing diagnostic data" />
              </div>
            </div>
          </div>
        </div>
      </section>


 {/* Our Technology */}
      <section className="technology-section">
        <div className="contain">
          <div className="section-header">
            <h2>Cutting-Edge AI Solutions</h2>
            <p>
              Discover how our advanced technology is changing the landscape of medical diagnostics and patient care.
            </p>
          </div>
          <div className="two-column">
            <div className="techcard">
              <div className="card-header">
                <div className="icon-circle">
                  <Microscope className="icon" />
                </div>
                <h3>Early Lung Cancer Detection</h3>
              </div>
              <p>
                Our proprietary AI algorithms analyze medical imaging with unprecedented accuracy, detecting early
                signs of lung cancer that might be missed by conventional methods. This technology enables treatment
                to begin at stages when it's most effective.
              </p>
            </div>
            <div className="techcard">
              <div className="card-header">
                <div className="icon-circle">
                  <MessageSquareText className="icon" />
                </div>
                <h3>Intelligent Medical Chatbot</h3>
              </div>
              <p>
                Our advanced medical chatbot provides instant, accurate responses to health queries, offering
                personalized guidance and information. Built on the latest natural language processing technology, it
                understands context and delivers relevant medical insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet the Experts Behind DiagnoSense</h2>
            <p>
              Our diverse team of AI specialists, Software engineers and healthcare innovators work together to
              transform medical diagnostics.
            </p>
          </div>
          <div className="three-col">
            <div className="team-member">
              <div className="member-image">
                <img src="/shahzaib.jpg" alt="Muhammad Shahzaib" />
              </div>
              <h3>Muhammad Shahzaib</h3>
              <p className="member-title">Software Engineer</p>
              <p className="member-bio">
               Software Engineer with hands-on experience in building scalable web applications.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/yasin.png" alt="Muhammad Yasin" />
              </div>
              <h3>Muhammad Yasin</h3>
              <p className="member-title">Software Engineer</p>
              <p className="member-bio">
                Software Engineer with hands-on experience in building scalable web applications.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/muzzamal.jpg" alt="Muzammal Bilal" />
              </div>
              <h3>Muzammal Bilal</h3>
              <p className="member-title">AI/ML Engineer</p>
              <p className="member-bio">
                AI/ML Engineer with hands-on experience in building scalable machine learning models and intelligent applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Our Values */}
            <section className="values-section">
              <div className="contain">
                <div className="section-header">
                  <h2>What Drives Us</h2>
                  <p>
                    Our core values shape everything we do at DiagnoSense.
                  </p>
                </div>
                <div className="three-col">
                  <div className="value-item">
                    <div className="icon-circle">
                      <HeartPulse className="icon" />
                    </div>
                    <h3>Patient-Centered Care</h3>
                    <p>
                      We put patients first, designing our technology to improve health outcomes and quality of life.
                    </p>
                  </div>
                  <div className="value-item">
                    <div className="icon-circle">
                      <Award className="icon" />
                    </div>
                    <h3>Excellence & Innovation</h3>
                    <p>
                      We strive for excellence in everything we do, constantly innovating to improve our solutions.
                    </p>
                  </div>
                  <div className="value-item">
                    <div className="icon-circle">
                      <Globe className="icon" />
                    </div>
                    <h3>Accessibility</h3>
                    <p>
                      We're committed to making advanced healthcare technology accessible to people worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </section>
      
    </>
  );
};

export default Home;