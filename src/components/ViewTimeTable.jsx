import axios from "axios";
import React, { useState } from "react";
import Timetable from "react-timetable-events";
import { Button, CircularProgress, Grid } from "@mui/material";

const ViewTimeTable = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  const getTimeTable = () => {
    setClicked(true);
    axios
      .get("http://localhost:8000/generate-timetable")
      .then((res) => {
        let temp = {};
        for (let [key, value] of Object.entries(res.data)) {
          if (value === []) {
            temp[key] = [];
          }

          let internal_tmp = value.map((elem) => {
            let tmp = elem;
            tmp.startTime = new Date(elem.startTime);
            tmp.endTime = new Date(elem.endTime);
            return tmp;
          });
          temp[key] = internal_tmp;
        }
        setData(temp);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Button onClick={getTimeTable} variant="contained">
            Generate Time Table
          </Button>
        </Grid>
        {clicked ? (
          <>
            <Grid item xs={12} sm={12}>
              {loading ? <CircularProgress /> : <Timetable events={data} />}
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default ViewTimeTable;
