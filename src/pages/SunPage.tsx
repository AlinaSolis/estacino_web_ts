import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Popover } from '@mui/material';
import moment from 'moment';
import './CSS/SunPage.css'; // Importa los estilos CSS externos
import { es } from 'date-fns/locale';

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

const SunPage = () => {
  // Navegación adaptada para React Web (puedes usar react-router-dom si quieres)
  // Aquí dejo como placeholder la función del menú:
  const openDrawer = () => {
    alert('Abrir menú lateral (implementa según tu router o layout)');
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end'>('start');
  const [showResults, setShowResults] = useState(false);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [isLoading, setIsLoading] = useState(false);
  const [solarData, setSolarData] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleOpenPicker = (event: React.MouseEvent<HTMLElement>, pickerType: 'start' | 'end') => {
    setCurrentPicker(pickerType);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-picker-popover' : undefined;

  const formatDate = (date: Date) => moment(date).format('DD/MM/YYYY');

  const handleSearch = () => {
    if (startDate > endDate) {
      alert('La fecha final debe ser posterior o igual a la fecha inicial.');
      return;
    }
    setShowResults(true);
    fetchSolarData();
  };

  const fetchSolarData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSolarData({
        currentUV: 8.5,
        maxUV: 10.2,
        minUV: 5.3,
        radiation: 850,
        lastUpdated: new Date(),
      });
      setIsLoading(false);
    }, 1500);
  };

  const generateSolarData = () => {
    if (timeRange === 'day') {
      return {
        labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
        datasets: [{ data: [2, 5, 7, 9, 8, 6, 3] }],
      };
    } else if (timeRange === 'week') {
      return {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{ data: [6, 7, 8, 9, 8, 7, 6] }],
      };
    } else if (timeRange === 'month') {
      return {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        datasets: [{ data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5) + 5) }],
      };
    } else {
      return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{ data: [5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4] }],
      };
    }
  };

  const solarDataChart = generateSolarData();
  const currentUV = solarDataChart.datasets[0].data[Math.floor(solarDataChart.datasets[0].data.length / 2)];

  // Para el gráfico, te recomiendo usar otra librería para React Web,
  // por ejemplo, 'recharts' o 'chart.js' con react-chartjs-2.
  // Aquí dejo un placeholder porque react-native-chart-kit no funciona en web nativamente.
  const renderChart = () => (
    <div className="chart-container">
      <h3 className="chart-title">Índice UV</h3>
      <p>Gráfico placeholder (implementa con librería web, e.g. recharts)</p>
    </div>
  );

  const renderCurrentData = () => {
    if (!solarData) return null;

    const uvDescription =
      solarData.currentUV < 3
        ? 'Bajo'
        : solarData.currentUV < 6
        ? 'Moderado'
        : solarData.currentUV < 8
        ? 'Alto'
        : solarData.currentUV < 11
        ? 'Muy Alto'
        : 'Extremo';

    const radiationDescription =
      solarData.radiation < 500 ? 'Baja' : solarData.radiation < 800 ? 'Moderada' : 'Alta';

    return (
      <div className="current-data-container">
        <div className="current-value-card">
          <span className="current-value-label">Índice UV Actual</span>
          <div className="current-value-wrapper">
            <span className="current-value">{solarData.currentUV.toFixed(1)}</span>
          </div>
          <span className="wind-description">{uvDescription}</span>
        </div>

        <div className="direction-card">
          <span className="current-value-label">Radiación Solar</span>
          <div className="current-value-wrapper">
            <span className="current-value">{solarData.radiation}</span>
            <span className="current-value-unit">W/m²</span>
          </div>
          <span className="wind-description">{radiationDescription}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <button className="menu-button" onClick={openDrawer} aria-label="Abrir menú">
          <Menu size={28} color={colors.white} />
        </button>
        <h1 className="title">Radiación Solar</h1>
      </header>

      {/* Content */}
      <main className="content">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <div className="controls-container">
            {/* Fecha inicial */}
            <div className="date-picker-container">
              <label className="date-label">Fecha inicial</label>
              <button
                className="date-button"
                onClick={(e) => handleOpenPicker(e, 'start')}
                type="button"
              >
                <i className="material-icons">calendar_today</i>
                <span className="date-text">{formatDate(startDate)}</span>
                <i className="material-icons">keyboard_arrow_down</i>
              </button>
            </div>

            <div className="separator" />

            {/* Fecha final */}
            <div className="date-picker-container">
              <label className="date-label">Fecha final</label>
              <button
                className="date-button"
                onClick={(e) => handleOpenPicker(e, 'end')}
                type="button"
              >
                <i className="material-icons">calendar_today</i>
                <span className="date-text">{formatDate(endDate)}</span>
                <i className="material-icons">keyboard_arrow_down</i>
              </button>
            </div>
          </div>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePicker}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              style: {
                marginTop: 8,
                borderRadius: 8,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <DatePicker
              value={currentPicker === 'start' ? startDate : endDate}
              onChange={(newValue) => {
                if (newValue) {
                  if (currentPicker === 'start') {
                    setStartDate(newValue);
                    if (endDate < newValue) {
                      setEndDate(newValue);
                    }
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
        </LocalizationProvider>

        {/* Botón de búsqueda */}
        <button className="search-button" onClick={handleSearch} type="button">
          <i className="material-icons">search</i> Consultar Datos
        </button>

        {isLoading ? (
          <div className="empty-state">
            <div className="loader"></div>
            <p className="empty-text">Cargando datos solares...</p>
          </div>
        ) : showResults ? (
          <>
            {renderCurrentData()}
            {renderChart()}

            {/* Tabla de resultados */}
            <section className="table-container">
              <h3 className="table-title">Resumen de Datos Registrados</h3>
              <div className="table-header">
                <span className="header-text flex-2">Fecha y Hora</span>
                <span className="header-text">Índice UV</span>
                <span className="header-text">Radiación</span>
              </div>

              <div className="table-empty-body">
                <i className="material-icons hourglass-empty">hourglass_empty</i>
                <p className="empty-table-text">Cargando datos solares...</p>
              </div>
            </section>
          </>
        ) : (
          <div className="empty-state">
            <i className="material-icons wb-sunny">wb_sunny</i>
            <p className="empty-text">
              Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información
              de radiación solar.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SunPage;
