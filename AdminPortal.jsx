import { useState, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { getHods, getSpcs, createHod, createSpc } from "../services/api";

function AdminPortal() {
  const [hods, setHods] = useState([]);
  const [spcs, setSpcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "hod" or "spc"
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedHods = await getHods();
      const fetchedSpcs = await getSpcs();
      setHods(fetchedHods);
      setSpcs(fetchedSpcs);
      setError("");
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
    setFormData({ name: "", email: "" });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType("");
    setFormData({ name: "", email: "" });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError("Please fill all fields");
      return;
    }
    try {
      if (dialogType === "hod") {
        await createHod(formData);
      } else if (dialogType === "spc") {
        await createSpc(formData);
      }
      fetchData(); // Refresh data
      handleCloseDialog();
    } catch (err) {
      setError("Failed to create entry");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: "bold", color: "#d05c24", textAlign: "center" }}
          >
            Admin Portal
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* HODs Table */}
          <Typography variant="h5" sx={{ mb: 2, color: "#d05c24" }}>
            List of HODs
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#D97C4F" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hods.map((hod) => (
                  <TableRow key={hod.id}>
                    <TableCell>{hod.name}</TableCell>
                    <TableCell>{hod.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            sx={{
              mb: 4,
              backgroundColor: "#d05c24",
              color: "white",
              "&:hover": { backgroundColor: "#bf4e1f" },
            }}
            onClick={() => handleOpenDialog("hod")}
          >
            Add HOD
          </Button>

          {/* SPCs Table */}
          <Typography variant="h5" sx={{ mb: 2, color: "#d05c24" }}>
            List of SPCs
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#D97C4F" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {spcs.map((spc) => (
                  <TableRow key={spc.id}>
                    <TableCell>{spc.name}</TableCell>
                    <TableCell>{spc.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: "#d05c24",
              color: "white",
              "&:hover": { backgroundColor: "#bf4e1f" },
            }}
            onClick={() => handleOpenDialog("spc")}
          >
            Add SPC
          </Button>
        </Paper>

        {/* Dialog for Adding HOD/SPC */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle
            sx={{
              backgroundColor: "#d05c24",
              color: "white",
              textAlign: "center",
            }}
          >
            Add {dialogType === "hod" ? "HOD" : "SPC"}
          </DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#d05c24", color: "white" }}>
              Submit
            </Button>
            <Button onClick={handleCloseDialog} variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default AdminPortal;
