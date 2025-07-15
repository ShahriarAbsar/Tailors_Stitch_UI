import React, { useEffect, useState } from "react";
import SectionOne from "./sectionOne/sectionOne";
import SectionTwo from "./sectionTwo/sectionTwo";
import SectionThree from "./sectionThree/sectionThree";
import SectionFour from "./sectionFour/sectionFour";
import SectionFive from "./sectionFive/sectionFive";
import SectionSix from "./sectionSix/sectionSix";
import Footer from "../footer/footer"

import "./home.scss";

const home = () => {
  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <Footer/>
    </>
  );
};

export default home;
