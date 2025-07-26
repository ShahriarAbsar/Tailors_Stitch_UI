import React, { useEffect, useState } from "react";
const image1 = "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/pic3.1.png?updatedAt=1753525533489";
const image2 = "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/pic3.2.png?updatedAt=1753525533522";
const image3 ="https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/pic3.3.png?updatedAt=1753525536828";
const image4 = "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/pic3.4.png?updatedAt=1753525538069";
const image5 = "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/pic3.5.png?updatedAt=1753525538240";
const image6 = "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/pic%203.0%20left.png?updatedAt=1753525536882";

import "./sectionThree.scss";
const sectionThree = () => {
  return (
    <section className="three">
      <div className="threeBody">
        <div className="threeHeading">
          <h1>WE OFFER A WIDE</h1>
          <h2>RANGE OF SERVICES</h2>
        </div>
        <div className="threeMainBody">
          <div className="mainBodyLeft">
            <img src={image6} alt="" />
          </div>
          <div className="mainBodyRight">
            <div className="listOne">
              <div className="image">
                <img src={image1} alt="image 1" />
              </div>
              <div className="text">
                <h1>Product Development</h1>
                <p>
                  Our team works closely with you to develop products that meet
                  your specific requirements.
                </p>
              </div>
            </div>
            <div className="listOne">
              <div className="image">
                <img src={image2} alt="image 1" />
              </div>
              <div className="text">
                <h1>Technical Pack Preparation</h1>
                <p>
                  We ensure that all technical details are meticulously prepared
                  to facilitate smooth production.
                </p>
              </div>
            </div>
            <div className="listOne">
              <div className="image">
                <img src={image3} alt="image 1" />
              </div>
              <div className="text">
                <h1>Wash Development</h1>
                <p>
                  We specialize in creating unique wash effects to enhance the
                  aesthetic appeal of your garments.
                </p>
              </div>
            </div>
            <div className="listOne">
              <div className="image">
                <img src={image4} alt="image 1" />
              </div>
              <div className="text">
                <h1>Artwork Technique Development</h1>
                <p>
                  Our experts craft innovative artwork techniques to elevate
                  your brand's visual identity.
                </p>
              </div>
            </div>
            <div className="listOne">
              <div className="image">
                <img src={image5} alt="image 1" />
              </div>
              <div className="text">
                <h1>Pattern and Sample Making</h1>
                <p>
                  Our skilled artisans create precise patterns and samples to
                  guarantee a perfect fit and quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default sectionThree;
