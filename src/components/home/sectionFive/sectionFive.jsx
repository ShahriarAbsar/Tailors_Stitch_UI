import React, { useEffect, useState } from "react";
import image13 from "../../../assets/HomePage/s401.png";
import image14 from "../../../assets/HomePage/s402.png";
import image15 from "../../../assets/HomePage/s403.png";
import image16 from "../../../assets/HomePage/s404.png";
import image17 from "../../../assets/HomePage/s405.png";
import image18 from "../../../assets/HomePage/s406.png";
import "./sectionFive.scss";


const sectionFive = () => {
  return (
    <section className="five">
        <div className="fiveBody">
          <div className="fiveHeading">
            <h1>OUR COMMITMENT</h1>

            <p>
              At Tailors Stitch, we are deeply committed to building strong
              relationships with our customers by consistently delivering value
              and excellence in every aspect of our service. Our commitment is
              rooted in a set of core principles that guide our operations and
              interactions with clients.
            </p>
          </div>
          <div className="bodyCards">
            <div className="box">
              <div className="image">
                <img src={image13} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image14} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image15} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image16} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image17} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image18} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default sectionFive
