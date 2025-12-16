'use client';
import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  Typography,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import IconifyIcon from '@/component/base/IconifyIcon';

interface Notification {
  id: number;
  title: string;
  notificationDescription: string;
  dateCreated: string;
  type: 'submission' | 'announcement' | 'review' | 'approval';
}

const hardcodedNotifications: Notification[] = [
  {
    id: 1,
    title: 'Proposal Submitted',
    notificationDescription:
      'Your research proposal "AI-Based Student Tracking System" has been successfully submitted.',
    dateCreated: '2025-01-10T09:15:00',
    type: 'submission',
  },
  {
    id: 2,
    title: 'Announcement Update',
    notificationDescription:
      'A new announcement has been posted regarding the 2025 Research Grant Call.',
    dateCreated: '2025-01-11T14:30:00',
    type: 'announcement',
  },
  {
    id: 3,
    title: 'In-House Review Scheduled',
    notificationDescription:
      'Your proposal has been scheduled for In-House Review on January 18, 2025 at 1:00 PM.',
    dateCreated: '2025-01-12T10:45:00',
    type: 'review',
  },
  {
    id: 4,
    title: 'Review Result Updated',
    notificationDescription:
      'The review result for your research proposal has been updated.',
    dateCreated: '2025-01-14T16:20:00',
    type: 'review',
  },
  {
    id: 5,
    title: 'Proposal Approved',
    notificationDescription:
      'Congratulations! Your research proposal has been approved.',
    dateCreated: '2025-01-15T08:00:00',
    type: 'approval',
  },
];

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'submission':
      return 'mdi:file-upload-outline';
    case 'announcement':
      return 'mdi:bullhorn-outline';
    case 'review':
      return 'mdi:clipboard-text-outline';
    case 'approval':
      return 'mdi:check-circle-outline';
    default:
      return 'mdi:bell-outline';
  }
};

const NotificationContent = () => {
  const [notifications] = useState<Notification[]>(hardcodedNotifications);

  return (
    <Box sx={{ width: '100%', px: 2, py: 1 }}>
      {notifications.length === 0 ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ height: '60vh' }}
        >
          <IconifyIcon
            icon="ic:round-notifications-off"
            sx={{ fontSize: 200, color: '#003262', opacity: 0.6 }}
          />
          <Typography>No notifications available.</Typography>
        </Stack>
      ) : (
        <List disablePadding>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItemButton
                sx={{
                  py: 2,
                  alignItems: 'flex-start',
                }}
              >
                {/* Icon */}
                <IconifyIcon
                  icon={getIcon(notification.type)}
                  sx={{
                    fontSize: 26,
                    color: '#2563eb',
                    mt: 0.5,
                    mr: 2,
                  }}
                />

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    fontWeight={600}
                    fontSize={14}
                    color="text.primary"
                    noWrap
                  >
                    {notification.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {notification.notificationDescription}
                  </Typography>
                </Box>

                {/* Date */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ whiteSpace: 'nowrap', ml: 2 }}
                >
                  {new Date(notification.dateCreated).toLocaleDateString()}
                </Typography>
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default NotificationContent;
