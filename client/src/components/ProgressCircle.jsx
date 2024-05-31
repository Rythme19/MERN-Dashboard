import React from 'react';
import { Box, useTheme } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { tokens } from '../theme';

const ProgressCircle = ({ value = 75, unit = '°C', size = 100 }) => { // Default size increased
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <CircularProgressbar
        value={value}
        text={`${value}${unit}`}
        styles={buildStyles({
          textColor: colors.primary[400],
          pathColor: colors.blueAccent[500],
          trailColor: colors.greenAccent[500],
          textSize: '18px', // Increased text size
        })}
      />
    </Box>
  );
};

export default ProgressCircle;
