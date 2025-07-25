import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Download, Print, Visibility } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('fleet-overview');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date()
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data for different report types
  const mockReportData = {
    'fleet-overview': {
      summary: {
        totalVehicles: 25,
        activeVehicles: 22,
        totalDrivers: 28,
        activeDrivers: 25,
        totalTrips: 1247,
        totalMiles: 45678,
        fuelConsumed: 3456,
        averageEfficiency: 12.5
      },
      vehicleStatus: [
        { name: 'Active', value: 22, color: '#00C49F' },
        { name: 'Inactive', value: 3, color: '#FFBB28' }
      ],
      monthlyTrends: [
        { month: 'Jan', trips: 180, miles: 6500, fuel: 520 },
        { month: 'Feb', trips: 165, miles: 5900, fuel: 472 },
        { month: 'Mar', trips: 200, miles: 7200, fuel: 576 },
        { month: 'Apr', trips: 185, miles: 6650, fuel: 532 },
        { month: 'May', trips: 220, miles: 7900, fuel: 632 },
        { month: 'Jun', trips: 195, miles: 7000, fuel: 560 },
        { month: 'Jul', trips: 210, miles: 7500, fuel: 600 }
      ]
    },
    'driver-performance': {
      topDrivers: [
        { name: 'Lucas Hayes', score: 95, trips: 45, miles: 1800, efficiency: 13.2 },
        { name: 'Owen Parker', score: 92, trips: 38, miles: 1650, efficiency: 12.8 },
        { name: 'Chloe Mitchell', score: 88, trips: 42, miles: 1720, efficiency: 12.1 }
      ],
      performanceMetrics: [
        { metric: 'Overspeeding', count: 23, percentage: 8.2 },
        { metric: 'Harsh Braking', count: 15, percentage: 5.4 },
        { metric: 'Idle Time Excess', count: 31, percentage: 11.1 }
      ]
    },
    'maintenance': {
      upcomingMaintenance: [
        { vehicle: 'V1234', type: 'Oil Change', dueDate: '2024-08-15', mileage: 45000 },
        { vehicle: 'V5678', type: 'Tire Rotation', dueDate: '2024-08-20', mileage: 38000 },
        { vehicle: 'V9012', type: 'Brake Inspection', dueDate: '2024-08-25', mileage: 52000 }
      ],
      maintenanceCosts: [
        { month: 'Jan', cost: 2500 },
        { month: 'Feb', cost: 1800 },
        { month: 'Mar', cost: 3200 },
        { month: 'Apr', cost: 2100 },
        { month: 'May', cost: 2800 },
        { month: 'Jun', cost: 1950 },
        { month: 'Jul', cost: 2650 }
      ]
    }
  };

  useEffect(() => {
    generateReport();
  }, [reportType, dateRange]);

  const generateReport = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReportData(mockReportData[reportType]);
      setLoading(false);
    }, 1000);
  };

  const handleExportReport = (format) => {
    console.log(`Exporting report in ${format} format`);
    // Implement export functionality
  };

  const renderFleetOverviewReport = () => (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {reportData.summary.totalVehicles}
              </Typography>
              <Typography variant="subtitle1">Total Vehicles</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {reportData.summary.activeVehicles}
              </Typography>
              <Typography variant="subtitle1">Active Vehicles</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {reportData.summary.totalTrips}
              </Typography>
              <Typography variant="subtitle1">Total Trips</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {reportData.summary.totalMiles.toLocaleString()}
              </Typography>
              <Typography variant="subtitle1">Total Miles</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Monthly Trends</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="trips" stroke="#8884d8" name="Trips" />
                <Line type="monotone" dataKey="miles" stroke="#82ca9d" name="Miles" />
                <Line type="monotone" dataKey="fuel" stroke="#ffc658" name="Fuel (Gallons)" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Vehicle Status</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.vehicleStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reportData.vehicleStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderDriverPerformanceReport = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Top Performing Drivers</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Driver Name</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Trips</TableCell>
                    <TableCell>Miles</TableCell>
                    <TableCell>Efficiency (MPG)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.topDrivers.map((driver, index) => (
                    <TableRow key={index}>
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={driver.score} 
                          color={driver.score >= 90 ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{driver.trips}</TableCell>
                      <TableCell>{driver.miles}</TableCell>
                      <TableCell>{driver.efficiency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Performance Issues</Typography>
            {reportData.performanceMetrics.map((metric, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">{metric.metric}</Typography>
                  <Typography variant="body2">{metric.count} incidents</Typography>
                </Box>
                <Box sx={{ mt: 1, p: 1, bgcolor: 'error.light', borderRadius: 1 }}>
                  <Typography variant="caption" color="error.dark">
                    {metric.percentage}% of total events
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderMaintenanceReport = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Upcoming Maintenance</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Mileage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.upcomingMaintenance.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.vehicle}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.dueDate}</TableCell>
                      <TableCell>{item.mileage.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Monthly Maintenance Costs</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.maintenanceCosts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                <Line type="monotone" dataKey="cost" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderReportContent = () => {
    if (!reportData) return null;

    switch (reportType) {
      case 'fleet-overview':
        return renderFleetOverviewReport();
      case 'driver-performance':
        return renderDriverPerformanceReport();
      case 'maintenance':
        return renderMaintenanceReport();
      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Reports & Analytics
        </Typography>

        {/* Report Configuration */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <MenuItem value="fleet-overview">Fleet Overview</MenuItem>
                  <MenuItem value="driver-performance">Driver Performance</MenuItem>
                  <MenuItem value="maintenance">Maintenance Report</MenuItem>
                  <MenuItem value="fuel-analysis">Fuel Analysis</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="Start Date"
                value={dateRange.start}
                onChange={(newValue) => setDateRange({ ...dateRange, start: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="End Date"
                value={dateRange.end}
                onChange={(newValue) => setDateRange({ ...dateRange, end: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => handleExportReport('pdf')}
                >
                  Export PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Print />}
                  onClick={() => handleExportReport('print')}
                >
                  Print
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Report Content */}
        {loading ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography>Generating report...</Typography>
          </Paper>
        ) : (
          renderReportContent()
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;
