import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Chip,
  Container,
  Paper,
  Grid,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
  Button,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AddCircleOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";

const AddConstraints = () => {
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [startMondayHour, setStartMondayHour] = useState(new Date());
  const [endMondayHour, setEndMondayHour] = useState(new Date());
  const [startTuesdayHour, setStartTuesdayHour] = useState(new Date());
  const [endTuesdayHour, setEndTuesdayHour] = useState(new Date());
  const [startWednesdayHour, setStartWednesdayHour] = useState(new Date());
  const [endWednesdayHour, setEndWednesdayHour] = useState(new Date());
  const [endThursdayHour, setEndThursdayHour] = useState(new Date());
  const [startThursdayHour, setStartThursdayHour] = useState(new Date());
  const [endFridayHour, setEndFridayHour] = useState(new Date());
  const [startFridayHour, setStartFridayHour] = useState(new Date());
  const [endSaturdayHour, setEndSaturdayHour] = useState(new Date());
  const [startSaturdayHour, setStartSaturdayHour] = useState(new Date());
  const [endSundayHour, setEndSundayHour] = useState(new Date());
  const [startSundayHour, setStartSundayHour] = useState(new Date());
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [nsub1, setnSub1] = useState("");
  const [nsub2, setnSub2] = useState("");

  const handleMondayStart = (newValue) => {
    setStartMondayHour(newValue);
  };

  const handleMondayEnd = (newValue) => {
    setEndMondayHour(newValue);
  };

  const handleTuesdayStart = (newValue) => {
    setStartTuesdayHour(newValue);
  };

  const handleTuesdayEnd = (newValue) => {
    setEndTuesdayHour(newValue);
  };

  const handleWednesdayStart = (newValue) => {
    setStartWednesdayHour(newValue);
  };

  const handleWednesdayEnd = (newValue) => {
    setEndWednesdayHour(newValue);
  };

  const handleThursdayStart = (newValue) => {
    setStartThursdayHour(newValue);
  };

  const handleThursdayEnd = (newValue) => {
    setEndThursdayHour(newValue);
  };

  const handleFridayStart = (newValue) => {
    setStartFridayHour(newValue);
  };

  const handleFridayEnd = (newValue) => {
    setEndFridayHour(newValue);
  };

  const handleSaturdayStart = (newValue) => {
    setStartSaturdayHour(newValue);
  };

  const handleSaturdayEnd = (newValue) => {
    setEndSaturdayHour(newValue);
  };

  const handleSundayStart = (newValue) => {
    setStartSundayHour(newValue);
  };

  const handleSundayEnd = (newValue) => {
    setEndSundayHour(newValue);
  };

  const handleSubmit = () => {
    var working_days = [];
    if (monday) {
      working_days.push({
        day: "Monday",
        start_hr: startMondayHour.getHours(),
        end_hr: endMondayHour.getHours(),
        total_hours:
          parseInt(endMondayHour.getHours()) -
          parseInt(startMondayHour.getHours()),
      });
    }
    if (tuesday) {
      working_days.push({
        day: "Tuesday",
        start_hr: startTuesdayHour.getHours(),
        end_hr: endTuesdayHour.getHours(),
        total_hours:
          parseInt(endTuesdayHour.getHours()) -
          parseInt(startTuesdayHour.getHours()),
      });
    }
    if (wednesday) {
      working_days.push({
        day: "Wednesday",
        start_hr: startWednesdayHour.getHours(),
        end_hr: endWednesdayHour.getHours(),
        total_hours:
          parseInt(endWednesdayHour.getHours()) -
          parseInt(startWednesdayHour.getHours()),
      });
    }
    if (thursday) {
      working_days.push({
        day: "Thursday",
        start_hr: startThursdayHour.getHours(),
        end_hr: endThursdayHour.getHours(),
        total_hours:
          parseInt(endThursdayHour.getHours()) -
          parseInt(startThursdayHour.getHours()),
      });
    }
    if (friday) {
      working_days.push({
        day: "Friday",
        start_hr: startFridayHour.getHours(),
        end_hr: endFridayHour.getHours(),
        total_hours:
          parseInt(endFridayHour.getHours()) -
          parseInt(startFridayHour.getHours()),
      });
    }
    if (saturday) {
      working_days.push({
        day: "Saturday",
        start_hr: startSaturdayHour.getHours(),
        end_hr: endSaturdayHour.getHours(),
        total_hours:
          parseInt(endSaturdayHour.getHours()) -
          parseInt(startSaturdayHour.getHours()),
      });
    }
    if (sunday) {
      working_days.push({
        day: "Sunday",
        start_hr: startSundayHour.getHours(),
        end_hr: endSundayHour.getHours(),
        total_hours:
          parseInt(endSundayHour.getHours()) -
          parseInt(startSundayHour.getHours()),
      });
    }

    var consecutive_subjects = [sub1, sub2];
    var non_consecutive_subjects = [nsub1, nsub2];
    var body = {
      working_days: working_days,
      consecutive_subjects: consecutive_subjects,
      non_consecutive_subjects: non_consecutive_subjects,
    };
    console.log(body);
    axios
      .post("http://localhost:8000/add-constraints", body)
      .then(() => {
        Swal.fire({
          text: "Constraints added successfully!",
          icon: "success",
        });
        setMonday(false);
        setTuesday(false);
        setWednesday(false);
        setThursday(false);
        setFriday(false);
        setSaturday(false);
        setSunday(false);
        setStartMondayHour(new Date());
        setEndMondayHour(new Date());
        setStartTuesdayHour(new Date());
        setEndTuesdayHour(new Date());
        setStartWednesdayHour(new Date());
        setEndWednesdayHour(new Date());
        setEndThursdayHour(new Date());
        setStartThursdayHour(new Date());
        setEndFridayHour(new Date());
        setStartFridayHour(new Date());
        setEndSaturdayHour(new Date());
        setStartSaturdayHour(new Date());
        setEndSundayHour(new Date());
        setStartSundayHour(new Date());
        setCheckedA(false);
        setCheckedB(false);
        setSub1("");
        setSub2("");
        setnSub1("");
        setnSub2("");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios.get("http://localhost:8000/get-courses").then((res) => {
      setData(res.data);
      setLoading(false);
      var temp_subjects = [];
      res.data.map((item) => {
        temp_subjects.push({ label: item.name, value: item.name });
      });
      setSubjects(temp_subjects);
    });
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <center>
                <Typography variant="h6" gutterBottom>
                  Time Table Details
                </Typography>
              </center>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    {monday ? (
                      <Chip
                        label="Monday"
                        color="primary"
                        onClick={() => setMonday(!monday)}
                      />
                    ) : (
                      <Chip
                        label="Monday"
                        color="primary"
                        variant="outlined"
                        onClick={() => setMonday(!monday)}
                      />
                    )}
                    {tuesday ? (
                      <Chip
                        label="Tuesday"
                        color="primary"
                        onClick={() => setTuesday(!tuesday)}
                      />
                    ) : (
                      <Chip
                        label="Tuesday"
                        color="primary"
                        variant="outlined"
                        onClick={() => setTuesday(!tuesday)}
                      />
                    )}
                    {wednesday ? (
                      <Chip
                        label="Wednesday"
                        color="primary"
                        onClick={() => setWednesday(!wednesday)}
                      />
                    ) : (
                      <Chip
                        label="Wednesday"
                        color="primary"
                        variant="outlined"
                        onClick={() => setWednesday(!wednesday)}
                      />
                    )}
                    {thursday ? (
                      <Chip
                        label="Thursday"
                        color="primary"
                        onClick={() => setThursday(!thursday)}
                      />
                    ) : (
                      <Chip
                        label="Thursday"
                        color="primary"
                        variant="outlined"
                        onClick={() => setThursday(!thursday)}
                      />
                    )}
                    {friday ? (
                      <Chip
                        label="Friday"
                        color="primary"
                        onClick={() => setFriday(!friday)}
                      />
                    ) : (
                      <Chip
                        label="Friday"
                        color="primary"
                        variant="outlined"
                        onClick={() => setFriday(!friday)}
                      />
                    )}
                    {saturday ? (
                      <Chip
                        label="Saturday"
                        color="primary"
                        onClick={() => setSaturday(!saturday)}
                      />
                    ) : (
                      <Chip
                        label="Saturday"
                        color="primary"
                        variant="outlined"
                        onClick={() => setSaturday(!saturday)}
                      />
                    )}
                    {sunday ? (
                      <Chip
                        label="Sunday"
                        color="primary"
                        onClick={() => setSunday(!sunday)}
                      />
                    ) : (
                      <Chip
                        label="Sunday"
                        color="primary"
                        variant="outlined"
                        onClick={() => setSunday(!sunday)}
                      />
                    )}
                  </Stack>
                </Grid>
                {monday ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Start Hour"
                          value={startMondayHour}
                          onChange={handleMondayStart}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Monday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="End Hour"
                          value={endMondayHour}
                          onChange={handleMondayEnd}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Monday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : null}
                {tuesday ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Start Hour"
                          value={startTuesdayHour}
                          onChange={handleTuesdayStart}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Tuesday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="End Hour"
                          value={endTuesdayHour}
                          onChange={handleTuesdayEnd}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Tuesday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : null}
                {wednesday ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Start Hour"
                          value={startWednesdayHour}
                          onChange={handleWednesdayStart}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Wednesday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="End Hour"
                          value={endWednesdayHour}
                          onChange={handleWednesdayEnd}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Wednesday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : null}
                {thursday ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Start Hour"
                          value={startThursdayHour}
                          onChange={handleThursdayStart}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Thursday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="End Hour"
                          value={endThursdayHour}
                          onChange={handleThursdayEnd}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Thursday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : null}
                {friday ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Start Hour"
                          value={startFridayHour}
                          onChange={handleFridayStart}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Friday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="End Hour"
                          value={endFridayHour}
                          onChange={handleFridayEnd}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Friday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : null}
                {saturday ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Start Hour"
                          value={startSaturdayHour}
                          onChange={handleSaturdayStart}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Saturday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="End Hour"
                          value={endSaturdayHour}
                          onChange={handleSaturdayEnd}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Saturday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : null}
                {sunday ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Start Hour"
                          value={startSundayHour}
                          onChange={handleSundayStart}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Sunday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="End Hour"
                          value={endSundayHour}
                          onChange={handleSundayEnd}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText="Sunday Working Hours"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <center>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedA}
                            onChange={() => setCheckedA(!checkedA)}
                          />
                        }
                        label="Two subjects which cannot be consecutive"
                      />
                    </center>
                  </FormGroup>
                </Grid>
                {checkedA ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        disablePortal
                        options={subjects}
                        value={nsub1}
                        onInputChange={(event, value) => setnSub1(value)}
                        renderInput={(params) => (
                          <TextField {...params} label="Subject 1" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        disablePortal
                        options={subjects}
                        value={nsub2}
                        onInputChange={(event, value) => setnSub2(value)}
                        renderInput={(params) => (
                          <TextField {...params} label="Subject 2" />
                        )}
                      />
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <center>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedB}
                            onChange={() => setCheckedB(!checkedB)}
                          />
                        }
                        label="Two subjects which have to be consecutive"
                      />
                    </center>
                  </FormGroup>
                </Grid>
                {checkedB ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        disablePortal
                        options={subjects}
                        value={sub1}
                        onInputChange={(event, value) => setSub1(value)}
                        renderInput={(params) => (
                          <TextField {...params} label="Subject 1" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        disablePortal
                        options={subjects}
                        value={sub2}
                        onInputChange={(event, value) => setSub2(value)}
                        renderInput={(params) => (
                          <TextField {...params} label="Subject 2" />
                        )}
                      />
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <Button
                  color="primary"
                  startIcon={<AddCircleOutlined />}
                  variant="outlined"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Add Constraints
                </Button>
              </Grid>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
};

export default AddConstraints;
