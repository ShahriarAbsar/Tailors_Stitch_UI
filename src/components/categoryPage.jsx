import React from 'react';
// Import useLocation hook to read the state
import { useParams, useLocation } from 'react-router-dom';

// Assuming SectionOne and SectionTwo are in a common, reusable location
import SectionOne from './mensCasual/sectionOne/sectionOne';
import SectionTwo from './mensCasual/sectionTwo/sectionTwo';
import SectionThree from '../components/mensFormal/sectionThree/sectionThree';
import Footer from './footer/footer';

const CategoryPage = () => {
  // *** FIX 1: Destructure 'categoryId' to match the route parameter ***
  const { categoryId } = useParams();
  
  // *** FIX 2: Use useLocation to get the title from NavLink state ***
  const location = useLocation();
  const categoryTitle = location.state?.categoryTitle || 'PRODUCTS';

  // Log to confirm the correct values are being received
  console.log('CategoryPage received categoryId:', categoryId);
  console.log('CategoryPage received categoryTitle:', categoryTitle);

  return (
    <>
      <SectionOne title={categoryTitle} />
      {/* Pass the valid categoryId to SectionTwo */}
      <SectionTwo categoryId={categoryId} />
      <SectionThree />
      <Footer />
    </>
  );
};

export default CategoryPage;