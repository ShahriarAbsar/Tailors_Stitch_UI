import React from 'react'
import HeroImage from "../../../assets/kidswear/Hero.png";
import './sectionOne.scss'
const sectionOne = () => {
  return (
    <div className="casualOne">
          <div className="casualBody">
            <div className="image">
              <img src={HeroImage} alt="" />
            </div>
            <div className="casualbodyTitle">
              {/* <div className="breadcrumbs">
                <BreadCrumb model={items}  home={home} />
              </div> */}
              <div className="casualTitle">
                <h4>KID'S WEAR</h4>
              </div>
            </div>
          </div>
        </div>
  )
}

export default sectionOne
