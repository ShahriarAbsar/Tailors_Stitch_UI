import React from 'react'
import image1 from "../../../assets/ourServices/servicesHeroImage.png";
import './sectionOne.scss'

const sectionOne = () => {
  return (
    <div className="servicesSectionOne">
      <div className="servicesSectionOneBody">
        <div className="servicesoneBodyTop">
          <div className="servicesoneBodyTopLeft">
            <h1>OUR</h1>
            <h1>SERVICE</h1>
          </div>
          <div className="servicesoneBodyTopRight">
            {/* <p>Who We Are</p> */}
            <p>
              At Tailors Stitch, we utilize our technical expertise to make your
              products serviceable, producible, sellable, and profitable. We
              provide our customers with comprehensive solutions to bring
              fashion to their stores. Our services are tailored to meet diverse
              needs, ranging from strategic planning to production.
            </p>
            <p>
              Our aim is to push the boundaries of fashion, helping you stay
              ahead in the market and deliver exceptional value to your
              customers.
            </p>
          </div>
        </div>
      </div>
      <div className="servicesoneBodyBottom">
        <div className="image">
          <img src={image1} alt="" />
        </div>
      </div>
    </div>
  )
}

export default sectionOne
