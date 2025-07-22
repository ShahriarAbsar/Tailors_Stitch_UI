import React from "react";
import "./sectionTwo.scss";

import image1 from "../../../assets/ourServices/3.1.png";
import image2 from "../../../assets/ourServices/3.2.png";
import image3 from "../../../assets/ourServices/3.3.png";
import image4 from "../../../assets/ourServices/3.4.png";
import image5 from "../../../assets/ourServices/3.5.png";

import image6 from "../../../assets/ourServices/ourServise2.1.png";
import image7 from "../../../assets/ourServices/ourServise2.2.png";
import image8 from "../../../assets/ourServices/ourServise2.3.png";
import image9 from "../../../assets/ourServices/ourServise2.4.png";
import image10 from "../../../assets/ourServices/ourServise2.5.png";

const sectionTwo = () => {
  const cardData = [
    { number: "15", title: "Years of experience" },
    { number: "900+", title: "Happy Clients" },
    { number: "500+", title: "Service Option" },
    { number: "270", title: "Unique Styles" },
  ];

  return (
    <div className="serviceSectionTwo">
      <div className="serviceSectionTwoBody">
        <div className="serviceTop">
          <div className="boxBody">
            {cardData.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <div className="number">
                    <h4>{item.number} </h4>
                  </div>
                  <div className="title">
                    <h4>{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="serviceMiddle">
          <div className="title">
            <h1>Our Services</h1>
          </div>

          <div className="serviceCards">
            <div className="card">
              <div className="card1left">
                <img src={image1} alt="" />
                <h1>Product Development</h1>
                <h4>
                  Our team works closely with you to develop products that meet
                  your specific requirements.
                </h4>
              </div>
              <div className="card1right">
                
                  <img src={image6} alt="" />
                
              </div>
            </div>
            <div className="card">
              <div className="card1right">
                <img src={image7} alt="" />
              </div>
              <div className="card1left">
                <img src={image2} alt="" />
                <h1>Product Development</h1>
                <h4>
                  Our team works closely with you to develop products that meet
                  your specific requirements.
                </h4>
              </div>
            </div>
            <div className="card">
              <div className="card1left">
                <img src={image3} alt="" />
                <h1>Product Development</h1>
                <h4>
                  Our team works closely with you to develop products that meet
                  your specific requirements.
                </h4>
              </div>
              <div className="card1right">
                <div className="image">
                  <img src={image8} alt="" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card1right">
                <img src={image9} alt="" />
              </div>
              <div className="card1left">
                <img src={image4} alt="" />
                <h1>Product Development</h1>
                <h4>
                  Our team works closely with you to develop products that meet
                  your specific requirements.
                </h4>
              </div>
            </div>
            <div className="card">
              <div className="card1left">
                <img src={image5} alt="" />
                <h1>Product Development</h1>
                <h4>
                  Our team works closely with you to develop products that meet
                  your specific requirements.
                </h4>
              </div>
              <div className="card1right">
                <img src={image10} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="serviceBottom"></div>
        <div className="serviceFooter"></div>
      </div>
    </div>
  );
};

export default sectionTwo;
