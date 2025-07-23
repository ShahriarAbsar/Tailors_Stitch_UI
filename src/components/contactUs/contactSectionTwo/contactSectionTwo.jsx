import React, { useEffect, useState } from "react";
import image19 from "../../../assets/HomePage/contact 6.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import icon1 from "../../../assets/Contacts/mail-01.png";
import icon2 from "../../../assets/Contacts/message-chat-circle.png";
import icon3 from "../../../assets/Contacts/marker-pin-02.png";
import icon4 from "../../../assets/Contacts/phone.png";
import "./contactSectionTwo.scss";

const contactSectionTwo = () => {
  const [phone, setPhone] = useState("");
  return (
    <section className="contactSectionTwo">
      <div className="contactSectionTwoBody">
        {/* <div className="contactSectionTwoHeading">
          <h1>WE OFFER A WIDE</h1>
          <h2>RANGE OF SERVICES</h2>
        </div> */}
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
              {/* <div className="contactformHeading">
                <h1>Contact Us</h1>
                <p>Our team would love to hear from you.</p>
              </div> */}
              <div className="contactforms">
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
                  <button className="btn3">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default contactSectionTwo;
