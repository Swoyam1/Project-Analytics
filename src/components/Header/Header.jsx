import { Box, Button, Typography } from "@mui/material";
import { DateRangePicker } from "rsuite";
import styles from "./header.module.css";
import "rsuite/dist/rsuite.min.css";

const Header = ({ open, setOpen, dateRange, setDateRange }) => {
  const { allowedRange } = DateRangePicker;
  return (
    <>
      <Box>
        <Typography variant="h6" my={2}>
          <h3>Analytics</h3>
        </Typography>
        <Box className={styles.container} sx={{ my: 2 }}>
          <DateRangePicker
            cleanable={false}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select Date Range"
            shouldDisableDate={allowedRange("2021-05-01", "2021-06-31")}
            defaultCalendarValue={[
              new Date("2021-05-01 01:00:00"),
              new Date("2021-05-05 14:00:00"),
            ]}
          />
          <Box className={styles.settings} sx={{ p: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(true);
              }}
            >
              Settings
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
