import React, { useEffect, useState } from "react";
const imageOne = "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/Section2Image1.png?updatedAt=1753525551901";

import "./sectionTwo.scss";
import { NavLink } from "react-router-dom";
const sectionTwo = () => {
  return (
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
              ourselves as leaders in fashion design, development, sourcing, and
              manufacturing.
            </p>
            <p>
              Our mission is to supply high-quality, multi-product clothing to a
              diverse range of global retailers while prioritizing
              sustainability and customer satisfaction.
            </p>
          </div>
          <div className="button">
            <button className="btn">
              <NavLink to={"/about"}> <h4>Learn More About Us</h4></NavLink>
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
  );
};

export default sectionTwo;
