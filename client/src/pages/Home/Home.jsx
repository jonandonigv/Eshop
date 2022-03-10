import React from 'react';
import { Announcement } from '../../components/Announcement/Announcement';
import { Navbar } from '../../components/Navbar/Navbar';
import Slider from '../../components/Slider/Slider';

export const Home = () => {
  return <div>
      <Navbar />
      <Announcement />
      <Slider />
  </div>;
};
