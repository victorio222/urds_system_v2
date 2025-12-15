"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch, TextField } from "@mui/material";

export interface SettingModalProps {
  open: boolean;
  onClose: () => void;
  type: "profile" | "security" | "notifications" | "theme" | "system" | "logs";
}

const SettingModal: React.FC<SettingModalProps> = ({ open, onClose, type }) => {
  const renderContent = () => {
    switch (type) {
      case "profile":
        return (
          <div className="space-y-4">
            <TextField label="Display Name" fullWidth />
            <TextField label="Email" fullWidth />
            <Button variant="contained" color="primary">Update Profile</Button>
          </div>
        );
      case "security":
        return (
          <div className="space-y-4">
            <TextField label="Current Password" type="password" fullWidth />
            <TextField label="New Password" type="password" fullWidth />
            <Button variant="contained" color="error">Update Password</Button>
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
        return <p>System default settings and application behavior can be configured here.</p>;
      case "logs":
        return <p>View all system logs and audit records here.</p>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)} Settings</DialogTitle>
      <DialogContent dividers>{renderContent()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingModal;
