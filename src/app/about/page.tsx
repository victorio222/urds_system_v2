'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import Breadcrumb from '@/component/ui/Breadcrumbs';
import AboutContent from './about-content/About';

const About = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-gray-200 h-auto w-full">
        <DefaultLayout pageName="About">
          <Breadcrumb pageName="About" />
          <div className='py-3 px-7'>
            <AboutContent />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default About;
