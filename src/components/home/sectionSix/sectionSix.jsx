import React, { useEffect, useState } from "react";
import image19 from "../../../assets/HomePage/contact 6.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./sectionSix.scss";

const sectionSix = () => {
      const [phone, setPhone] = useState("");
  return (
    <section className="six">
        <div className="sixBody">
          <div className="sixHeading">
            <h1>WE OFFER A WIDE</h1>
            <h2>RANGE OF SERVICES</h2>
          </div>
          <div className="sixMainBody">
            <div className="mainBodyLeft">
              <img src={image19} alt="" />
            </div>
            <div className="mainBodyRight">
              <div className="forms">
                <div className="formHeading">
                  <h1>Contact Us</h1>
                  <p>Our team would love to hear from you.</p>
                </div>
                <div className="forms">
                  <form>
                    <div className="formGroupName">
                      <div className="firstName">
                        <label htmlFor="name">First Name</label>
                        <input type="text" placeholder="First Name" required />
                      </div>
                      <div className="lastName">
                        <label htmlFor="name">Last Name</label>
                        <input type="text" placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="formGroup">
                      <label htmlFor="email">Email</label>
                      <input type="email" placeholder="Your Email" required />
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
                        placeholder="Leave us a message"
                        rows="4"
                        required
                      ></textarea>
                    </div>

                    
                  </form>
                  <div className="button">
                  <button className="btn3">
                      Send Message
                    </button>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default sectionSix
