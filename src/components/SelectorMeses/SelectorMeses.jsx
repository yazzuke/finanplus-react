import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';


const SelectorMes = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
  
    const previousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };
  
    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
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
        {formatDate(currentMonth)}
      </div>
      <IconButton onClick={nextMonth} style={{ borderRadius: '50%', background: 'white', padding: '0.3rem' }}>
        <ChevronRightIcon size={20} />
      </IconButton>
        </div>
    );
    };

    export default SelectorMes;
