import React, {useRef, useEffect, useState } from "react";
import SectionOne from "./sectionOne/sectionOne";
import SectionTwo from "./sectionTwo/sectionTwo";
import SectionThree from "./sectionThree/sectionThree";
import SectionFour from "./sectionFour/sectionFour";
import SectionFive from "./sectionFive/sectionFive";
import SectionSix from "./sectionSix/sectionSix";
import Footer from "../footer/footer"

import "./home.scss";

const home = () => {

  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const scrollToSection = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>


    <div ref={sectionRefs[0]}><SectionOne /></div>
      <div ref={sectionRefs[1]}><SectionTwo /></div>
      <div ref={sectionRefs[2]}><SectionThree /></div>
      <div ref={sectionRefs[3]}><SectionFour /></div>
      <div ref={sectionRefs[4]}><SectionFive /></div>
      <div ref={sectionRefs[5]}><SectionSix /></div>

      <Footer scrollToSection={scrollToSection} />
      {/* <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <Footer/> */}
    </>
  );
};

export default home;
