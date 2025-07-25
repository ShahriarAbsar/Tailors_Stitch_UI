import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sectionFour.scss";
import { NavLink } from "react-router-dom";

const SectionFour = () => {
  const [cardData, setCardData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1300);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category");
        const data = response.data;

        // Map API data to expected format
        const formattedData = data.map((item) => ({
          image: `http://localhost:3000/${item.image}`, // adjust base URL as needed
          title: item.name,
          path: `/${item.name.toLowerCase().replace(/\s+/g, "")}`,
        }));

        setCardData(formattedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
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
                  <NavLink to={item.path}>
                    <div className="image">
                      <img src={item.image} alt={`product-${index + 1}`} />
                    </div>
                    <div className="title">
                      <h4>{item.title}</h4>
                    </div>
                  </NavLink>
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
  );
};

export default SectionFour;
