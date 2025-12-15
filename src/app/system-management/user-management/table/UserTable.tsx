"use client";

import React, { useState, useEffect } from "react";
import Table from "@/component/ui/Table";
import { BiSolidPlusCircle, BiSolidFilterAlt } from "react-icons/bi";
import ActionDropdown from "../action/ActionDropdown";
import Dropdown, { DropdownItem } from "@/component/ui/Dropdown";
import Modal from "@/component/ui/Modal";

import {
  getUsers,
  createUser,
  getRoles,
  getCampuses,
  getColleges,
} from "@/utils/apiHelpers";

import { useAuth } from "@/context/AuthContext";

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

type TableDataKey = Exclude<keyof UserEntry, "user_id"> | "id" | "display_id";
type ControlKey = "checkbox" | "action";
type ColumnKey = TableDataKey | ControlKey;

interface TableColumnDefinition {
  key: ColumnKey;
  header: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  render?: (value: any, row: TableUserEntry) => React.ReactNode;
}
type TableColumnList = TableColumnDefinition[];

// ---------------------
// Add User Form
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
          <label className="block text-sm text-black font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">
            Middle Name
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600"
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">
            Suffix Name
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-gray-600"
            value={suffix_name}
            onChange={(e) => setSuffix(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-black font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded text-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-black font-medium mb-1">
            Role/Position
          </label>
          <select
            className="w-full border px-3 py-2 rounded text-gray-600"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Administrator</option>
            <option>Faculty</option>
            <option>Staff</option>
            <option>Student</option>
            <option>Evaluator</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-black font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded text-gray-600"
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
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

// ---------------------
// User Table
// ---------------------
interface UserTableProps {
  data: TableUserEntry[];
  setModalOpen: (open: boolean) => void;
  rolesMap: LookupMap;
  campusesMap: LookupMap;
  collegesMap: LookupMap;
}

const UserTable = ({
  data,
  setModalOpen,
  rolesMap,
  campusesMap,
  collegesMap,
}: UserTableProps) => {
  const [statusFilter, setStatusFilter] = useState("All Users");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleRow = (id: number) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSelectAll = () => {
    setSelectedRows(selectAll ? [] : data.map((item) => item.id));
    setSelectAll(!selectAll);
  };

  const statusItems: DropdownItem[] = [
    { label: "All Users", onClick: () => setStatusFilter("All Users") },
  ];

  const columns: TableColumnList = [
    {
      key: "checkbox",
      header: (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
          className="w-4 h-4 cursor-pointer"
        />
      ),
      align: "center",
      width: "40px",
      render: (_: any, row: TableUserEntry) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => toggleRow(row.id)}
          className="w-4 h-4 cursor-pointer"
        />
      ),
    },
    { key: "display_id", header: "ID", align: "center", width: "50px" },
    {
      key: "first_name",
      header: "Name of User",
      align: "left",
      width: "minmax(150px, 2fr)",
      render: (_: any, row: TableUserEntry) =>
        `${row.first_name} ${row.last_name}`,
    },
    { key: "email", header: "Email", align: "left", width: "minmax(150px, 2fr)" },
    {
      key: "role_id",
      header: "Role",
      align: "center",
      width: "120px",
      render: (role_id: number) => rolesMap[role_id] || "N/A",
    },
    {
      key: "campus_id",
      header: "Campus",
      align: "center",
      width: "100px",
      render: (campus_id: number) => campusesMap[campus_id] || "N/A",
    },
    {
      key: "college_id",
      header: "College",
      align: "center",
      width: "100px",
      render: (college_id: number) => collegesMap[college_id] || "N/A",
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      width: "120px",
      render: (value: TableUserEntry["status"]) => {
        const styleMap = {
          Approved: "bg-green-100 text-green-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Suspended: "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${styleMap[value]}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      align: "center",
      width: "60px",
      render: (_: any, row: TableUserEntry) => (
        <ActionDropdown
          onView={() => alert(`Viewing ${row.first_name}`)}
          onApprove={() => alert(`Editing ${row.first_name}`)}
          onRequest={() => alert(`Deleting ${row.first_name}`)}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4 mt-[-10px] w-full">
      <div className="max-w-full flex justify-end mb-[-5px]">
        <div className="inline-flex flex-wrap justify-end gap-2 sm:gap-4 bg-white p-2 pr-5 rounded-full shadow">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 order-1 md:order-none w-full sm:w-auto"
          >
            <span className="pr-1 text-lg"><BiSolidPlusCircle /></span>
            Add New User
          </button>

          <Dropdown buttonContent={`Status: ${statusFilter}`} items={statusItems} />
          <div className="flex items-center text-sm text-slate-500 font-medium cursor-pointer">
            <BiSolidFilterAlt className="mr-2 text-xl" />
            More Filters
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table columns={columns as any} data={data} />
      </div>
    </div>
  );
};

// ---------------------
// Parent Page Component
// ---------------------
const UserManagementPage = () => {
  const [users, setUsers] = useState<TableUserEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
      console.error("Failed to fetch users:", err);
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

  if (fetchStatus === "loading") {
    return (
      <div className="p-8 text-center text-xl text-blue-600">
        Loading user data and lookups...
      </div>
    );
  }

  if (fetchStatus === "error") {
    return (
      <div className="p-8 text-center text-red-600 text-xl">
        Error loading users: {error || "Failed to connect to the user API."}
        <button
          onClick={fetchUsers}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Reloading Data
        </button>
      </div>
    );
  }

  return (
    <div className="pt-4 sm:p-0 md:pt-4">
      <UserTable
        data={users}
        setModalOpen={setModalOpen}
        rolesMap={rolesMap}
        campusesMap={campusesMap}
        collegesMap={collegesMap}
      />

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
