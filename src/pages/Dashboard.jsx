import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { vehicleAPI, driverAPI, fuelAPI } from '../services/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    vehicles: [],
    drivers: [],
    fuelAlerts: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // For now, we'll use mock data until backend is ready
        const mockData = {
          vehicles: [
            { id: 'V1234', status: 'Running', location: { lat: 37.7749, lng: -122.4194 } }
          ],
          drivers: [
            { id: 'D001', name: 'Lucas Hayes', score: 95, status: 'Active' }
          ],
          fuelAlerts: []
        };
        
        setDashboardData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Fleet Management Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Vehicles</Typography>
            <Typography variant="h3">{dashboardData.vehicles.length}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Active Drivers</Typography>
            <Typography variant="h3">{dashboardData.drivers.length}</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Status Overview
            </Typography>
            <Typography>Vehicle tracking components will be implemented here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
