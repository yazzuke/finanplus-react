import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';

  
const SelectorMes = ({ currentDate, setCurrentDate }) => {
 
    const previousMonth = () => {
      // Resta 1 mes a currentDate en lugar de currentMonth
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      setCurrentDate(newDate);  
  };
  
  const nextMonth = () => {
    // Suma 1 mes a currentDate en lugar de currentMonth
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
};

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long' };
      return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className="flex items-center">
      <IconButton onClick={previousMonth} style={{ borderRadius: '50%', background: 'white', padding: '0.3rem' }}>
        <ChevronLeftIcon size={20} />
      </IconButton>
      <div style={{ margin: '0 10px', fontSize: '1.5rem' }}>
        {formatDate(currentDate)}
      </div>
      <IconButton onClick={nextMonth} style={{ borderRadius: '50%', background: 'white', padding: '0.3rem' }}>
        <ChevronRightIcon size={20} />
      </IconButton>
        </div>
    );
    };

    export default SelectorMes;
