import React from "react";
import imageOne from "../../assets/HomePage/Section2Image1.png";
import "./home.scss";
const home = () => {
  return (
    <>
      <section className="one">
        <div className="homeBody">
          <div className="homebodyLeft">
            <div className="headingText">
              <h1>Producing & Delivering clothing with care</h1>
            </div>
            <div className="subtext">
              <h2>
                At Tailors Stitch, we are deeply committed to building strong
                relationships with our customers by consistently.
              </h2>
            </div>
            <button className="btn2">Contact Us</button>
          </div>
          <div className="homebodyRight"></div>
        </div>
      </section>

      <section className="two">
        <div className="sectionTwoBody">
          <div className="bodyLeft">
            <div className="leftHeading">
              <h1>WHO WE ARE</h1>
              <h2>BEHIND TAILORS STITCH</h2>
            </div>
            <div className="leftBodyText">
              <p>
                Tailors Stitch is a dynamic and forward-thinking Bangladeshi
                apparel company that began its journey in August 2022. As a
                newcomer in the industry, we are committed to establishing
                ourselves as leaders in fashion design, development, sourcing,
                and manufacturing.
              </p>
              <p>
                Our mission is to supply high-quality, multi-product clothing to
                a diverse range of global retailers while prioritizing
                sustainability and customer satisfaction.
              </p>
            </div>
            <div className="button">
              <button className="btn">
                <a href="/about">Learn More About Us</a>
              </button>
              <div className="line">
                <hr />
              </div>
            </div>
          </div>
          <div className="bodyRight">
            <img src={imageOne} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default home;
