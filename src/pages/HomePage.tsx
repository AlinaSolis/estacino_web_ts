import React, { useState, useEffect } from 'react';
import { Menu, School, MapPin, Navigation, QrCode, Target, Mountain } from 'lucide-react';

const HomePage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="mainContainer">
      <div className="scrollContainer">
        <div className="headerSpacer" />

        <section className="infoSection">
          <div className="locationContainer">
            <MapPin size={20} color="#0A7764" />
            <span className="locationText">Estación Meteorológica UTD</span>
          </div>
        </section>

        <section className="stationContainer">
          <div className="stationCard">
            <h3 className="sectionTitle">Detalles de la Estación</h3>
            <div className="stationDetails">
              <div className="detailRow">
                <div className="detailItem">
                  <Navigation size={20} color="#0A7764" />
                  <span className="detailLabel">Ubicación</span>
                  <span className="detailValue">UTD Campus</span>
                </div>
                <div className="detailItem">
                  <QrCode size={20} color="#0A7764" />
                  <span className="detailLabel">Código</span>
                  <span className="detailValue">UTD-WS001</span>
                </div>
              </div>
              <div className="detailRow">
                <div className="detailItem">
                  <Target size={20} color="#0A7764" />
                  <span className="detailLabel">Coordenadas</span>
                  <span className="detailValue">24.027°N, 104.658°O</span>
                </div>
                <div className="detailItem">
                  <Mountain size={20} color="#0A7764" />
                  <span className="detailLabel">Altitud</span>
                  <span className="detailValue">1890 m</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;