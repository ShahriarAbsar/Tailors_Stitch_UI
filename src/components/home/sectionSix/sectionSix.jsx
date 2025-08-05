import React, { useEffect, useState } from "react";
const image19 = "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/contact%206.png?updatedAt=1753525536236";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./sectionSix.scss";

const sectionSix = () => {
      const [phone, setPhone] = useState("");
  return (
    <section className="six">
        <div className="sixBody">
          {/* <div className="sixHeading">
            <h1>WE OFFER A WIDE</h1>
            <h2>RANGE OF SERVICES</h2>
          </div> */}
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
                        <label htmlFor="name"><h4>First Name</h4></label>
                        <input type="text" placeholder="First Name" required />
                      </div>
                      <div className="lastName">
                        <label htmlFor="name"><h4>Last Name</h4></label>
                        <input type="text" placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="formGroup">
                      <label htmlFor="email"><h4>Email</h4></label>
                      <input type="email" placeholder="Your Email" required />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="phone"><h4>Phone</h4></label>
                      <PhoneInput
                        country={"bd"}
                        value={phone}
                        onChange={setPhone}
                        containerClass="phoneContainer"
                        inputClass="phoneInput"
                      />
                    </div>

                    <div className="formGroup">
                      <label htmlFor="message"> <h4>Message</h4></label>
                      <textarea
                        placeholder="Leave us a message"
                        rows="4"
                        required
                      ></textarea>
                    </div>

                    
                  </form>
                  <div className="button">
                  <button className="btn3">
                      <h4>Send Message</h4>
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
