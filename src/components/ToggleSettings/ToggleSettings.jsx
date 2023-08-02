import React, { useRef, useState } from "react";
import styles from "./toggleSettings.module.css";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ToggleSettings = ({ open, setOpen, setColumn }) => {
  const [col, setcol] = useState([
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

  //save reference for dragItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _columnItems = [...col];

    //remove and save the dragged item content
    const draggedItemContent = _columnItems.splice(dragItem.current, 1)[0];

    //switch the position
    _columnItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setcol(_columnItems);
  };

  const handleKeys = (columnIndexNumber, keyName, keyValue) => {
    const newColumnData = { ...col[columnIndexNumber] };
    newColumnData[keyName] =
      (keyName === "date") | (keyName === "app_id") ? keyValue : !keyValue; // blocks from deselecting DATE OR APP_ID
    const newColumns = col.map((value) =>
      Object.keys(value)[0] === keyName ? newColumnData : value
    );
    setcol(newColumns);
  };

  const handleChange = () => {
    setColumn(col);
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <Box className={styles.dataContainer} sx={{ p: 2 }}>
          <Typography variant="subtitle2" mb={1} mx={1}>
            <strong>Dimensions and Metrics</strong>
          </Typography>
          <Box className={styles.listContainer}>
            {col.map((item, index) => (
              <Box
                key={index}
                className={styles.listItem}
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                  m: 1,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  handleKeys(
                    index,
                    Object.keys(item)[0],
                    Object.values(item)[0]
                  );
                }}
              >
                <span
                  className={styles.indicator}
                  style={{
                    backgroundColor: Object.values(item)[0]
                      ? "#116FED"
                      : "#FFFFFF",
                  }}
                ></span>
                <Typography
                  variant="subtitle2"
                  ml={8}
                  style={{ textTransform: "capitalize" }}
                >
                  {Object.keys(item)[0]}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box className={styles.buttonContainer} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={() => {
                setOpen(false);
              }}
            >
              close
            </Button>
            <Button variant="contained" onClick={handleChange}>
              apply changes
            </Button>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default ToggleSettings;
