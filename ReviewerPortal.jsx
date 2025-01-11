import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
} from '@mui/material';

function ReviewerPortal() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      registrationNumber: '12345',
      department: 'CSE',
      companyName: 'Tech Corp',
      offerType: 'On-Campus',
      stipend: '30000',
      startDate: '2024-06-01',
      status: '',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      registrationNumber: '12346',
      department: 'ECE',
      companyName: 'Digital Solutions',
      offerType: 'Off-Campus',
      stipend: '35000',
      startDate: '2024-06-15',
      status: '',
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      registrationNumber: '12347',
      department: 'IT',
      companyName: 'Software Inc',
      offerType: 'On-Campus',
      stipend: '40000',
      startDate: '2024-07-01',
      status: '',
    },
    {
      id: 4,
      studentName: 'Sarah Williams',
      registrationNumber: '12348',
      department: 'CSE',
      companyName: 'Cloud Systems',
      offerType: 'Off-Campus',
      stipend: '45000',
      startDate: '2024-07-15',
      status: '',
    },
    {
      id: 5,
      studentName: 'Robert Brown',
      registrationNumber: '12349',
      department: 'ECE',
      companyName: 'Tech Solutions',
      offerType: 'On-Campus',
      stipend: '38000',
      startDate: '2024-06-30',
      status: '',
    },
  ]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [action, setAction] = useState('');

  const handleActionClick = (app, actionType) => {
    setSelectedApp(app);
    setAction(actionType);
    setOpenDialog(true);
    setRemarks('');
    setError('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return '#e8f5e9';
      case 'rejected':
        return '#ffebee';
      case 'rework':
        return '#fff3e0';
      default:
        return 'transparent';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'accepted':
        return '#2e7d32';
      case 'rejected':
        return '#d32f2f';
      case 'rework':
        return '#ed6c02';
      default:
        return 'inherit';
    }
  };

  const handleSubmit = () => {
    if ((action === 'reject' || action === 'rework') && !remarks.trim()) {
      setError('Comments are required for reject/rework actions');
      return;
    }

    const updatedApplications = applications.map(app =>
      app.id === selectedApp.id
        ? { ...app, status: action, remarks: remarks }
        : app
    );

    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    setOpenDialog(false);
    setRemarks('');
    setSelectedApp(null);
    setError('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          color="primary"
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Reviewer Portal - Student Applications
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1e4c90' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reg. No.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Offer Type</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stipend</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.registrationNumber}</TableCell>
                  <TableCell>{app.studentName}</TableCell>
                  <TableCell>{app.department}</TableCell>
                  <TableCell>{app.companyName}</TableCell>
                  <TableCell>{app.offerType}</TableCell>
                  <TableCell>₹{app.stipend}</TableCell>
                  <TableCell>{new Date(app.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleActionClick(app, 'accepted')}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleActionClick(app, 'rejected')}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => handleActionClick(app, 'rework')}
                      >
                        Rework
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    backgroundColor: getStatusColor(app.status),
                    color: getStatusTextColor(app.status),
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {app.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          Review Application
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Comments"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            required={action === 'rejected' || action === 'rework'}
            error={error !== ''}
            helperText={error}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color={action === 'accepted' ? 'success' : action === 'rejected' ? 'error' : 'warning'}
          >
            Confirm
          </Button>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ReviewerPortal;