import React, { useEffect, useState } from "react";
import image1 from "../../../assets/HomePage/pic3.1.png";
import image2 from "../../../assets/HomePage/pic3.2.png";
import image3 from "../../../assets/HomePage/pic3.3.png";
import image4 from "../../../assets/HomePage/pic3.4.png";
import image5 from "../../../assets/HomePage/pic3.5.png";
import image6 from "../../../assets/HomePage/pic 3.0 left.png";
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
                        Our team works closely with you to develop products that
                        meet your specific requirements.
                      </p>
                    </div>
                  </div>
                  <div className="listOne">
                    <div className="image">
                      <img src={image2} alt="image 1" />
                    </div>
                    <div className="text">
                      <h1>Product Development</h1>
                      <p>
                        Our team works closely with you to develop products that
                        meet your specific requirements.
                      </p>
                    </div>
                  </div>
                  <div className="listOne">
                    <div className="image">
                      <img src={image3} alt="image 1" />
                    </div>
                    <div className="text">
                      <h1>Product Development</h1>
                      <p>
                        Our team works closely with you to develop products that
                        meet your specific requirements.
                      </p>
                    </div>
                  </div>
                  <div className="listOne">
                    <div className="image">
                      <img src={image4} alt="image 1" />
                    </div>
                    <div className="text">
                      <h1>Product Development</h1>
                      <p>
                        Our team works closely with you to develop products that
                        meet your specific requirements.
                      </p>
                    </div>
                  </div>
                  <div className="listOne">
                    <div className="image">
                      <img src={image5} alt="image 1" />
                    </div>
                    <div className="text">
                      <h1>Product Development</h1>
                      <p>
                        Our team works closely with you to develop products that
                        meet your specific requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}

export default sectionThree
