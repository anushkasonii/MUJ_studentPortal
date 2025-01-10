import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e, role) => {
    e.preventDefault();
    // Add your authentication logic here
    if (formData.username && formData.password) {
      if (role === 'reviewer') {
        navigate('/reviewer');
      } else if (role === 'hod') {
        navigate('/hod');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 8,
          backgroundColor: '#f8f9fa',
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          color="primary"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          Staff Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Username/Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />
          </Box>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={(e) => handleSubmit(e, 'hod')}
              sx={{ 
                py: 1.5,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
                }
              }}
            >
              Login as HOD
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              onClick={(e) => handleSubmit(e, 'reviewer')}
              sx={{ 
                py: 1.5,
                backgroundColor: '#2e7d32',
                '&:hover': {
                  backgroundColor: '#1b5e20'
                }
              }}
            >
              Login as Reviewer
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;