import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Grid,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import { Add, Edit, Phone, Email, LocationOn } from '@mui/icons-material';
import { driverAPI } from '../services/api';
import DriverForm from '../components/Forms/DriverForm';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);

  // Mock data
  const mockDrivers = [
    {
      id: 'D001',
      driverId: '12345',
      name: 'Lucas Hayes',
      email: 'lucas.hayes@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, USA',
      score: 95,
      performance: { overspeeding: 2, harshBraking: 1, idleTime: 5 },
      status: 'Active',
      assignedVehicle: { vehicleId: 'V1234', model: 'Ford Transit' },
      totalTrips: 250,
      averageRating: 4.8,
      milesDriven: 15000,
      avatar: null
    },
    {
      id: 'D002',
      driverId: '12346',
      name: 'Chloe Mitchell',
      email: 'chloe.mitchell@example.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Another City, USA',
      score: 88,
      performance: { overspeeding: 5, harshBraking: 3, idleTime: 10 },
      status: 'Active',
      assignedVehicle: { vehicleId: 'V5678', model: 'Mercedes Sprinter' },
      totalTrips: 180,
      averageRating: 4.5,
      milesDriven: 12000,
      avatar: null
    },
    {
      id: 'D003',
      driverId: '12347',
      name: 'Owen Parker',
      email: 'owen.parker@example.com',
      phone: '(555) 345-6789',
      address: '789 Pine St, Somewhere, USA',
      score: 92,
      performance: { overspeeding: 3, harshBraking: 2, idleTime: 7 },
      status: 'Active',
      assignedVehicle: { vehicleId: 'V9012', model: 'Isuzu NPR' },
      totalTrips: 320,
      averageRating: 4.7,
      milesDriven: 18000,
      avatar: null
    }
  ];

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [drivers, searchTerm, activeTab]);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setDrivers(mockDrivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = drivers.filter(driver => {
      const matchesSearch = searchTerm === '' || 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.driverId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 0 || 
        (activeTab === 1 && driver.status === 'Active') ||
        (activeTab === 2 && driver.status === 'Inactive');
      
      return matchesSearch && matchesTab;
    });
    setFilteredDrivers(filtered);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'warning';
    return 'error';
  };

  const handleAddDriver = () => {
    setSelectedDriver(null);
    setOpenForm(true);
  };

  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    setOpenForm(true);
  };

  const handleViewProfile = (driver) => {
    setSelectedDriver(driver);
    setOpenProfile(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Driver Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddDriver}
        >
          Add Driver
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search drivers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or ID..."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="All Drivers" />
              <Tab label="Active Drivers" />
              <Tab label="Inactive Drivers" />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Driver</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Over-speeding</TableCell>
                <TableCell>Harsh Braking</TableCell>
                <TableCell>Idle Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{driver.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{driver.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {driver.driverId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{driver.score}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={driver.score}
                        sx={{ width: 60, height: 6 }}
                        color={getScoreColor(driver.score)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{driver.performance.overspeeding}</TableCell>
                  <TableCell>{driver.performance.harshBraking}</TableCell>
                  <TableCell>{driver.performance.idleTime}</TableCell>
                  <TableCell>
                    <Chip 
                      label={driver.status} 
                      color={driver.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleViewProfile(driver)}>
                      View Profile
                    </Button>
                    <IconButton onClick={() => handleEditDriver(driver)} color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Driver Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedDriver ? 'Edit Driver' : 'Add New Driver'}
        </DialogTitle>
        <DialogContent>
          <DriverForm 
            driver={selectedDriver}
            onSubmit={(data) => {
              console.log('Driver data:', data);
              setOpenForm(false);
              fetchDrivers();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Driver Profile Dialog */}
      <Dialog open={openProfile} onClose={() => setOpenProfile(false)} maxWidth="md" fullWidth>
        <DialogTitle>Driver Profile</DialogTitle>
        <DialogContent>
          {selectedDriver && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}>
                        {selectedDriver.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h5">{selectedDriver.name}</Typography>
                      <Typography color="text.secondary" gutterBottom>
                        Driver ID: {selectedDriver.driverId}
                      </Typography>
                      <Chip 
                        label={selectedDriver.status} 
                        color={selectedDriver.status === 'Active' ? 'success' : 'default'}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Contact Information</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Phone fontSize="small" />
                          <Typography>{selectedDriver.phone}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email fontSize="small" />
                          <Typography>{selectedDriver.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn fontSize="small" />
                          <Typography>{selectedDriver.address}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Vehicle Assignment</Typography>
                      <Typography>
                        {selectedDriver.assignedVehicle?.model} - {selectedDriver.assignedVehicle?.vehicleId}
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2">Total Trips</Typography>
                          <Typography variant="h4">{selectedDriver.totalTrips}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2">Average Rating</Typography>
                          <Typography variant="h4">{selectedDriver.averageRating}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="subtitle2">Miles Driven</Typography>
                          <Typography variant="h4">{selectedDriver.milesDriven.toLocaleString()}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Drivers;
