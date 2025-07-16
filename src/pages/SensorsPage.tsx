import React, { useState } from 'react';
import './CSS/SensorsPage.css';
import { MdMenu, MdDeviceThermostat, MdAir, MdWbSunny, MdSensors, MdCheckCircle, MdError } from 'react-icons/md';

const SensorsPage = () => {
  const [sensors, setSensors] = useState([
    {
      id: 1,
      name: 'Sensor de Temperatura',
      model: 'DHT22',
      icon: <MdDeviceThermostat size={28} color="#D78909" />,
      color: '#D78909',
      parameters: 'Temperatura (-40°C a 80°C)',
      accuracy: '±0.5°C',
      active: true,
      lastReading: '25.4°C',
      lastUpdate: 'Hace 2 minutos',
      voltage: '3.3V',
    },
    {
      id: 4,
      name: 'Sensor de Velocidad del Viento',
      model: 'Anemómetro',
      icon: <MdAir size={28} color="#0A7764" />,
      color: '#0A7764',
      parameters: 'Velocidad (0 a 50 m/s)',
      accuracy: '±0.5 m/s',
      active: true,
      lastReading: '12 km/h',
      lastUpdate: 'Hace 1 minuto',
      voltage: '5V',
    },
    {
      id: 6,
      name: 'Sensor de Radiación Solar',
      model: 'BH1750',
      icon: <MdWbSunny size={28} color="#F39C12" />,
      color: '#F39C12',
      parameters: 'Intensidad lumínica (1-65535 lux)',
      accuracy: '±20%',
      active: false,
      lastReading: 'N/A',
      lastUpdate: 'Hace 1 hora',
      voltage: '3.3V',
    },
  ]);

  const toggleSensor = (id: number) => {
    setSensors(sensors.map(sensor =>
      sensor.id === id ? { ...sensor, active: !sensor.active } : sensor
    ));
  };

  return (
    <div className="container">
      <header className="header">
        <button className="menuButton" onClick={() => alert('Abrir menú')}>
          <MdMenu size={28} color="#FFFFFF" />
        </button>
        <h1 className="title">Sensores IoT</h1>
      </header>

      <main className="scrollContainer">
        <section className="content">
          <div className="summaryCard">
            <h2 className="sectionTitle">Resumen del Sistema</h2>
            <div className="summaryGrid">
              <div className="summaryItem">
                <MdSensors size={24} color="#0A7764" />
                <p className="summaryNumber">{sensors.length}</p>
                <p className="summaryLabel">Sensores</p>
              </div>
              <div className="summaryItem">
                <MdCheckCircle size={24} color="#2ECC71" />
                <p className="summaryNumber success">{sensors.filter(s => s.active).length}</p>
                <p className="summaryLabel">Activos</p>
              </div>
              <div className="summaryItem">
                <MdError size={24} color="#E74C3C" />
                <p className="summaryNumber error">{sensors.filter(s => !s.active).length}</p>
                <p className="summaryLabel">Inactivos</p>
              </div>
            </div>
          </div>

          {sensors.map(sensor => (
            <div
              key={sensor.id}
              className="card"
              style={{
                borderLeft: `4px solid ${sensor.color}`,
                backgroundColor: sensor.active ? '#FDFDFD' : '#F5F5F5'
              }}
            >
              <div className="sensorHeader">
                {sensor.icon}
                <div className="sensorTitleContainer">
                  <p className="sensorName" style={{ color: sensor.color }}>{sensor.name}</p>
                  <p className="sensorModel">{sensor.model}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={sensor.active}
                    onChange={() => toggleSensor(sensor.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="sensorDetails">
                <div className="detailRow">
                  <span className="detailLabel">Parámetros:</span>
                  <span className="detailValue">{sensor.parameters}</span>
                </div>
                <div className="detailRow">
                  <span className="detailLabel">Precisión:</span>
                  <span className="detailValue">{sensor.accuracy}</span>
                </div>
                <div className="detailRow">
                  <span className="detailLabel">Voltaje:</span>
                  <span className="detailValue">{sensor.voltage}</span>
                </div>
                <div className="detailRow">
                  <span className="detailLabel">Última lectura:</span>
                  <span className="detailValue bold" style={{ color: sensor.color }}>
                    {sensor.lastReading}
                  </span>
                </div>
                <div className="detailRow">
                  <span className="detailLabel">Actualizado:</span>
                  <span className="detailValue">{sensor.lastUpdate}</span>
                </div>
                <div className="detailRow">
                  <span className="detailLabel">Estado:</span>
                  <div
                    className="statusBadge"
                    style={{
                      backgroundColor: sensor.active ? '#2ECC71' : '#E74C3C'
                    }}
                  >
                    <span className="statusText">
                      {sensor.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SensorsPage;

