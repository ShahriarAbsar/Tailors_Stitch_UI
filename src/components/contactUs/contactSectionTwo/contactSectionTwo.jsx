import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const icon1 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/Contacts/mail-01.png?updatedAt=1753525525295";
const icon2 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/Contacts/message-chat-circle.png?updatedAt=1753525525099";
const icon3 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/Contacts/marker-pin-02.png?updatedAt=1753525525188";
const icon4 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/Contacts/phone.png?updatedAt=1753525525273";
import "./contactSectionTwo.scss";

const ContactSectionTwo = () => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const apiBaseUrl = "https://api.tailors-stitch.com/contact";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitSuccess("");
    setSubmitError("");

    try {
      const res = await axios.post(apiBaseUrl, {
        firstName,
        lastName,
        email,
        phone,
        message,
      });
      setSubmitSuccess(res.data.message || "Message sent successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contactSectionTwo">
      <div className="contactSectionTwoBody">
        <div className="contactSectionTwoMainBody">
          <div className="contactmainBodyLeft">
            <div className="mainBodyLeftHeading">
              <h1>Have a chat with our team</h1>
              <p>
                We’d love to hear from you. Please fill out this form or shoot
                us an email.
              </p>
            </div>
            <div className="mainBodyLeftBody">
              <div className="box1">
                <div className="icon">
                  <img src={icon1} alt="" />
                </div>
                <div className="title">
                  <h1>Mail us</h1>
                </div>
                <div className="paragraph">
                  <p>Our friendly team is here to help.</p>
                </div>
                <div className="mail">
                  <h1>info@tailors-stitch.com</h1>
                </div>
              </div>
              <div className="box1">
                <div className="icon">
                  <img src={icon2} alt="" />
                </div>
                <div className="title">
                  <h1>Live chat</h1>
                </div>
                <div className="paragraph">
                  <p>Our friendly team is here to help.</p>
                </div>
                <div className="mail">
                  <h1>Start new chat</h1>
                </div>
              </div>
              <div className="box1">
                <div className="icon">
                  <img src={icon3} alt="" />
                </div>
                <div className="title">
                  <h1>Office</h1>
                </div>
                <div className="paragraph">
                  <p>Come say hello at our office HQ.</p>
                </div>
                <div className="mail">
                  <h1>House 117/A, Road 13, Sector 10 Uttara, Dhaka-1230</h1>
                </div>
              </div>
              <div className="box1">
                <div className="icon">
                  <img src={icon4} alt="" />
                </div>
                <div className="title">
                  <h1>Phone</h1>
                </div>
                <div className="paragraph">
                  <p>Mon-Fri from 8am to 5pm.</p>
                </div>
                <div className="mail">
                  <h1>+1 (555) 000-0000</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="contactmainBodyRight">
            <div className="contactforms">
              <div className="contactforms">
                <form onSubmit={handleSubmit}>
                  <div className="formGroupName">
                    <div className="firstName">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="lastName">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="phone">Phone</label>
                    <PhoneInput
                      country={"bd"}
                      value={phone}
                      onChange={setPhone}
                      containerClass="phoneContainer"
                      inputClass="phoneInput"
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="Leave us a message"
                      rows="4"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="button">
                    <button className="btn3" type="submit" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                    {submitSuccess && (
                      <p
                        style={{
                          color: "#4ade80",
                          marginTop: "0.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {submitSuccess}
                      </p>
                    )}
                    {submitError && (
                      <p
                        style={{
                          color: "red",
                          marginTop: "0.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {submitError}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionTwo;
