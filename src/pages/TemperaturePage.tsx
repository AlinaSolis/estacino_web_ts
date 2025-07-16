import React, { useState } from 'react';
import { Menu, Thermometer } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Popover } from '@mui/material';
import { es } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './CSS/TemperaturePage.css'; 

const colors = {
  primary: '#D78909',
  primaryLight: 'rgba(215, 137, 9, 0.1)',
  white: '#FFFFFF',
  background: '#F5F5F5',
  textDark: '#333333',
  border: 'rgba(0, 0, 0, 0.1)',
  gray: '#888888',
};

const TemperaturePage = () => {
  // Estados
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end'>('start');
  const [showResults, setShowResults] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Abrir/ cerrar picker
  const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>, pickerType: 'start' | 'end') => {
    setCurrentPicker(pickerType);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePicker = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'date-picker-popover' : undefined;

  // Formato de fecha
  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Validar rango fechas y mostrar resultados
  const handleSearch = () => {
    if (startDate > endDate) {
      window.alert('Error de Fechas: La fecha final debe ser posterior o igual a la fecha inicial.');
      return;
    }
    setShowResults(true);
  };

  // Datos simulados según rango
  const generateTemperatureData = () => {
    if (timeRange === 'day') {
      return [
        { time: '00:00', temp: 22 },
        { time: '03:00', temp: 21 },
        { time: '06:00', temp: 20 },
        { time: '09:00', temp: 22 },
        { time: '12:00', temp: 26 },
        { time: '15:00', temp: 28 },
        { time: '18:00', temp: 25 },
        { time: '21:00', temp: 23 },
        { time: '24:00', temp: 22 },
      ];
    } else if (timeRange === 'week') {
      return [
        { time: 'Lun', temp: 24 },
        { time: 'Mar', temp: 25 },
        { time: 'Mié', temp: 26 },
        { time: 'Jue', temp: 25 },
        { time: 'Vie', temp: 27 },
        { time: 'Sáb', temp: 28 },
        { time: 'Dom', temp: 26 },
      ];
    } else if (timeRange === 'month') {
      return Array.from({ length: 30 }, (_, i) => ({
        time: `${i + 1}`,
        temp: Math.floor(Math.random() * 10) + 20,
      }));
    } else {
      return [
        { time: 'Ene', temp: 22 },
        { time: 'Feb', temp: 23 },
        { time: 'Mar', temp: 25 },
        { time: 'Abr', temp: 26 },
        { time: 'May', temp: 27 },
        { time: 'Jun', temp: 28 },
        { time: 'Jul', temp: 27 },
        { time: 'Ago', temp: 26 },
        { time: 'Sep', temp: 25 },
        { time: 'Oct', temp: 24 },
        { time: 'Nov', temp: 23 },
        { time: 'Dic', temp: 22 },
      ];
    }
  };

  const tempData = generateTemperatureData();

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <button className="menu-button" onClick={() => alert('Abrir menú lateral')}>
          <Menu size={28} color={colors.white} />
        </button>
        <h1 className="title">Datos de Temperatura</h1>
      </header>

      {/* Contenido */}
      <main className="content">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <section className="controls-container">
            {/* Fecha Inicial */}
            <div className="date-picker-container">
              <label className="date-label" htmlFor="start-date">Fecha inicial</label>
              <button
                id="start-date"
                className="date-button"
                onClick={(e) => handleOpenPicker(e as any, 'start')}
              >
                <Thermometer size={18} color={colors.primary} />
                <span className="date-text">{formatDate(startDate)}</span>
              </button>
            </div>

            <div className="separator" />

            {/* Fecha Final */}
            <div className="date-picker-container">
              <label className="date-label" htmlFor="end-date">Fecha final</label>
              <button
                id="end-date"
                className="date-button"
                onClick={(e) => handleOpenPicker(e as any, 'end')}
              >
                <Thermometer size={18} color={colors.primary} />
                <span className="date-text">{formatDate(endDate)}</span>
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
              PaperProps={{ style: { marginTop: 8, borderRadius: 8, boxShadow: '0px 4px 12px rgba(0,0,0,0.15)' } }}
            >
              <DatePicker
                value={currentPicker === 'start' ? startDate : endDate}
                onChange={(newValue) => {
                  if (newValue) {
                    if (currentPicker === 'start') {
                      setStartDate(newValue);
                      if (endDate < newValue) setEndDate(newValue);
                    } else {
                      setEndDate(newValue);
                    }
                  }
                  handleClosePicker();
                }}
                maxDate={new Date()}
                minDate={currentPicker === 'end' ? startDate : undefined}
                disableFuture
              />
            </Popover>
          </section>
        </LocalizationProvider>

        {/* Botón consultar */}
        <button className="search-button" onClick={handleSearch}>
          Consultar Datos
        </button>

        {/* Resultados */}
        {showResults ? (
          <>
            {/* Gráfico */}
            <section className="chart-container">
              <h2>Temperatura (°C)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tempData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, stroke: colors.white }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </section>

            {/* Tabla de resultados */}
            <section className="table-container">
              <h2>Resumen de Datos Registrados</h2>
              <div className="table-header">
                <span className="header-text flex-2">Fecha y Hora</span>
                <span className="header-text">Temp (°C)</span>
                <span className="header-text">Hum (%)</span>
                <span className="header-text">Luz (lx)</span>
              </div>
              <div className="table-empty-body">
                <Thermometer size={30} color={colors.gray} />
                <p className="empty-table-text">Cargando datos de temperatura...</p>
              </div>
            </section>
          </>
        ) : (
          <div className="empty-state">
            <Thermometer size={50} color={colors.gray} />
            <p className="empty-text">
              Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información de temperatura.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TemperaturePage;
