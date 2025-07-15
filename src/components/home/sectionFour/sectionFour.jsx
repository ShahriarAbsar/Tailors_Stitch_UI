import React, { useEffect, useState } from "react";
import image7 from "../../../assets/HomePage/product1.png";
import image8 from "../../../assets/HomePage/product2.png";
import image9 from "../../../assets/HomePage/product3.png";
import image10 from "../../../assets/HomePage/product 4.png";
import image11 from "../../../assets/HomePage/product5.png";
import image12 from "../../../assets/HomePage/product6.png";
import "./sectionFour.scss";
const sectionFour = () => {

const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1300);

  const cardData = [
    { image: image7, title: "Men's Formalwear" },
    { image: image8, title: "Men's Casualwear" },
    { image: image9, title: "Women's Formalwear" },
    { image: image10, title: "Women's Casualwear" },
    { image: image11, title: "Women's Knitwear" },
    { image: image12, title: "Kids wear" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="four">
            <div className="fourBody">
              <div className="fourHeading">
                <h1>OUR PRODUCT LINES</h1>
              </div>
              <div className="bodyCards">
                {cardData.map((item, index) => {
                  if (!isMobile || showAll || index < 3) {
                    return (
                      <div className="box" key={index}>
                        <div className="image">
                          <img src={item.image} alt={`product-${index + 1}`} />
                        </div>
                        <div className="title">
                          <h4>{item.title}</h4>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {isMobile && (
                <button className="btnView" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show Less" : "View All"}
                </button>
              )}
            </div>
          </section>
  )
}

export default sectionFour
