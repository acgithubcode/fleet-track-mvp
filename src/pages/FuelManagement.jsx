import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress
} from '@mui/material';
import { LocalGasStation, TrendingUp, AttachMoney, Warning } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fuelAPI } from '../services/api';

const FuelManagement = () => {
  const [fuelData, setFuelData] = useState({
    theftAlerts: [],
    efficiency: {},
    consumption: [],
    costs: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data
  const mockTheftAlerts = [
    {
      id: 1,
      vehicle: 'Truck 123',
      driver: 'Ethan Carter',
      date: '2024-07-20',
      time: '14:30',
      location: 'Highway 101',
      fuelDrop: 15,
      status: 'Potential Theft'
    },
    {
      id: 2,
      vehicle: 'Van 456',
      driver: 'Olivia Bennett',
      date: '2024-07-19',
      time: '22:15',
      location: 'Warehouse District',
      fuelDrop: 12,
      status: 'Under Investigation'
    },
    {
      id: 3,
      vehicle: 'Truck 789',
      driver: 'Noah Thompson',
      date: '2024-07-18',
      time: '08:45',
      location: 'Service Station',
      fuelDrop: 10,
      status: 'Resolved'
    }
  ];

  const mockEfficiencyData = [
    { name: 'Mon', mpg: 12.2, target: 12.5 },
    { name: 'Tue', mpg: 12.8, target: 12.5 },
    { name: 'Wed', mpg: 11.9, target: 12.5 },
    { name: 'Thu', mpg: 13.1, target: 12.5 },
    { name: 'Fri', mpg: 12.4, target: 12.5 },
    { name: 'Sat', mpg: 12.7, target: 12.5 },
    { name: 'Sun', mpg: 12.3, target: 12.5 }
  ];

  const mockConsumptionData = [
    { vehicle: 'Truck 123', consumption: 45, efficiency: 11.2 },
    { vehicle: 'Van 456', consumption: 38, efficiency: 13.1 },
    { vehicle: 'Truck 789', consumption: 52, efficiency: 10.8 },
    { vehicle: 'Van 012', consumption: 41, efficiency: 12.7 },
    { vehicle: 'Truck 345', consumption: 48, efficiency: 11.9 }
  ];

  useEffect(() => {
    fetchFuelData();
  }, [selectedPeriod]);

  const fetchFuelData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API calls
      setFuelData({
        theftAlerts: mockTheftAlerts,
        efficiency: {
          averageMPG: 12.5,
          totalFuelSaved: 500,
          potentialTheftIncidents: 15
        },
        consumption: mockConsumptionData,
        costs: mockEfficiencyData
      });
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Potential Theft': return 'error';
      case 'Under Investigation': return 'warning';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  const handleReportTheft = (alertId) => {
    console.log('Reporting theft for alert:', alertId);
    // Implement theft reporting logic
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Fuel Management
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalGasStation color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Average MPG
                  </Typography>
                  <Typography variant="h4">
                    {fuelData.efficiency.averageMPG} MPG
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp color="success" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Fuel Saved
                  </Typography>
                  <Typography variant="h4">
                    {fuelData.efficiency.totalFuelSaved} gallons
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Warning color="error" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Potential Theft Incidents
                  </Typography>
                  <Typography variant="h4">
                    {fuelData.efficiency.potentialTheftIncidents}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fuel Theft Detection */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Fuel Theft Detection
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Recent Alerts
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Fuel Drop</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fuelData.theftAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>{alert.vehicle}</TableCell>
                  <TableCell>{alert.driver}</TableCell>
                  <TableCell>{alert.date}</TableCell>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>{alert.location}</TableCell>
                  <TableCell>{alert.fuelDrop} gallons</TableCell>
                  <TableCell>
                    <Chip 
                      label={alert.status} 
                      color={getStatusColor(alert.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {alert.status === 'Potential Theft' && (
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        onClick={() => handleReportTheft(alert.id)}
                      >
                        Report
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Fuel Efficiency Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Fuel Efficiency Trend</Typography>
              <FormControl size="small">
                <Select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mpg" stroke="#8884d8" name="Actual MPG" />
                <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target MPG" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Vehicle Fuel Consumption</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockConsumptionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="vehicle" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="consumption" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Fuel Efficiency Details */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Vehicle Efficiency Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Fuel Consumption (Gallons)</TableCell>
                <TableCell>Efficiency (MPG)</TableCell>
                <TableCell>Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockConsumptionData.map((vehicle, index) => (
                <TableRow key={index}>
                  <TableCell>{vehicle.vehicle}</TableCell>
                  <TableCell>{vehicle.consumption}</TableCell>
                  <TableCell>{vehicle.efficiency}</TableCell>
                  <TableCell>
                    <LinearProgress
                      variant="determinate"
                      value={(vehicle.efficiency / 15) * 100}
                      color={vehicle.efficiency > 12 ? 'success' : vehicle.efficiency > 10 ? 'warning' : 'error'}
                      sx={{ width: 100 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default FuelManagement;
