import axios from "axios";
import React, { useEffect, useState } from "react";
import Timetable from "react-timetable-events";
import { CircularProgress } from "@mui/material";

const ViewTimeTable = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Timetable
          events={data}
          // events={{
          //   monday: [
          //     {
          //       id: 1,
          //       name: "Custom Event 1",
          //       type: "custom",
          //       startTime: new Date("2018-02-25T11:30:00"),
          //       endTime: new Date("2018-02-25T13:30:00"),
          //     },
          //     {
          //       id: 1,
          //       name: "Custom Event 2",
          //       type: "custom",
          //       startTime: new Date("2018-02-25T14:30:00"),
          //       endTime: new Date("2018-02-25T16:30:00"),
          //     },
          //   ],
          //   tuesday: [
          //     {
          //       id: 1,
          //       name: "Custom Event 1",
          //       type: "custom",
          //       startTime: new Date("2018-02-25T11:30:00"),
          //       endTime: new Date("2018-02-25T13:30:00"),
          //     },
          //   ],
          //   wednesday: [],
          //   thursday: [],
          //   friday: [],
          //   saturday: [],
          //   sunday: [],
          // }}
        />
      )}
    </>
  );
};

export default ViewTimeTable;
