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
  CircularProgress,
} from '@mui/material';
import { getSubmissions, createReview } from '../services/api';

function ReviewerPortal() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getSubmissions();
      setApplications(data); // Ensure data is set correctly
      setError('');
    } catch (error) {
      setError('Failed to fetch submissions');
      console.error('Error fetching submissions:', error);
      setApplications([]); // Clear applications on error
    } finally {
      setLoading(false);
    }
  };
  

  const handleActionClick = (app, actionType) => {
    setSelectedApp(app);
    setAction(actionType);
    setOpenDialog(true);
    setRemarks('');
    setError('');
  };

  const handleSubmit = async () => {
    if ((action === 'Reject' || action === 'Rework') && !remarks.trim()) {
      setError('Comments are required for reject/rework actions');
      return;
    }

    try {
      await createReview({
        submission_id: selectedApp.id,
        reviewer_id: localStorage.getItem('userId'),
        status: action, // "Approve", "Reject", or "Rework"
        comments: remarks
      });

      await fetchSubmissions();
      setOpenDialog(false);
      setRemarks('');
      setSelectedApp(null);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

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

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

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
  {applications.length === 0 ? (
    <TableRow>
      <TableCell colSpan={8} align="center">
        No applications found
      </TableCell>
    </TableRow>
  ) : (
    applications.map((app) => (
      <TableRow key={app.id}>
        <TableCell>{app.registration_number}</TableCell>
        <TableCell>{app.name}</TableCell>
        <TableCell>{app.department}</TableCell>
        <TableCell>{app.company_name}</TableCell>
        <TableCell>{app.offer_type}</TableCell>
        <TableCell>₹{app.stipend_amount}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleActionClick(app, 'Approve')}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleActionClick(app, 'Reject')}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => handleActionClick(app, 'Rework')}
            >
              Rework
            </Button>
          </Box>
        </TableCell>
        <TableCell>{app.status}</TableCell>
      </TableRow>
    ))
  )}
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
            required={action === 'Reject' || action === 'Rework'}
            error={Boolean(error)}
            helperText={error}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color={action === 'Approve' ? 'success' : action === 'Reject' ? 'error' : 'warning'}
          >
            Confirm {action}
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