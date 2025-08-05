import React, { useEffect, useState } from "react";
const image13 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/s401.png?updatedAt=1753525542118";
const image14 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/s402.png?updatedAt=1753525542914";
const image15 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/s403.png?updatedAt=1753525543368";
const image16 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/s404.png?updatedAt=1753525543347";
const image17 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/s405.png?updatedAt=1753525544890";
const image18 =
  "https://ik.imagekit.io/k3nqtn6ih/assets/HomePage/s406.png?updatedAt=1753525551746";

import "./sectionThree.scss";
const sectionThree = () => {
  return (
    <section className="AboutSectionThree">
      <div className="AboutSectionThreeBody">
        <div className="AboutSectionThreeHeading">
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
          {/* box 1 */}
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
          {/* box 2 */}
          <div className="box">
            <div className="image">
              <img src={image14} alt="product 1" />
            </div>
            <div className="title">
              <h4>Quality Assurance</h4>
            </div>

            <div className="titleDescription">
              <p>
                We ensure that every product meets the highest standards of
                quality, exceeding customer expectations.
              </p>
            </div>
          </div>
          {/* box 3 */}
          <div className="box">
            <div className="image">
              <img src={image15} alt="product 1" />
            </div>
            <div className="title">
              <h4>Timely Delivery</h4>
            </div>

            <div className="titleDescription">
              <p>
                We guarantee on-time delivery, eliminating last-minute surprises
                and ensuring smooth operations for our clients.
              </p>
            </div>
          </div>
          {/* box 4 */}
          <div className="box">
            <div className="image">
              <img src={image16} alt="product 1" />
            </div>
            <div className="title">
              <h4>Product Variety</h4>
            </div>

            <div className="titleDescription">
              <p>
                We strive to provide a diverse range of products to cater to
                different customer needs.
              </p>
            </div>
          </div>
          {/* box 5 */}
          <div className="box">
            <div className="image">
              <img src={image18} alt="product 1" />
            </div>
            <div className="title">
              <h4>Innovation</h4>
            </div>

            <div className="titleDescription">
              <p>
                We continuously innovate to stay ahead in the market, bringing
                new ideas and solutions to our customers.
              </p>
            </div>
          </div>
          {/* box 6 */}
          <div className="box">
            <div className="image">
              <img src={image17} alt="product 1" />
            </div>
            <div className="title">
              <h4>Sustainability</h4>
            </div>

            <div className="titleDescription">
              <p>
                We are committed to sustainable practices, ensuring our
                operations are environmentally responsible and socially
                compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default sectionThree;
