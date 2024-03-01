// ContactUs.js
import React from "react";
import "./styles/ContactUs.css";

export default function ContactUs() {
  const email = "group13vca@gmail.com";

  const openEmailClient = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div id="contact-us-container" className="contact-us-container">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or queries, please feel free to reach out to
        us at:
      </p>
      <address>{email}</address>

      <hr />

      <h3>Contact via Email</h3>
      <button onClick={openEmailClient}>Send Email</button>
    </div>
  );
}
