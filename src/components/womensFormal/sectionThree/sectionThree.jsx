import React from "react";
import './sectionThree.scss'
import image1 from "../../../assets/AboutUs/fourfooter1.png"
const sectionThree = () => {
  return (
    <div className="allBody">
      <div className="allProductFooter">
        <div className="allProductFooterTop">
          <img src={image1} alt="" />
        </div>
        <div className="allProductFooterMiddle">
          <h1>Still have questions?</h1>
          <p>
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
        </div>
        <div className="allProductFooterBottom">
          <button className="btn">Get in Touch</button>
        </div>
      </div>
    </div>
  );
};

export default sectionThree;
