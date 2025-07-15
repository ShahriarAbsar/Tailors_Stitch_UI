import React, { useEffect, useState } from "react";
import imageOne from "../../assets/HomePage/Section2Image1.png";
import "./home.scss";
//section 3 images
import image1 from "../../assets/HomePage/pic3.1.png";
import image2 from "../../assets/HomePage/pic3.2.png";
import image3 from "../../assets/HomePage/pic3.3.png";
import image4 from "../../assets/HomePage/pic3.4.png";
import image5 from "../../assets/HomePage/pic3.5.png";
import image6 from "../../assets/HomePage/pic 3.0 left.png";

//section 4 images
import image7 from "../../assets/HomePage/product1.png";
import image8 from "../../assets/HomePage/product2.png";
import image9 from "../../assets/HomePage/product3.png";
import image10 from "../../assets/HomePage/product 4.png";
import image11 from "../../assets/HomePage/product5.png";
import image12 from "../../assets/HomePage/product6.png";

//section 5 images
import image13 from "../../assets/HomePage/s401.png";
import image14 from "../../assets/HomePage/s402.png";
import image15 from "../../assets/HomePage/s403.png";
import image16 from "../../assets/HomePage/s404.png";
import image17 from "../../assets/HomePage/s405.png";
import image18 from "../../assets/HomePage/s406.png";

//contact

import image19 from "../../assets/HomePage/contact 6.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const home = () => {
  const [phone, setPhone] = useState("");
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
    <>
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
            <button className="btn2">Contact Us</button>
          </div>
          <div className="homebodyRight"></div>
        </div>
      </section>

      <section className="two">
        <div className="sectionTwoBody">
          <div className="bodyLeft">
            <div className="leftHeading">
              <h1>WHO WE ARE</h1>
              <h2>BEHIND TAILORS STITCH</h2>
            </div>
            <div className="leftBodyText">
              <p>
                Tailors Stitch is a dynamic and forward-thinking Bangladeshi
                apparel company that began its journey in August 2022. As a
                newcomer in the industry, we are committed to establishing
                ourselves as leaders in fashion design, development, sourcing,
                and manufacturing.
              </p>
              <p>
                Our mission is to supply high-quality, multi-product clothing to
                a diverse range of global retailers while prioritizing
                sustainability and customer satisfaction.
              </p>
            </div>
            <div className="button">
              <button className="btn">
                <a href="/about">Learn More About Us</a>
              </button>
              <div className="line">
                <hr />
              </div>
            </div>
          </div>
          <div className="bodyRight">
            <img src={imageOne} alt="" />
          </div>
        </div>
      </section>

      <section className="three">
        <div className="threeBody">
          <div className="threeHeading">
            <h1>WE OFFER A WIDE</h1>
            <h2>RANGE OF SERVICES</h2>
          </div>
          <div className="threeMainBody">
            <div className="mainBodyLeft">
              <img src={image6} alt="" />
            </div>
            <div className="mainBodyRight">
              <div className="listOne">
                <div className="image">
                  <img src={image1} alt="image 1" />
                </div>
                <div className="text">
                  <h1>Product Development</h1>
                  <p>
                    Our team works closely with you to develop products that
                    meet your specific requirements.
                  </p>
                </div>
              </div>
              <div className="listOne">
                <div className="image">
                  <img src={image2} alt="image 1" />
                </div>
                <div className="text">
                  <h1>Product Development</h1>
                  <p>
                    Our team works closely with you to develop products that
                    meet your specific requirements.
                  </p>
                </div>
              </div>
              <div className="listOne">
                <div className="image">
                  <img src={image3} alt="image 1" />
                </div>
                <div className="text">
                  <h1>Product Development</h1>
                  <p>
                    Our team works closely with you to develop products that
                    meet your specific requirements.
                  </p>
                </div>
              </div>
              <div className="listOne">
                <div className="image">
                  <img src={image4} alt="image 1" />
                </div>
                <div className="text">
                  <h1>Product Development</h1>
                  <p>
                    Our team works closely with you to develop products that
                    meet your specific requirements.
                  </p>
                </div>
              </div>
              <div className="listOne">
                <div className="image">
                  <img src={image5} alt="image 1" />
                </div>
                <div className="text">
                  <h1>Product Development</h1>
                  <p>
                    Our team works closely with you to develop products that
                    meet your specific requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="five">
        <div className="fiveBody">
          <div className="fiveHeading">
            <h1>OUR COMMITMENT</h1>

            <p>
              At Tailors Stitch, we are deeply committed to building strong
              relationships with our customers by consistently delivering value
              and excellence in every aspect of our service. Our commitment is
              rooted in a set of core principles that guide our operations and
              interactions with clients.
            </p>
          </div>
          <div className="bodyCards">
            <div className="box">
              <div className="image">
                <img src={image13} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image14} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image15} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image16} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image17} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
            <div className="box">
              <div className="image">
                <img src={image18} alt="product 1" />
              </div>
              <div className="title">
                <h4>Competitive Pricing</h4>
              </div>

              <div className="titleDescription">
                <p>
                  We are dedicated to offering our customers the best possible
                  prices without compromising on quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="six">
        <div className="sixBody">
          <div className="sixHeading">
            <h1>WE OFFER A WIDE</h1>
            <h2>RANGE OF SERVICES</h2>
          </div>
          <div className="sixMainBody">
            <div className="mainBodyLeft">
              <img src={image19} alt="" />
            </div>
            <div className="mainBodyRight">
              <div className="forms">
                <div className="formHeading">
                  <h1>Contact Us</h1>
                  <p>Our team would love to hear from you.</p>
                </div>
                <div className="forms">
                  <form>
                    <div className="formGroupName">
                      <div className="firstName">
                        <label htmlFor="name">First Name</label>
                        <input type="text" placeholder="First Name" required />
                      </div>
                      <div className="lastName">
                        <label htmlFor="name">Last Name</label>
                        <input type="text" placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="formGroup">
                      <label htmlFor="email">Email</label>
                      <input type="email" placeholder="Your Email" required />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="phone">Phone</label>
                      <PhoneInput
                        country={"bd"}
                        value={phone}
                        onChange={setPhone}
                        containerClass="phoneContainer"
                        inputClass="phoneInput"
                      />
                    </div>

                    <div className="formGroup">
                      <label htmlFor="message">Message</label>
                      <textarea
                        placeholder="Leave us a message"
                        rows="4"
                        required
                      ></textarea>
                    </div>

                    
                  </form>
                  <div className="button">
                  <button className="btn3">
                      Send Message
                    </button>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default home;
