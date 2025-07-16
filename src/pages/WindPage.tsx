import React, { useState } from 'react';

// Componentes UI
import {
  Box,
  Typography,
  Button,
  Popover,
  Paper,
  IconButton,
  Divider,
} from '@mui/material';

// Iconos
import { Menu } from 'lucide-react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AirIcon from '@mui/icons-material/Air';

// Chart.js
import {
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Date Picker MUI
import {
  LocalizationProvider
} from '@mui/x-date-pickers/LocalizationProvider';
import {
  AdapterDateFns
} from '@mui/x-date-pickers/AdapterDateFns';
import {
  DatePicker
} from '@mui/x-date-pickers/DatePicker';
import {
  es
} from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = {
  primary: '#0A7764',
  primaryLight: 'rgba(10, 119, 100, 0.1)',
  secondary: '#D78909',
  white: '#FFFFFF',
  background: '#F5F5F5',
  textDark: '#333333',
  border: 'rgba(0, 0, 0, 0.1)',
  gray: '#888888',
};

const WindScreen = () => {
  // Estados
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end'>('start');
  const [showResults, setShowResults] = useState(false);
  const [timeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Abrir popover con el datepicker
  const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>, pickerType: 'start' | 'end') => {
    setCurrentPicker(pickerType);
    setAnchorEl(event.currentTarget);
  };
  // Cerrar popover
  const handleClosePicker = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'date-picker-popover' : undefined;

  // Formato fecha para mostrar
  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Manejo de cambio de fechas
  const onDateChange = (newValue: Date | null) => {
    if (!newValue) return;
    if (currentPicker === 'start') {
      setStartDate(newValue);
      if (endDate < newValue) setEndDate(newValue);
    } else {
      setEndDate(newValue);
    }
    handleClosePicker();
  };

  // Validar y mostrar resultados
  const handleSearch = () => {
    if (startDate > endDate) {
      alert('Error de Fechas: La fecha final debe ser posterior o igual a la fecha inicial.');
      return;
    }
    setShowResults(true);
  };

  // Datos simulados para gráfico de viento
  const generateWindData = () => {
    switch (timeRange) {
      case 'day':
        return {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
          datasets: [{
            label: 'Velocidad',
            data: [8, 7, 12, 15, 18, 14, 10, 9, 8],
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
            fill: true,
            tension: 0.4,
          }],
        };
      case 'week':
        return {
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
          datasets: [{
            label: 'Velocidad',
            data: [10, 12, 15, 14, 13, 11, 9],
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
            fill: true,
            tension: 0.4,
          }],
        };
      case 'month':
        return {
          labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
          datasets: [{
            label: 'Velocidad',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 5),
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
            fill: true,
            tension: 0.4,
          }],
        };
      case 'year':
      default:
        return {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: 'Velocidad',
            data: [10, 12, 15, 14, 13, 11, 9, 8, 10, 12, 14, 16],
            borderColor: colors.primary,
            backgroundColor: colors.primaryLight,
            fill: true,
            tension: 0.4,
          }],
        };
    }
  };

  const windData = generateWindData();

  return (
    <div className="container">
      <div className="content">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <div className="controlsContainer">
            {/* Fecha inicial */}
            <div className="datePickerContainer">
              <label className="dateLabel">
                Fecha inicial
              </label>
              <button
                className="dateButton"
                onClick={(e) => handleOpenPicker(e, 'start')}
              >
                <CalendarTodayIcon />
                <span className="dateText">
                {formatDate(startDate)}
                </span>
                <CalendarTodayIcon fontSize="small" />
              </button>
            </div>

            {/* Separador */}
            <div className="separator" />

            {/* Fecha final */}
            <div className="datePickerContainer">
              <label className="dateLabel">
                Fecha final
              </label>
              <button
                className="dateButton"
                onClick={(e) => handleOpenPicker(e, 'end')}
              >
                <CalendarTodayIcon />
                <span className="dateText">
                {formatDate(endDate)}
                </span>
                <CalendarTodayIcon fontSize="small" />
              </button>
            </div>

            {/* Popover con DatePicker */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePicker}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  p: 1,
                },
              }}
            >
              <DatePicker
                value={currentPicker === 'start' ? startDate : endDate}
                onChange={onDateChange}
                maxDate={new Date()}
                minDate={currentPicker === 'end' ? startDate : undefined}
                disableFuture
                slotProps={{
                  textField: {
                    sx: { p: 1 },
                    fullWidth: true,
                  }
                }}
              />
            </Popover>
          </div>
        </LocalizationProvider>

        {/* Botón consultar */}
        <button
          className="searchButton"
          onClick={handleSearch}
        >
          <SearchIcon />
          Consultar Datos
        </button>

        {/* Resultados o estado vacío */}
        {showResults ? (
          <>
            {/* Gráfico */}
            <div className="chartContainer">
              <h3 className="chartTitle">
                Velocidad del Viento (km/h)
              </h3>
              <Line data={windData} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }} />
            </div>

            {/* Tabla resumen */}
            <div className="tableContainer">
              <h3 className="tableTitle">
                Resumen de Datos Registrados
              </h3>
              <div className="tableHeader">
                <span className="headerText flex2">
                  Fecha y Hora
                </span>
                <span className="headerText">
                  Vel (km/h)
                </span>
                <span className="headerText">
                  Dir
                </span>
                <span className="headerText">
                  Ráfaga
                </span>
              </div>
              <div className="tableEmptyBody">
                <HourglassEmptyIcon style={{ fontSize: 40 }} />
                <p className="emptyTableText">Cargando datos del viento...</p>
              </div>
            </div>
          </>
        ) : (
          <div className="emptyState">
            <AirIcon style={{ fontSize: 60 }} />
            <p className="emptyText">
              Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información del viento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WindScreen;
