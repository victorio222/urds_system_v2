"use client";

import { Spinner } from "@/component/base/Spinner";
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  BiSearch,
  BiFilterAlt,
  BiSortAlt2,
  BiShow,
  BiCheckCircle,
  BiRevision,
  BiChevronLeft,
  BiChevronRight,
  BiDotsVerticalRounded,
  BiX,
} from "react-icons/bi";

interface ResearchProject {
  id: number;
  title: string;
  researcher: string;
  commodity: string;
  campus: string;
  college: string;
  status: "Completed" | "Terminated" | "Pending" | "Ongoing";
}

type SortConfig = {
  key: keyof ResearchProject;
  direction: "asc" | "desc";
} | null;

const AllResearchPage = () => {
  const [activeTab, setActiveTab] = useState("All Proposal");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  // Filtering States
  const [filterStatus, setFilterStatus] = useState("All Proposal");
  const [filterCollege, setFilterCollege] = useState("All");
  const [filterCommodity, setFilterCommodity] = useState("All");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // Modals
  const [showApproveModal, setShowApproveModal] = useState<number | null>(null);
  const [showRevisionModal, setShowRevisionModal] = useState<number | null>(
    null
  );

  const filterRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    "All Proposal",
    "Completed",
    "Pending",
    "Ongoing",
    "Terminated",
  ];

  const fullData: ResearchProject[] = useMemo(
    () => [
      {
        id: 1,
        title: "An In-depth Study of Plant Growth in High Salinity",
        researcher: "Dr. Alice",
        commodity: "Rice",
        campus: "UEP Main Campus",
        college: "College of Science",
        status: "Completed",
      },
      {
        id: 2,
        title: "Soil Analysis for Sustainable Agriculture",
        researcher: "Dr. Bob",
        commodity: "Corn",
        campus: "UEP Main Campus",
        college: "College of Engineering",
        status: "Pending",
      },
      {
        id: 3,
        title: "Genetic Research on Hybrid Coconut Varieties",
        researcher: "Dr. Carol",
        commodity: "Coconut",
        campus: "UEP Main Campus",
        college: "College of Science",
        status: "Ongoing",
      },
      {
        id: 4,
        title: "Impact of Market Volatility on Local Farmers",
        researcher: "Dr. Dave",
        commodity: "Rice",
        campus: "UEP Main Campus",
        college: "Business Ad",
        status: "Terminated",
      },
      {
        id: 5,
        title: "Automated Irrigation Systems for Small Farms",
        researcher: "Dr. Eve",
        commodity: "Vegetables",
        campus: "UEP Main Campus",
        college: "College of Engineering",
        status: "Pending",
      },
      {
        id: 6,
        title: "Pest Resistance in Local Cacao Varieties",
        researcher: "Dr. Frank",
        commodity: "Cacao",
        campus: "UEP Main Campus",
        college: "College of Science",
        status: "Ongoing",
      },
      {
        id: 7,
        title: "Supply Chain Optimization for Root Crops",
        researcher: "Dr. Grace",
        commodity: "Cassava",
        campus: "UEP Main Campus",
        college: "Business Ad",
        status: "Completed",
      },
      {
        id: 8,
        title: "Water Management in Upland Farming",
        researcher: "Dr. Hank",
        commodity: "Rice",
        campus: "UEP Main Campus",
        college: "College of Engineering",
        status: "Pending",
      },
      {
        id: 9,
        title: "Livestock Feed Alternatives from Waste",
        researcher: "Dr. Ivy",
        commodity: "Swine",
        campus: "UEP Main Campus",
        college: "College of Science",
        status: "Terminated",
      },
      {
        id: 10,
        title: "Digital Marketing for Agri-Entrepreneurs",
        researcher: "Dr. Jack",
        commodity: "Coconut",
        campus: "UEP Main Campus",
        college: "Business Ad",
        status: "Ongoing",
      },
      {
        id: 11,
        title: "Climate Resilience of Local Abaca",
        researcher: "Dr. Kim",
        commodity: "Abaca",
        campus: "UEP Main Campus",
        college: "College of Science",
        status: "Pending",
      },
      {
        id: 12,
        title: "Hydroponics in Urban Settings",
        researcher: "Dr. Leo",
        commodity: "Vegetables",
        campus: "UEP Main Campus",
        college: "College of Engineering",
        status: "Ongoing",
      },
      {
        id: 13,
        title: "Post-Harvest Losses in Mango Production",
        researcher: "Dr. Mia",
        commodity: "Mango",
        campus: "UEP Main Campus",
        college: "Business Ad",
        status: "Completed",
      },
      {
        id: 14,
        title: "Bio-fertilizer Efficacy on Corn",
        researcher: "Dr. Nate",
        commodity: "Corn",
        campus: "UEP Main Campus",
        college: "College of Science",
        status: "Pending",
      },
      {
        id: 15,
        title: "Renewable Energy in Poultry Farms",
        researcher: "Dr. Sam",
        commodity: "Poultry",
        campus: "UEP Main Campus",
        college: "College of Engineering",
        status: "Ongoing",
      },
    ],
    []
  );

  const colleges = ["All", ...new Set(fullData.map((d) => d.college))];
  const commodities = ["All", ...new Set(fullData.map((d) => d.commodity))];

  // Simulate data loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay to simulate an API call

    return () => clearTimeout(timer);
  }, []);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const processedData = useMemo(() => {
    let filtered = fullData.filter((item) => {
      const currentStatus =
        filterStatus === "All Proposal" ? "All Proposal" : filterStatus;
      const matchesStatus =
        currentStatus === "All Proposal" || item.status === currentStatus;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.researcher.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCollege =
        filterCollege === "All" || item.college === filterCollege;
      const matchesCommodity =
        filterCommodity === "All" || item.commodity === filterCommodity;

      return (
        matchesStatus && matchesSearch && matchesCollege && matchesCommodity
      );
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [
    fullData,
    filterStatus,
    searchQuery,
    filterCollege,
    filterCommodity,
    sortConfig,
  ]);

  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const requestSort = (key: keyof ResearchProject) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#F4F7FE]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7FE] min-h-screen p-3 md:p-8 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 relative">
        {/* Header Section */}
        <div className="p-4 md:p-6 border-b border-gray-50">
          <div className="flex justify-between items-center">
            {/* Nav: On mobile shows only "All", on MD shows all tabs */}
            <div className="flex gap-2 md:gap-8 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setFilterStatus("All Proposal")}
                className={`pb-2 text-sm font-bold transition-all whitespace-nowrap ${
                  filterStatus === "All Proposal"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-slate-400"
                }`}
              >
                All Proposal
              </button>
              {statusOptions.slice(1).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`hidden md:block pb-2 text-sm font-bold transition-all whitespace-nowrap ${
                    filterStatus === status
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-slate-400"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Search Toggle or Input */}
              <div className="relative hidden sm:block">
                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-full text-xs focus:ring-2 focus:ring-indigo-500 w-32 lg:w-48 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Trigger */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`p-2 rounded-lg border transition-all ${
                    isFilterOpen
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-500 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <BiFilterAlt size={20} />
                </button>

                {/* Filter Popup */}
                {isFilterOpen && (
                  <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] p-5 animate-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-slate-800">
                        Advanced Filters
                      </span>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-slate-400"
                      >
                        <BiX size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Mobile Status Filter (visible only on small screens) */}
                      <div className="md:hidden">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Status
                        </label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full mt-1 bg-slate-50 border-none rounded-lg text-sm p-2 focus:ring-2 focus:ring-indigo-500"
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          College
                        </label>
                        <select
                          value={filterCollege}
                          onChange={(e) => setFilterCollege(e.target.value)}
                          className="w-full mt-1 bg-slate-50 border-none rounded-lg text-sm p-2 focus:ring-2 focus:ring-indigo-500"
                        >
                          {colleges.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Commodity
                        </label>
                        <select
                          value={filterCommodity}
                          onChange={(e) => setFilterCommodity(e.target.value)}
                          className="w-full mt-1 bg-slate-50 border-none rounded-lg text-sm p-2 focus:ring-2 focus:ring-indigo-500"
                        >
                          {commodities.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          setFilterCollege("All");
                          setFilterCommodity("All");
                          setFilterStatus("All Proposal");
                          setSearchQuery("");
                        }}
                        className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="p-2 rounded-lg border border-gray-200 text-slate-500 hover:border-indigo-300 sm:hidden"
                onClick={() => requestSort("id")}
              >
                <BiSortAlt2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto px-4">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-gray-50">
                <th className="py-4 px-2 w-12">ID</th>
                <th className="py-4 px-2 text-left">Research Title</th>
                <th className="py-4 px-2 text-left">Lead Researcher</th>
                <th className="py-4 px-2 text-left">College & Campus</th>
                <th className="py-4 px-2 text-center">Status</th>
                <th className="py-4 px-2 text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-2 text-xs text-slate-400">
                    #{item.id}
                  </td>
                  <td className="py-4 px-2">
                    <div
                      className="w-60 lg:w-80 font-bold text-slate-700 text-sm truncate"
                      title={item.title}
                    >
                      {item.title}
                    </div>
                    <div className="text-[10px] text-indigo-500 font-medium mt-0.5">
                      {item.commodity}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm font-medium text-slate-600">
                    {item.researcher}
                  </td>
                  <td className="py-4 px-2">
                    <div className="text-xs font-bold text-slate-700">
                      {item.college}
                    </div>
                    <div className="text-[10px] text-slate-400 italic">
                      {item.campus}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter
                      ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Ongoing"
                          ? "bg-blue-100 text-blue-600"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center relative">
                    {/* Trigger Button */}
                    <button
                      id={`action-trigger-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row clicks if any
                        setOpenDropdownId(
                          openDropdownId === item.id ? null : item.id
                        );
                      }}
                      className={`p-1.5 rounded-lg transition-all border ${
                        openDropdownId === item.id
                          ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                          : "hover:bg-white hover:shadow-sm border-transparent hover:border-gray-100 text-slate-500"
                      }`}
                    >
                      <BiDotsVerticalRounded size={20} />
                    </button>

                    {/* Refined Action Popover */}
                    {openDropdownId === item.id && (
                      <>
                        {/* Invisible backdrop to catch clicks outside */}
                        <div
                          className="fixed inset-0 z-[40]"
                          onClick={() => setOpenDropdownId(null)}
                        />

                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-[50] py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                          <div className="px-3 py-1 mb-1 border-b border-gray-50">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              Options
                            </p>
                          </div>

                          <button
                            onClick={() => setOpenDropdownId(null)}
                            className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-indigo-50 flex items-center gap-2 transition-colors"
                          >
                            <BiShow className="text-indigo-500" size={16} />{" "}
                            View Details
                          </button>

                          {(item.status === "Pending" ||
                            item.status === "Ongoing") && (
                            <div className="mt-1 pt-1 border-t border-gray-50">
                              <button
                                onClick={() => {
                                  setShowApproveModal(item.id);
                                  setOpenDropdownId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-green-50 flex items-center gap-2 transition-colors"
                              >
                                <BiCheckCircle
                                  className="text-green-500"
                                  size={16}
                                />{" "}
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setShowRevisionModal(item.id);
                                  setOpenDropdownId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                              >
                                <BiRevision
                                  className="text-amber-500"
                                  size={16}
                                />{" "}
                                Revision
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 md:p-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span>Show</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="bg-slate-50 border-none rounded-md py-1 px-2 focus:ring-0"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <span>results of {processedData.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 hover:bg-slate-50 text-slate-400 disabled:opacity-30 transition-all"
            >
              <BiChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-slate-400 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 hover:bg-slate-50 text-slate-400 disabled:opacity-30 transition-all"
            >
              <BiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BiCheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-black text-center text-slate-800">
              Approve Proposal?
            </h3>
            <p className="text-sm text-slate-500 text-center mt-2">
              This will move the research to the official projects list and
              notify the lead researcher.
            </p>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowApproveModal(null)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-400 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowApproveModal(null)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-green-500 rounded-xl hover:bg-green-600 shadow-lg shadow-green-100 transition-all"
              >
                Yes, Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revision Modal */}
      {showRevisionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <BiRevision className="text-amber-500" /> Revision Request
            </h3>
            <div className="mt-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Feedback Comments
              </label>
              <textarea
                className="w-full h-40 mt-2 p-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm focus:border-amber-200 focus:bg-white outline-none transition-all resize-none"
                placeholder="Write your detailed feedback for the researcher here..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowRevisionModal(null)}
                className="px-6 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all"
              >
                Discard
              </button>
              <button
                onClick={() => setShowRevisionModal(null)}
                className="px-8 py-2 text-xs font-bold text-white bg-amber-500 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllResearchPage;
