'use client';
import HeaderLayout from '@/component/layout/header/Header';
import SidebarLayout from '@/component/layout/sidebar/Sidebar';
import React, { useState } from 'react';
import AdminDashboard from './admin/AdminDashboard';
import DefaultLayout from '@/component/layout/DefaultLayout';
import PersonelDasboard from './main/PersonnelDashboard';

const DashboardPage = () => {
  return (
    <div>
      <DefaultLayout pageName='Dashboard'>
        <PersonelDasboard />
      </DefaultLayout>
    </div>
  );
};

export default DashboardPage;
