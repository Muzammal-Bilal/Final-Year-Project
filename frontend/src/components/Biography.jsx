import React, { useRef, useEffect, useState } from "react";

const Biography = ({ imageUrl }) => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimate(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div className="container biography" ref={imageRef}>
      <div className={`banner ${animate ? "bounce-in-left" : ""}`}>
        <img src={imageUrl} alt="whoweare" />
      </div>
      <div className={`banner ${animate ? "bounce-in-right" : ""}` } ref={textRef}>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
        Diagnosense is an AI-powered lung cancer detection platform
            developed with a mission to revolutionize early diagnosis through
            technology. Born out of a passion for innovation in healthcare,
            Diagnosense combines medical intelligence with machine learning to
            provide fast, accurate, and accessible detection support.
        </p>
        <p>
        Our system leverages trained machine learning models to analyze
            patient data and identify signs of lung cancer at an early
            stage—when treatment is most effective. Diagnosense aims to bridge
            the gap between timely diagnosis and accessible care, making
            advanced diagnostics available to medical professionals, clinics,
            and even patients in remote regions.
        </p>
        <p>
        Whether you're a healthcare provider, researcher, or patient,
            Diagnosense is your partner in smarter detection and healthier
            futures.
        </p>
      </div>
    </div>
  );
};

export default Biography;
