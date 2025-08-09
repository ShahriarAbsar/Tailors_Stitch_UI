import React, { useState } from "react";
const image19 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/contact%206.png?updatedAt=1753525536236";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import "./sectionSix.scss";

const SectionSix = () => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const apiBaseUrl = "http://localhost:3001/contact";

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
      // Clear form fields after successful submission
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
    <section className="six">
      <div className="sixBody">
        {/* <div className="sixHeading">
          <h1>WE OFFER A WIDE</h1>
          <h2>RANGE OF SERVICES</h2>
        </div> */}
        <div className="sixMainBody">
          <div className="mainBodyLeft">
            <img src={image19} alt="Contact" />
          </div>
          <div className="mainBodyRight">
            <div className="forms">
              <div className="formHeading">
                <h1>Contact Us</h1>
                <p>Our team would love to hear from you.</p>
              </div>
              <div className="forms">
                <form onSubmit={handleSubmit}>
                  <div className="formGroupName">
                    <div className="firstName">
                      <label htmlFor="firstName">
                        <h4>First Name</h4>
                      </label>
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
                      <label htmlFor="lastName">
                        <h4>Last Name</h4>
                      </label>
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
                    <label htmlFor="email">
                      <h4>Email</h4>
                    </label>
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
                    <label htmlFor="phone">
                      <h4>Phone</h4>
                    </label>
                    <PhoneInput
                      country={"bd"}
                      value={phone}
                      onChange={setPhone}
                      containerClass="phoneContainer"
                      inputClass="phoneInput"
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="message">
                      <h4>Message</h4>
                    </label>
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
                  </div>
                </form>
              </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSix;
