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
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';

function ReviewerPortal() {
  const [applications, setApplications] = useState([
    // Sample data - replace with actual API call
    {
      id: 1,
      studentName: 'John Doe',
      registrationNumber: '12345',
      department: 'CSE',
      companyName: 'Tech Corp',
      offerType: 'On-Campus',
      stipend: '30000',
      startDate: '2024-06-01',
      status: 'pending',
    },
    // Add more sample data as needed
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

  const handleSubmit = () => {
    if ((action === 'reject' || action === 'rework') && !remarks.trim()) {
      setError('Comments are required for reject/rework actions');
      return;
    }

    // Handle application action
    console.log(`Application ${selectedApp.id} ${action} with remarks: ${remarks}`);
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
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reg. No.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Offer Type</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stipend</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow 
                  key={app.id}
                  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{app.registrationNumber}</TableCell>
                  <TableCell>{app.studentName}</TableCell>
                  <TableCell>{app.department}</TableCell>
                  <TableCell>{app.companyName}</TableCell>
                  <TableCell>{app.offerType}</TableCell>
                  <TableCell>₹{app.stipend}</TableCell>
                  <TableCell>{new Date(app.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Accept">
                        <IconButton
                          color="success"
                          onClick={() => handleActionClick(app, 'accept')}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton
                          color="error"
                          onClick={() => handleActionClick(app, 'reject')}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Rework">
                        <IconButton
                          color="warning"
                          onClick={() => handleActionClick(app, 'rework')}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Details">
                        <IconButton
                          color="primary"
                          onClick={() => handleActionClick(app, 'view')}
                        >
                          <CommentIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
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
          {action === 'view' ? 'Application Details' : 'Review Application'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {action === 'view' && selectedApp && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Student Name:</strong> {selectedApp.studentName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Registration Number:</strong> {selectedApp.registrationNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Department:</strong> {selectedApp.department}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Company:</strong> {selectedApp.companyName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Offer Type:</strong> {selectedApp.offerType}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Stipend:</strong> ₹{selectedApp.stipend}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Start Date:</strong> {new Date(selectedApp.startDate).toLocaleDateString()}
              </Typography>
            </Box>
          )}
          {action !== 'view' && (
            <TextField
              fullWidth
              label="Comments"
              multiline
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required={action === 'reject' || action === 'rework'}
              error={error !== ''}
              helperText={error}
              sx={{ mt: 1 }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
          {action !== 'view' && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color={action === 'accept' ? 'success' : action === 'reject' ? 'error' : 'warning'}
            >
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </Button>
          )}
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ReviewerPortal;