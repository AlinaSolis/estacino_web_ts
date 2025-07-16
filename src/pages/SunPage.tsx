import React, { useState } from 'react';
import { Calendar, Search, Sun, Zap, Shield, TrendingUp } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Popover } from '@mui/material';
import { es } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './CSS/SunPage.css';

const SunPage = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [currentPicker, setCurrentPicker] = useState<'start' | 'end'>('start');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleOpenPicker = (event: React.MouseEvent<HTMLButtonElement>, pickerType: 'start' | 'end') => {
    setCurrentPicker(pickerType);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePicker = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'date-picker-popover' : undefined;

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const handleSearch = () => {
    if (startDate > endDate) {
      alert('Error: La fecha final debe ser posterior o igual a la fecha inicial.');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const generateSolarData = () => [
    { time: '06:00', uv: 1, radiation: 50 },
    { time: '08:00', uv: 3, radiation: 200 },
    { time: '10:00', uv: 6, radiation: 500 },
    { time: '12:00', uv: 9, radiation: 850 },
    { time: '14:00', uv: 10, radiation: 920 },
    { time: '16:00', uv: 7, radiation: 650 },
    { time: '18:00', uv: 4, radiation: 300 },
    { time: '20:00', uv: 1, radiation: 80 },
  ];

  const solarData = generateSolarData();
  const currentSolar = solarData[Math.floor(solarData.length / 2)];

  const getUVDescription = (uv: number) => {
    if (uv < 3) return 'Bajo';
    if (uv < 6) return 'Moderado';
    if (uv < 8) return 'Alto';
    if (uv < 11) return 'Muy Alto';
    return 'Extremo';
  };

  const getRadiationDescription = (radiation: number) => {
    if (radiation < 200) return 'Baja';
    if (radiation < 600) return 'Moderada';
    if (radiation < 800) return 'Alta';
    return 'Muy Alta';
  };

  const renderCurrentData = () => (
    <div className="current-data-grid fade-in">
      <div className="current-data-card">
        <Sun className="current-data-icon" size={32} />
        <div className="current-data-label">Índice UV</div>
        <div className="uv-meter">
          <div className="uv-meter-inner">
            <div className="uv-value">{currentSolar.uv}</div>
            <div className="uv-label">UV</div>
          </div>
        </div>
        <div className="current-data-description">
          {getUVDescription(currentSolar.uv)}
        </div>
      </div>
      
      <div className="current-data-card">
        <Zap className="current-data-icon" size={32} />
        <div className="current-data-label">Radiación Solar</div>
        <div className="current-data-value">{currentSolar.radiation}</div>
        <div className="current-data-unit">W/m²</div>
        <div className="current-data-description">
          {getRadiationDescription(currentSolar.radiation)}
        </div>
      </div>
      
      <div className="current-data-card">
        <Shield className="current-data-icon" size={32} />
        <div className="current-data-label">Recomendación</div>
        <div className="current-data-value" style={{ fontSize: '18px', lineHeight: '1.3' }}>
          {currentSolar.uv > 6 ? 'Usar protección' : 'Exposición segura'}
        </div>
        <div className="current-data-description">
          {currentSolar.uv > 6 ? 'Protector solar recomendado' : 'Condiciones normales'}
        </div>
      </div>
    </div>
  );

  const renderChart = () => (
    <div className="chart-container slide-up">
      <h3 className="chart-title">Índice UV</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={solarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#7f8c8d"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#7f8c8d"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #d28c0c',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#d28c0c"
              strokeWidth={3}
              dot={{ 
                fill: '#d28c0c', 
                strokeWidth: 2, 
                stroke: '#fff',
                r: 6
              }}
              activeDot={{ 
                r: 8, 
                stroke: '#d28c0c',
                strokeWidth: 2,
                fill: '#fff'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderDataTable = () => (
    <div className="data-table-container slide-up">
      <div className="data-table-header">
        <h3 className="data-table-title">Resumen de Datos Registrados</h3>
      </div>
      <div className="data-table-columns">
        <div className="data-table-column">Fecha y Hora</div>
        <div className="data-table-column">Índice UV</div>
        <div className="data-table-column">Radiación</div>
      </div>
      <div className="data-table-empty">
        <TrendingUp className="data-table-empty-icon" />
        <p className="data-table-empty-text">
          Los datos detallados se cargarán aquí una vez procesada la consulta
        </p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="content">
        <h1 className="page-title">Radiación Solar</h1>
        
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <div className="date-controls-wrapper">
            <div className="date-controls-grid">
              <div className="date-field">
                <label className="date-field-label">Fecha inicial</label>
                <div 
                  className="date-input-wrapper"
                  onClick={(e) => handleOpenPicker(e as any, 'start')}
                >
                  <Calendar className="date-input-icon" size={20} />
                  <span className="date-input-text">{formatDate(startDate)}</span>
                  <span className="date-input-arrow">▼</span>
                </div>
              </div>

              <div className="date-field">
                <label className="date-field-label">Fecha final</label>
                <div 
                  className="date-input-wrapper"
                  onClick={(e) => handleOpenPicker(e as any, 'end')}
                >
                  <Calendar className="date-input-icon" size={20} />
                  <span className="date-input-text">{formatDate(endDate)}</span>
                  <span className="date-input-arrow">▼</span>
                </div>
              </div>
            </div>

            <button className="search-button" onClick={handleSearch} disabled={isLoading}>
              <Search className="search-icon" size={20} />
              {isLoading ? 'Consultando...' : 'Consultar Datos'}
            </button>
          </div>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePicker}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{ 
              style: { 
                marginTop: 8, 
                borderRadius: 12, 
                boxShadow: '0px 8px 32px rgba(0,0,0,0.12)' 
              } 
            }}
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
        </LocalizationProvider>

        {isLoading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando datos de radiación solar...</p>
          </div>
        ) : showResults ? (
          <div className="results-container">
            {renderCurrentData()}
            {renderChart()}
            {renderDataTable()}
          </div>
        ) : (
          <div className="empty-state">
            <Sun className="empty-state-icon" />
            <p className="empty-state-text">
              Selecciona un rango de fechas y presiona "Consultar Datos" para visualizar la información de radiación solar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SunPage;