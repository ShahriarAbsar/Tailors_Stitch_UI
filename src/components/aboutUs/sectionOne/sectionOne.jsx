import React from "react";
const image1 = 'https://ik.imagekit.io/k3nqtn6ih/assets/AboutUs/sectionOneImage1.png?updatedAt=1753525533492'
import "./sectionOne.scss";
const sectionOne = () => {
  return (
    <div className="AboutSectionOne">
      <div className="AboutSectionOneBody">
        <div className="AboutoneBodyTop">
          <div className="oneBodyTopLeft">
            <h1>
              ABOUT
            </h1>
            <h1>
              TAILORS STITCH
            </h1>
          </div>
          <div className="oneBodyTopRight">
            <p>Who We Are</p>
            <p>
              Tailors Stitch is a dynamic and forward-thinking Bangladeshi
              apparel company that began its journey in August 2022. As a
              newcomer in the industry, we are committed to establishing
              ourselves as leaders in fashion design, development, sourcing, and
              manufacturing.
            </p>
            <p>
              Our mission is to supply high-quality, multi-product clothing to a
              diverse range of global retailers while prioritizing
              sustainability and customer satisfaction.
            </p>
          </div>
        </div>
        
      </div>
      <div className="oneBodyBottom">
          <div className="image">
            <img src={image1} alt="" />
          </div>
        </div>
    </div>
  );
};

export default sectionOne;
