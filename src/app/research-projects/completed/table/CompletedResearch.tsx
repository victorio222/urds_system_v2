import { Spinner } from "@/component/base/Spinner";
import ResearchLayout from "@/component/ui/ResearchTable";
import { useEffect, useState } from "react";

export default function CompletedResearchPage() {
  const [loading, setLoading] = useState(true);

  // Simulate data loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay to simulate an API call

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F4F7FE]">
        <Spinner />
      </div>
    );
  }
  
  return (
    <ResearchLayout
      pageTitle="Completed Projects"
      statusFilter="Completed"
      // themeColor="bg-green-100 text-green-600"
    />
  );
}
