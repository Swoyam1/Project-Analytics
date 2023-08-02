import React, { useState } from "react";
import Header from "../components/Header/Header";
import ToggleSettings from "../components/ToggleSettings/ToggleSettings";
import LeftBar from "../components/LeftBar/LeftBar";
import Table from "../components/Table/Table";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const Analytics = () => {
  const [open, setOpen] = useState(false);
  const [column, setColumn] = useState([
    { date: true },
    { app_id: true },
    { clicks: true },
    { requests: true },
    { responses: true },
    { impressions: true },
    { revenue: true },
    { fill_rate: true },
    { CTR: true },
  ]);

  const [dateRange, setDateRange] = useState([
    new Date("2021-05-01 01:00:00"),
    new Date("2021-05-05 14:00:00"),
  ]);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={0.5}>
            <LeftBar />
          </Grid>
          <Grid item xs={11.5}>
            <Box sx={{ m: 3 }}>
              <Header
                setOpen={setOpen}
                open={open}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <ToggleSettings
                open={open}
                setOpen={setOpen}
                column={column}
                setColumn={setColumn}
              />
              <Table column={column} dateRange={dateRange} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Analytics;
