"use client";
import React, { useState } from "react";
import DefaultLayout from "@/component/layout/DefaultLayout";
import AllResearchPage from "./table/AllResearch";
import ActivityTimeline from "./table/ActivityTimeline";
import UpdatesList from "./table/UpdateList";
import ProposalsPage from "./table/Scrollable";

const AllResearch = () => {
  return (
    <div className="flex max-h-screen">
      <div className="bg-blue-50 h-auto w-full">
        <DefaultLayout pageName="My Proposals">
          <div className="">
            <ProposalsPage />
          </div>
        </DefaultLayout>
      </div>
    </div>
  );
};

export default AllResearch;
