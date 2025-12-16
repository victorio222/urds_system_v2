// "use client";

// import React from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, TextField } from "@mui/material";

// export interface SettingModalProps {
//   open: boolean;
//   onClose: () => void;
//   type: "profile" | "security" | "notifications" | "theme" | "system" | "logs";
// }

// const SettingModal: React.FC<SettingModalProps> = ({ open, onClose, type }) => {
//   const renderContent = () => {
//     switch (type) {
//       case "profile":
//         return (
//           <div className="space-y-4">
//             <TextField label="Display Name" fullWidth />
//             <TextField label="Email" fullWidth />
//             <Button variant="contained" color="primary">Update Profile</Button>
//           </div>
//         );
//       case "security":
//         return (
//           <div className="space-y-4">
//             <TextField label="Current Password" type="password" fullWidth />
//             <TextField label="New Password" type="password" fullWidth />
//             <Button variant="contained" color="error">Update Password</Button>
//           </div>
//         );
//       case "notifications":
//         return (
//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               Email Alerts <Switch defaultChecked />
//             </div>
//             <div className="flex justify-between items-center">
//               System Updates <Switch />
//             </div>
//             <div className="flex justify-between items-center">
//               Activity Logs <Switch />
//             </div>
//           </div>
//         );
//       case "theme":
//         return (
//           <div className="flex justify-between items-center">
//             Dark Mode <Switch defaultChecked />
//           </div>
//         );
//       case "system":
//         return <p>System default settings and application behavior can be configured here.</p>;
//       case "logs":
//         return <p>View all system logs and audit records here.</p>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle className="font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)} Settings</DialogTitle>
//       <DialogContent dividers>{renderContent()}</DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default SettingModal;

"use client";

import React from "react";
// TANGGALIN ANG GRID IMPORT DITO!
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// Import icons
import { CloudUpload } from "@mui/icons-material";

export interface SettingModalProps {
  open: boolean;
  onClose: () => void;
  type: "profile" | "security" | "notifications" | "theme" | "system" | "logs";
}

const SettingModal: React.FC<SettingModalProps> = ({ open, onClose, type }) => {
  const getTitle = () => {
    if (type === "profile") return "Profile Settings";
    return type.charAt(0).toUpperCase() + type.slice(1) + " Settings";
  };

  const renderContent = () => {
    switch (type) {
      case "profile": // ⭐ NAAYOS NA PROFILE SETTINGS CONTENT GAMIT ANG TAILWIND FLEX/GRID
        return (
          <div className="space-y-6">
            {/* Main Layout: Flex Container (or Tailwind Grid) for two main columns */}
            <div className="flex flex-col sm:flex-row gap-6">

              {/* Left Column (File Upload) - w-full sa mobile, w-1/3 sa desktop */}
              <div className="w-full sm:w-1/3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-full flex flex-col items-center justify-center bg-gray-50 text-center min-h-[200px]">
                  <CloudUpload className="text-gray-500 mb-2" style={{ fontSize: 40 }} />
                  <p className="text-sm text-blue-600 font-medium cursor-pointer mb-2">Choose a file or drag and drop it here</p>
                  <Button variant="outlined" size="small">Browse Files</Button>
                </div>
              </div>

              {/* Right Column (Text Fields) - w-full sa mobile, w-2/3 sa desktop */}
              <div className="w-full sm:w-2/3">
                {/* Inner Grid (Tailwind Grid) for 2-column input fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* First Name, Middle Name, Last Name, Suffix */}
                  <div>
                    <TextField label="First Name" fullWidth size="small" />
                  </div>
                  <div>
                    <TextField label="Middle Name" fullWidth size="small" />
                  </div>
                  <div>
                    <TextField label="Last Name" fullWidth size="small" />
                  </div>
                  <div>
                    <TextField label="Suffix Name" fullWidth size="small" />
                  </div>

                  {/* Birth Date, Gender, Phone Number, Email */}
                  <div>
                    <TextField label="Birth Date" type="date" fullWidth size="small" InputLabelProps={{ shrink: true }} />
                  </div>
                  <div>
                    <FormControl fullWidth size="small">
                      <InputLabel>Gender</InputLabel>
                      <Select label="Gender">
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField label="Phone Number" fullWidth size="small" />
                  </div>
                  <div>
                    <TextField label="Email" type="email" fullWidth size="small" />
                  </div>
                </div>
              </div>
            </div>
            {/* End of main flex container */}
            <div className="flex justify-start items-center pt-2">
              <Button variant="contained" style={{ backgroundColor: "#2563EB", color: "white" }}>
                UPDATE PROFILE
              </Button>
            </div>
          </div>
        );
      case "security":
        return (
          <div className="space-y-4">
            <TextField label="Current Password" type="password" fullWidth />
            <TextField label="New Password" type="password" fullWidth />
            <Button variant="contained" color="error">
              Update Password
            </Button>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              Email Alerts <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center">
              System Updates <Switch />
            </div>
            <div className="flex justify-between items-center">
              Activity Logs <Switch />
            </div>
          </div>
        );
      case "theme":
        return (
          <div className="flex justify-between items-center">
            Dark Mode <Switch defaultChecked />
          </div>
        );
      case "system":
        return (
          <p>
            System default settings and application behavior can be configured
            here.
          </p>
        );
      case "logs":
        return <p>View all system logs and audit records here.</p>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="font-semibold">{getTitle()}</DialogTitle>
      <DialogContent dividers>{renderContent()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingModal;
