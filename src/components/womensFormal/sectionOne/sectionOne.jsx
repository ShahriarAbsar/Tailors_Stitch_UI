import React from "react";
import "./sectionOne.scss";
import HeroImage from "../../../assets/WomensFormalwear/Hero.png";
import { BreadCrumb } from 'primereact/breadcrumb';

// const items = [{ label: 'Mens Formalwear' }];
//     const home = { label: 'Home', url: 'https://primereact.org' }

const sectionOne = () => {
  return (
    <div className="formalOne">
      <div className="formalBody">
        <div className="image">
          <img src={HeroImage} alt="" />
        </div>
        <div className="bodyTitle">
          {/* <div className="breadcrumbs">
            <BreadCrumb model={items}  home={home} />
          </div> */}
          <div className="title">
            <h4>WOMEN'S FORMALWEAR</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sectionOne;
