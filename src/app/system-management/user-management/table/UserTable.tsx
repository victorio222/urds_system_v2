
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BiSearch, BiSolidPlusCircle } from "react-icons/bi";
import { ChevronDown, ChevronLeft, ChevronRight, Filter, UserPlus } from "lucide-react";
import { Spinner } from "@/component/base/Spinner";
import Modal from "@/component/ui/Modal";
import ActionDropdown from "../action/ActionDropdown";

import {
  getUsers,
  createUser,
  getRoles,
  getCampuses,
  getColleges,
} from "@/utils/apiHelpers";

// --- Type Definitions ---
interface UserEntry {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  status: "Approved" | "Pending" | "Suspended";
  role_id: number;
  campus_id: number;
  college_id: number;
}

interface TableUserEntry extends UserEntry {
  id: number;
  display_id: number;
}

type NewUserPayload = {
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix_name: string;
  email: string;
  role: string;
  campus: string;
  college: string;
  password: string;
};

type LookupMap = Record<number, string>;

// ---------------------
// Add User Form (Original Logic Preserved)
// ---------------------
interface AddUserFormProps {
  close: () => void;
  onAdd: (newUserData: NewUserPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AddUserForm = ({ close, onAdd, loading, error }: AddUserFormProps) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [suffix_name, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Administrator");
  const [password, setPassword] = useState("");
  const [campus, setCampus] = useState("Main");
  const [college, setCollege] = useState("IT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd({
      first_name,
      last_name,
      middle_name,
      suffix_name,
      email,
      role,
      campus,
      college,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">Middle Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">Suffix Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={suffix_name}
            onChange={(e) => setSuffix(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">Email Address</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">Role/Position</label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>URDS Staff</option>
            <option>Research Coordinator</option>
            <option>Evaluator</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-black font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={close}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

// ---------------------
// Main Page Component
// ---------------------
const UserManagementPage = () => {
  const [users, setUsers] = useState<TableUserEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [rolesMap, setRolesMap] = useState<LookupMap>({});
  const [campusesMap, setCampusesMap] = useState<LookupMap>({});
  const [collegesMap, setCollegesMap] = useState<LookupMap>({});

  const arrayToMap = (data: any[], idKey: string, nameKey: string): LookupMap => {
    if (!Array.isArray(data)) return {};
    return data.reduce((map, item) => {
      if (item && item[idKey] !== undefined && item[nameKey] !== undefined) {
        map[item[idKey]] = item[nameKey];
      }
      return map;
    }, {} as LookupMap);
  };

  const fetchLookups = async () => {
    try {
      const [rolesRes, campusesRes, collegesRes] = await Promise.all([
        getRoles(),
        getCampuses(),
        getColleges(),
      ]);
      setRolesMap(arrayToMap(rolesRes.data, "role_id", "role_name"));
      setCampusesMap(arrayToMap(campusesRes.data, "campus_id", "campus_name"));
      setCollegesMap(arrayToMap(collegesRes.data, "college_id", "college_name"));
    } catch (err) {
      console.error("Failed to fetch lookup data:", err);
    }
  };

  const fetchUsers = async () => {
    setFetchStatus("loading");
    await fetchLookups();
    try {
      const response: any = await getUsers();
      let usersArray = response.data.users || response.data || [];
      if (!Array.isArray(usersArray)) usersArray = [];

      const mappedUsers: TableUserEntry[] = usersArray.map(
        (user: UserEntry, index: number) => ({
          ...user,
          id: user.user_id,
          display_id: index + 1,
        })
      );
      setUsers(mappedUsers);
      setFetchStatus("success");
    } catch (err: any) {
      setError(err.message || "Failed to connect to the user API.");
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUserData: NewUserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await createUser(newUserData);
      const newUserFromApi: TableUserEntry = {
        user_id: response.data.user_id,
        id: response.data.user_id,
        display_id: users.length + 1,
        first_name: response.data.first_name || newUserData.first_name,
        last_name: response.data.last_name || newUserData.last_name,
        email: response.data.email,
        phone_number: response.data.phone_number || null,
        role_id: response.data.role_id,
        campus_id: response.data.campus_id,
        college_id: response.data.college_id,
        status: response.data.status || "Approved",
      };
      setUsers((prev) => [...prev, newUserFromApi]);
      setModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to create user due to a server error.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered Data (Modern Addition)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
      const roleName = rolesMap[user.role_id] || "";
      const matchesRole = roleFilter === "All Roles" || roleName === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter, rolesMap]);

  if (fetchStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen w-full mt-[-10%]">
        <Spinner />
      </div>
    );
  }

  if (fetchStatus === "error") {
    return (
      <div className="p-8 text-center text-red-600">
        <p className="text-lg font-semibold">Error loading users</p>
        <p className="text-sm opacity-70 mb-4">{error}</p>
        <button onClick={fetchUsers} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Try Reloading Data
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden font-sans">
      
      {/* 1. TOP HEADER SECTION */}
      <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-700 tracking-tight">User Management</h2>
          <p className="text-sm text-slate-400 mt-0.5">Manage system access and roles</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 md:flex-none">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all w-full md:w-56"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Role Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Filter size={16} className="text-slate-400" />
              <span className="hidden md:inline">{roleFilter}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg z-50 py-1">
                <button 
                  onClick={() => { setRoleFilter("All Roles"); setIsRoleDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  All Roles
                </button>
                {Object.values(rolesMap).map((name) => (
                  <button
                    key={name}
                    onClick={() => { setRoleFilter(name); setIsRoleDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
          >
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* 2. TABLE SECTION */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/30 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="px-6 py-4 w-12 text-center">#</th>
              <th className="px-6 py-4">Name of User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Campus / College</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-xs text-slate-400 text-center font-medium">
                  {user.display_id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{user.first_name} {user.last_name}</span>
                    <span className="text-xs text-slate-400">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 uppercase tracking-tight">
                    {rolesMap[user.role_id] || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <p className="font-semibold text-slate-600">{campusesMap[user.campus_id] || "N/A"}</p>
                    <p className="text-slate-400 italic">{collegesMap[user.college_id] || "N/A"}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider
                    ${user.status === 'Approved' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : ''}
                    ${user.status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' : ''}
                    ${user.status === 'Suspended' ? 'bg-rose-50 text-rose-500 border border-rose-100' : ''}
                  `}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <ActionDropdown
                    onView={() => alert(`Viewing ${user.first_name}`)}
                    onApprove={() => alert(`Editing ${user.first_name}`)}
                    onRequest={() => alert(`Deleting ${user.first_name}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center text-slate-400 text-sm italic">
            No users found matching your search.
          </div>
        )}
      </div>

      {/* 3. FOOTER SECTION */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-slate-50/20">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-40" disabled>
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-medium text-slate-500">
            Page <span className="text-slate-800">1</span> of 1
          </span>
          <button className="p-1.5 rounded-md border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-40" disabled>
            <ChevronRight size={16} />
          </button>
        </div>
        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
          End of User Records
        </p>
      </div>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New User"
      >
        <AddUserForm
          close={() => setModalOpen(false)}
          onAdd={handleAddUser}
          loading={loading}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default UserManagementPage;