'use client';
import React, { useState } from 'react';
import DefaultLayout from '@/component/layout/DefaultLayout';
import Breadcrumb from '@/component/ui/Breadcrumbs';
import PlantTransplant from './table/PlantTransplant';

const PlantTransplants = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-gray-200 h-auto w-full">
        <DefaultLayout>
          <Breadcrumb pageName="Plant Profile" />
          <div className='py-3 px-7'>
            <PlantTransplant />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default PlantTransplants;
