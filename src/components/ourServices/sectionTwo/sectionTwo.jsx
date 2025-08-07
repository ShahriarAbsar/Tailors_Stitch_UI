import React from "react";
import "./sectionTwo.scss";

const image1 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/3.1.png?updatedAt=1753525563047";
const image2 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/3.2.png?updatedAt=1753525562964";
const image3 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/3.3.png?updatedAt=1753525563342";
const image4 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/3.4.png?updatedAt=1753525563782";
const image5 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/3.5.png?updatedAt=1753525563384";

const image6 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/ourServise2.1.png?updatedAt=1753525568435";
const image7 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/ourServise2.2.png?updatedAt=1753525574946";
const image19 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/ourServise2.3.png?updatedAt=1754590429446";
const image9 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/ourServise2.4.png?updatedAt=1753525571462";
const image10 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/ourServices/ourServise2.5.png?updatedAt=1753525574321";

const sectionTwo = () => {
  const cardData = [
    { number: "15", title: "Years of experience" },
    { number: "900+", title: "Happy Clients" },
    { number: "500+", title: "Service Option" },
    { number: "270", title: "Unique Styles" },
  ];

  return (
    <div className="serviceSectionTwo">
      <div className="serviceSectionTwoBody">
        <div className="serviceTop">
          <div className="boxBody">
            {cardData.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <div className="number">
                    <h4>{item.number} </h4>
                  </div>
                  <div className="title">
                    <h4>{item.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="serviceMiddle">
          <div className="title">
            <h1>Our Services</h1>
          </div>

          <div className="serviceCards">
            {/* card 1 */}
            <div className="card">
              <div className="card1left">
                <img src={image1} alt="" />
                <h1>Product Development</h1>
                <h4>
                  Our team works closely with you to develop products that meet
                  your specific requirements.
                </h4>
              </div>
              <div className="card1right">
                <img src={image6} alt="" />
              </div>
            </div>
            {/* card 2 */}
            <div className="card">
              <div className="card1right">
                <img src={image7} alt="" />
              </div>
              <div className="card1left">
                <img src={image2} alt="" />
                <h1>
                  Technical Pack <br /> preparation
                </h1>

                <h4>
                  We ensure that all technical details are meticulously prepared
                  to facilitate smooth production.
                </h4>
              </div>
            </div>
            {/* card 3 */}
            <div className="card">
              <div className="card1left">
                <img src={image3} alt="" />
                <h1>
                  Wash Development
                </h1>
                <h4>
                  We specialize in creating unique wash effects to enhance the
                  aesthetic appeal of your garments.
                </h4>
              </div>
              <div className="card1right">
                <img src={image19} alt="" />
              </div>
              
            </div>
            {/* <div className="card">
              <div className="card1left">
                <img src={image3} alt="" />
                <h1>Wash Development</h1>
                <h4>
                  We specialize in creating unique wash effects to enhance the
                  aesthetic appeal of your garments.
                </h4>
              </div>
              <div className="card1right">
                <div className="image">
                  <img src={image19} alt="" />
                </div>
              </div>
            </div> */}
            {/* card 4 */}
            <div className="card">
              <div className="card1right">
                <img src={image9} alt="" />
              </div>
              <div className="card1left">
                <img src={image4} alt="" />
                <h1>
                  Artwork Technique <br /> Development
                </h1>
                <h4>
                  Our experts craft innovative artwork techniques to elevate
                  your brand's visual identity.
                </h4>
              </div>
            </div>
            {/* card 5 */}
            <div className="card">
              <div className="card1left">
                <img src={image5} alt="" />
                <h1>Pattern and Sample Making</h1>
                <h4>
                  Our skilled artisans create precise patterns and samples to
                  guarantee a perfect fit and quality.
                </h4>
              </div>
              <div className="card1right">
                <img src={image10} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="serviceBottom"></div>
        <div className="serviceFooter"></div> */}
      </div>
    </div>
  );
};

export default sectionTwo;
