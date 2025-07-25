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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add, Edit, Delete, LocationOn } from '@mui/icons-material';
import { vehicleAPI } from '../services/api';
import VehicleForm from '../components/Forms/VehicleForm';
import VehicleMap from '../components/Maps/VehicleMap';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filters, setFilters] = useState({
    status: 'All Statuses',
    group: 'All Groups',
    driver: 'All Drivers',
    search: ''
  });

  // Mock data - replace with actual API calls
  const mockVehicles = [
    {
      id: 'V1234',
      vehicleId: 'V1234',
      status: 'Running',
      location: { latitude: 37.7749, longitude: -122.4194 },
      lastTrip: { start: '2024-07-25T10:00:00Z', end: '2024-07-25T11:30:00Z' },
      idleTime: 0,
      assignedDriver: { name: 'Lucas Hayes' },
      group: 'Trucks',
      model: 'Ford Transit'
    },
    {
      id: 'V5678',
      vehicleId: 'V5678',
      status: 'Stopped',
      location: { latitude: 37.7831, longitude: -122.4039 },
      lastTrip: { start: '2024-07-25T09:00:00Z', end: '2024-07-25T10:15:00Z' },
      idleTime: 15,
      assignedDriver: { name: 'Chloe Mitchell' },
      group: 'Vans',
      model: 'Mercedes Sprinter'
    },
    {
      id: 'V9012',
      vehicleId: 'V9012',
      status: 'Off-Route',
      location: { latitude: 37.7992, longitude: -122.4011 },
      lastTrip: { start: '2024-07-25T08:30:00Z', end: '2024-07-25T09:45:00Z' },
      idleTime: 0,
      assignedDriver: { name: 'Owen Parker' },
      group: 'Trucks',
      model: 'Isuzu NPR'
    }
  ];

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [vehicles, filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const response = await vehicleAPI.getAll();
      // setVehicles(response.data);
      setVehicles(mockVehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = vehicles.filter(vehicle => {
      const matchesStatus = filters.status === 'All Statuses' || vehicle.status === filters.status;
      const matchesGroup = filters.group === 'All Groups' || vehicle.group === filters.group;
      const matchesDriver = filters.driver === 'All Drivers' || vehicle.assignedDriver?.name === filters.driver;
      const matchesSearch = filters.search === '' || 
        vehicle.vehicleId.toLowerCase().includes(filters.search.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesStatus && matchesGroup && matchesDriver && matchesSearch;
    });
    setFilteredVehicles(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running': return 'success';
      case 'Stopped': return 'default';
      case 'Off-Route': return 'error';
      default: return 'default';
    }
  };

  const handleAddVehicle = () => {
    setSelectedVehicle(null);
    setOpenForm(true);
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenForm(true);
  };

  const handleViewLocation = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenMap(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Vehicle Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddVehicle}
        >
          Add Vehicle
        </Button>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Vehicle Filters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Search vehicles"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="All Statuses">All Statuses</MenuItem>
                <MenuItem value="Running">Running</MenuItem>
                <MenuItem value="Stopped">Stopped</MenuItem>
                <MenuItem value="Off-Route">Off-Route</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Group</InputLabel>
              <Select
                value={filters.group}
                onChange={(e) => setFilters({ ...filters, group: e.target.value })}
              >
                <MenuItem value="All Groups">All Groups</MenuItem>
                <MenuItem value="Trucks">Trucks</MenuItem>
                <MenuItem value="Vans">Vans</MenuItem>
                <MenuItem value="Sedans">Sedans</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Driver</InputLabel>
              <Select
                value={filters.driver}
                onChange={(e) => setFilters({ ...filters, driver: e.target.value })}
              >
                <MenuItem value="All Drivers">All Drivers</MenuItem>
                <MenuItem value="Lucas Hayes">Lucas Hayes</MenuItem>
                <MenuItem value="Chloe Mitchell">Chloe Mitchell</MenuItem>
                <MenuItem value="Owen Parker">Owen Parker</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Vehicles Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Last Trip</TableCell>
                <TableCell>Idle Time</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id} hover>
                  <TableCell>{vehicle.vehicleId}</TableCell>
                  <TableCell>
                    <Chip 
                      label={vehicle.status} 
                      color={getStatusColor(vehicle.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {vehicle.location ? 
                      `${vehicle.location.latitude.toFixed(4)}°N, ${Math.abs(vehicle.location.longitude).toFixed(4)}°W` : 
                      'Unknown'
                    }
                  </TableCell>
                  <TableCell>
                    {vehicle.lastTrip?.start ? 
                      `${new Date(vehicle.lastTrip.start).toLocaleTimeString()} - ${new Date(vehicle.lastTrip.end).toLocaleTimeString()}` : 
                      'No trips'
                    }
                  </TableCell>
                  <TableCell>{vehicle.idleTime} min</TableCell>
                  <TableCell>{vehicle.assignedDriver?.name || 'Unassigned'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewLocation(vehicle)} color="primary">
                      <LocationOn />
                    </IconButton>
                    <IconButton onClick={() => handleEditVehicle(vehicle)} color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Vehicle Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        </DialogTitle>
        <DialogContent>
          <VehicleForm 
            vehicle={selectedVehicle}
            onSubmit={(data) => {
              console.log('Vehicle data:', data);
              setOpenForm(false);
              fetchVehicles();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={openMap} onClose={() => setOpenMap(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Vehicle Location</DialogTitle>
        <DialogContent sx={{ height: 500 }}>
          {selectedVehicle && (
            <VehicleMap vehicles={[selectedVehicle]} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMap(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Vehicles;
