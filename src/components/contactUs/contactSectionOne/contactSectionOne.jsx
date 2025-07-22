import React from "react";
import image1 from "../../../assets/Contacts/contactsHero.png";
import "./contactSectionOne.scss";

const contactSectionOne = () => {
  return (
    <div className="contactSectionOne">
      <div className="contactSectionOneBody">
        <div className="contactoneBodyTop">
          <div className="contactBodyTopLeft">
            <h1>COntact</h1>
            <h1>us</h1>
          </div>
          <div className="contactBodyTopRight">
            {/* <p>Who We Are</p> */}
            <p>
              At Tailors Stitch, we are deeply committed to building strong
              relationships with our customers by consistently delivering value
              and excellence in every aspect of our service. Our commitment is
              rooted in a set of core principles that guide our operations and
              interactions with clients.
            </p>
            <p>Need to discuss any project?</p>
            <p>Feel free to get in touch with us for any queries.</p>
          </div>
        </div>
      </div>
      <div className="contactBodyBottom">
        <div className="image">
          <img src={image1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default contactSectionOne;
