import React, { useState } from "react";
import { NavLink} from "react-router-dom";
const image1 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/AboutUs/fourfooter1.png?updatedAt=1753525525449";
import "./sectionFour.scss";

const SectionFour = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const data = [
    {
      title: "Is there a free trial available?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "What services do you provide?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "Which types of garments do you specialize in?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "Do you have your own factories?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "Can you develop custom designs or collections?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "What is your minimum order quantity (MOQ)?",
      content:
        "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
  ];

  return (
    <div className="aboutfour">
      <div className="aboutfourBody">
        <div className="aboutfourBodyTop">
          <div className="aboutTitle">
            <h1>Frequently asked</h1>

            <h1>questions</h1>
          </div>
          <div className="paragraph">
            <p>Everything you need to know about the product and billing.</p>
          </div>
        </div>

        <div className="accordionBody">
          {data.map((item, index) => (
            <div className="accordionItem" key={index}>
              <button
                className={`accordion ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="spn">{item.title}</span>
                <span className="icon">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </button>
              <div className={`panel ${activeIndex === index ? "open" : ""}`}>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="aboutFourFooter">
        <div className="fourFooterTop">
          <img src={image1} alt="" />
        </div>
        <div className="fourFooterMiddle">
          <h1>Still have questions?</h1>
          <p>
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
        </div>
        <div className="fourFooterBottom">
          <NavLink to="/contact">
            <button className="btn">
              <h4>Get in Touch</h4>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
