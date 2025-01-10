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
} from '@mui/material';

function HodPortal() {
  const [applications, setApplications] = useState([
    // Sample data - replace with actual API call
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

  const handleAction = (action) => {
    // Handle application action (approve/reject)
    console.log(`Application ${selectedApp.id} ${action} with remarks: ${remarks}`);
    setOpenDialog(false);
    setRemarks('');
    setSelectedApp(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          HOD Portal
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Registration No.</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Reviewer Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.registrationNumber}</TableCell>
                  <TableCell>{app.studentName}</TableCell>
                  <TableCell>{app.department}</TableCell>
                  <TableCell>{app.companyName}</TableCell>
                  <TableCell>{app.reviewerApproval}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSelectedApp(app);
                        setOpenDialog(true);
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Review Application</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAction('approve')} color="primary">
            Approve
          </Button>
          <Button onClick={() => handleAction('reject')} color="error">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default HodPortal;