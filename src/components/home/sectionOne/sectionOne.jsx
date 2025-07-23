import React, { useEffect, useState } from "react";
import "./sectionOne.scss";
import { NavLink } from "react-router-dom";

const sectionOne = () => {
  return (
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
            <NavLink to={"/contact"}>
              <button className="btn2"> <h4>Contact Us</h4></button>
            </NavLink>
            
          </div>
          <div className="homebodyRight"></div>
        </div>
      </section>
  )
}

export default sectionOne
