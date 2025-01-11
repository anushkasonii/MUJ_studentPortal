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

function HodPortal() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      registrationNumber: '12345',
      department: 'CSE',
      companyName: 'Tech Corp',
      reviewerApproval: 'approved',
      status: 'pending_hod',
    },
  ]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  const handleAction = (action) => {
    if (action === 'reject' && !remarks.trim()) {
      setError('Comments are required for rejection');
      return;
    }

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
          HOD Portal - Application Review
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reg. No.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reviewer Status</TableCell>
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
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: app.reviewerApproval === 'approved' ? '#4caf50' : '#f44336',
                        color: 'white',
                        py: 0.5,
                        px: 1.5,
                        borderRadius: 1,
                        display: 'inline-block',
                      }}
                    >
                      {app.reviewerApproval.toUpperCase()}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSelectedApp(app);
                        setOpenDialog(true);
                        setError('');
                      }}
                      sx={{ mr: 1 }}
                    >
                      Review
                    </Button>
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
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{ mt: 2 }}
            error={error !== ''}
            helperText={error}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
          <Button 
            onClick={() => handleAction('approve')} 
            variant="contained" 
            color="success"
          >
            Approve
          </Button>
          <Button 
            onClick={() => handleAction('reject')} 
            variant="contained" 
            color="error"
          >
            Reject
          </Button>
          <Button 
            onClick={() => setOpenDialog(false)} 
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default HodPortal;