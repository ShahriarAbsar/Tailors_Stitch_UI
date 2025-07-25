import React from 'react';
import HeroImage from "../../../assets/Menscasualwear/HeroImage.png";
import './sectionOne.scss';

// Component now accepts a `title` prop
const SectionOne = ({ title }) => {
  return (
    <div className="casualOne">
      <div className="casualBody">
        <div className="image">
          <img src={HeroImage} alt="" />
        </div>
        <div className="casualbodyTitle">
          <div className="casualTitle">
            {/* Display the dynamic title */}
            <h4>{title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;