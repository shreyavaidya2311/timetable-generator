import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AddCircleOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";

const AddCourses = () => {
  const [name, setName] = useState("");
  const [lecturesno, setLecturesNo] = useState(0);
  const [duration, setDuration] = useState(0);
  const [iname, setIName] = useState("");
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  const handleStart = (newValue) => {
    setStartHour(newValue);
  };
  const handleEnd = (newValue) => {
    setEndHour(newValue);
  };

  const handleSubmit = () => {
    if (name === "" || lecturesno === 0 || duration === 0 || iname === "") {
      Swal.fire({
        text: "Enter all values!",
        icon: "error",
      });
    } else {
      var body = {
        name: name,
        lectureno: lecturesno,
        duration: duration,
        instructor_name: iname,
        start_hr: startHour.getHours(),
        end_hr: endHour.getHours(),
      };
      axios
        .post("http://localhost:8000/add-course", body)
        .then(() => {
          Swal.fire({
            text: "Course registered successfully!",
            icon: "success",
          });
          setName("");
          setDuration(0);
          setLecturesNo(0);
          setIName("");
          setStartHour(new Date());
          setEndHour(new Date());
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <center>
            <Typography variant="h6" gutterBottom>
              Course Details
            </Typography>
          </center>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="name"
                name="name"
                label="Name of Course"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lecturesno"
                name="lecturesno"
                label="Number of Lectures"
                type="number"
                fullWidth
                variant="standard"
                helperText="per week"
                value={lecturesno}
                onChange={(e) => setLecturesNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="duration"
                name="duration"
                label="Duration of Lecture"
                type="number"
                fullWidth
                variant="standard"
                helperText="in hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="iname"
                name="iname"
                label="Name of Instructor"
                type="text"
                fullWidth
                variant="standard"
                value={iname}
                onChange={(e) => setIName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Start Hour"
                  value={startHour}
                  onChange={handleStart}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText="Instructor Working Hours"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="End Hour"
                  value={endHour}
                  onChange={handleEnd}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText="Instructor Working Hours"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                color="primary"
                startIcon={<AddCircleOutlined />}
                variant="outlined"
                fullWidth
                onClick={handleSubmit}
              >
                Add Course
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AddCourses;
