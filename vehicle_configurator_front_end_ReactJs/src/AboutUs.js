// AboutUs.js
import React from "react";
import "./styles/AboutUs.css";



function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>About Our Vehicle Configurator</h2>
        <p>
          Welcome to our Vehicle Configurator – your one-stop destination for
          customizing and personalizing your dream vehicle. At our portal, we
          offer a seamless and intuitive platform where you can explore various
          options, features, and accessories to tailor your vehicle according
          to your preferences.
        </p>
        <p>
          Whether you're an automotive enthusiast seeking to create a unique
          masterpiece or a practical buyer looking to optimize your vehicle for
          specific needs, our configurator caters to all. From selecting the
          exterior color and wheel design to fine-tuning performance settings
          and interior amenities, the possibilities are endless.
        </p>
        <p>
          Our mission is to empower customers with the tools and information
          they need to make informed decisions about their vehicle purchases.
          With our user-friendly interface and extensive range of options, we
          strive to provide an unparalleled customization experience that
          enhances satisfaction and ensures that every vehicle reflects its
          owner's personality and lifestyle.
        </p>
        <p>
          Whether you're a car enthusiast, a first-time buyer, or anyone in
          between, our vehicle configurator is designed for you. Explore,
          customize, and envision your perfect ride with us today!
        </p>
      </div>
      <div className="about-us-image">
        <img src="/images/aboutus.jpg" alt="About Us" />
      </div>
    </div>
  );
}

export default AboutUs;
