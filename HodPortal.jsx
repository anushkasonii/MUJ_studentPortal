import { useState, useEffect } from 'react';
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

function HodPortal() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [action, setAction] = useState('');

  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    const acceptedApplications = storedApplications.filter(app => app.status === 'accepted');
    setApplications(acceptedApplications);
  }, []);

  const handleAction = (app, actionType) => {
    setSelectedApp(app);
    setAction(actionType);
    setOpenDialog(true);
    setError('');
  };

  const handleSubmit = () => {
    if (action === 'reject' && !remarks.trim()) {
      setError('Comments are required for rejection');
      return;
    }

    const updatedApplications = applications.map(app =>
      app.id === selectedApp.id
        ? { ...app, hodStatus: action, hodRemarks: remarks }
        : app
    );

    setApplications(updatedApplications);
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
          HOD Portal - Application Review
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
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleAction(app, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleAction(app, 'reject')}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    backgroundColor: app.hodStatus === 'accept' ? '#e8f5e9' : 
                                   app.hodStatus === 'reject' ? '#ffebee' : 
                                   'transparent',
                    color: app.hodStatus === 'accept' ? '#2e7d32' :
                          app.hodStatus === 'reject' ? '#d32f2f' :
                          'inherit',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {app.hodStatus || ''}
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
            required={action === 'reject'}
            error={error !== ''}
            helperText={error}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color={action === 'accept' ? 'success' : 'error'}
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

export default HodPortal;