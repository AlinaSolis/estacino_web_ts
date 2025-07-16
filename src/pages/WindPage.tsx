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
    <Box sx={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          height: 60,
          bgcolor: colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <IconButton
          aria-label="menu"
          onClick={() => alert('Abrir menú (implementa navegación)')}
          sx={{ position: 'absolute', left: 15 }}
          size="large"
        >
          <Menu color={colors.white} size={28} />
        </IconButton>
        <Typography variant="h6" sx={{ color: colors.white, fontWeight: 'bold' }}>
          Datos del Viento
        </Typography>
      </Box>

      {/* Contenido */}
      <Box sx={{ p: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              bgcolor: colors.white,
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              mb: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Fecha inicial */}
            <Box sx={{ flex: 1, minWidth: 150, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: colors.textDark, fontWeight: 600 }}>
                Fecha inicial
              </Typography>
              <Button
                variant="outlined"
                startIcon={<CalendarTodayIcon />}
                onClick={(e) => handleOpenPicker(e, 'start')}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                {formatDate(startDate)}
                <CalendarTodayIcon fontSize="small" />
              </Button>
            </Box>

            {/* Separador */}
            <Divider orientation="vertical" flexItem />

            {/* Fecha final */}
            <Box sx={{ flex: 1, minWidth: 150, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: colors.textDark, fontWeight: 600 }}>
                Fecha final
              </Typography>
              <Button
                variant="outlined"
                startIcon={<CalendarTodayIcon />}
                onClick={(e) => handleOpenPicker(e, 'end')}
                sx={{ width: '100%', justifyContent: 'space-between' }}
              >
                {formatDate(endDate)}
                <CalendarTodayIcon fontSize="small" />
              </Button>
            </Box>

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
          </Box>
        </LocalizationProvider>

        {/* Botón consultar */}
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{
            bgcolor: colors.primary,
            color: colors.white,
            fontWeight: 'bold',
            width: '100%',
            mb: 2,
            '&:hover': { bgcolor: '#065642' },
          }}
        >
          Consultar Datos
        </Button>

        {/* Resultados o estado vacío */}
        {showResults ? (
          <>
            {/* Gráfico */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: colors.white,
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{ textAlign: 'center', mb: 2, fontWeight: 600, color: colors.textDark }}
              >
                Velocidad del Viento (km/h)
              </Typography>
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
            </Paper>

            {/* Tabla resumen */}
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: colors.white, width: '92%', mx: 'auto' }}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  mb: 2,
                  fontWeight: 600,
                  color: colors.textDark,
                  bgcolor: colors.primaryLight,
                  p: 1,
                  borderRadius: 1,
                }}
              >
                Resumen de Datos Registrados
              </Typography>
              <Box sx={{ display: 'flex', bgcolor: colors.primary, color: 'white', p: 1, borderRadius: 1 }}>
                <Typography sx={{ flex: 2, textAlign: 'center', fontWeight: 'bold' }}>
                  Fecha y Hora
                </Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                  Vel (km/h)
                </Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                  Dir
                </Typography>
                <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                  Ráfaga
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 5,
                  textAlign: 'center',
                  color: colors.gray,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <HourglassEmptyIcon sx={{ fontSize: 40 }} />
                <Typography>Cargando datos del viento...</Typography>
              </Box>
            </Paper>
          </>
        ) : (
          <Box
            sx={{
              p: 5,
              mt: 6,
              textAlign: 'center',
              color: colors.gray,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <AirIcon sx={{ fontSize: 60 }} />
            <Typography sx={{ fontSize: 18, maxWidth: 400 }}>
              Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información del viento.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WindScreen;
