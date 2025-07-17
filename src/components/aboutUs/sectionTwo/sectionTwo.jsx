import React from "react";
import "./sectionTwo.scss";
import image1 from "../../../assets/AboutUs/sectionTwoImg1.png";
import image2 from '../../../assets/AboutUs/sectionTwoImg2.png'
const sectionTwo = () => {
  return (
    <div className="AboutSectionTwo">
      <div className="AboutSectionTwoBody">
        <div className="AboutTwoBodyTop">
          <div className="title">
            <h1>Your Trusted Apparel</h1>
            <h1>Sourcing Partner</h1>
          </div>

          <div className="paragraph">
            <p>
              We pride ourselves on delivering exceptional service by producing,
              handling, and distributing clothing with care for both our
              customers and the planet. Tailors Stitch focuses on creative
              design, sample development, product sourcing, and manufacturing to
              meet the evolving needs of our clients. Our goal is to build a
              reputation for reliability, quality, and outstanding customer
              service as we continue to grow in the global fashion landscape.
            </p>
          </div>
        </div>
        <div className="twoBodyBottom">
          <div className="bottomTop">
            <div className="bottomTopLeft">

                  
              <h1>Our Mission</h1>
              <p>
                Our mission is to deliver globally adaptive design and supply
                solutions that seamlessly blend technical expertise, competitive
                pricing, exceptional social compliance, and a diverse range of
                services.
              </p>
              <p>
                We are dedicated to fostering innovation, responsiveness, and
                value in every partnership, ensuring our clients' success and
                satisfaction.
              </p>
            </div>
            <div className="bottomTopRight">
              <div className="image">
                <img src={image1} alt="" />
              </div>
            </div>
          </div>
          <div className="bottomBottom">
            <div className="bottomBottomLeft">
              <div className="image">
                <img src={image2} alt="" />
              </div>
            </div>
            <div className="bottomBottomRight">
              <h1>OUR VISION</h1>
              <p>
                Producing & delivering clothing with care while prioritizing
                customer satisfaction & sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sectionTwo;
