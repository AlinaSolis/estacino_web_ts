import React, { useState, useEffect } from 'react';
import { MdSchool, MdCloud, MdGroups, MdContactMail, MdEmail, MdPhone, MdLocationOn, MdPerson } from 'react-icons/md';
import { Menu } from 'lucide-react';

import './CSS/AboutScreen.css';

const AboutScreen = () => {
  const [isWeb, setIsWeb] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsWeb(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openDrawer = () => {
    // Aquí debes poner tu lógica para abrir menú lateral si tienes
    console.log('Abrir menú lateral');
  };

  return (
    <div className="container">
      {/* Header con navegación móvil (mantenido para compatibilidad) */}
      <header className={`navbar ${isWeb ? 'navbar-web' : ''}`}>
        <button className="menu-button" onClick={openDrawer} aria-label="Abrir menú">
          <Menu size={28} color="#FFFFFF" />
        </button>
        <div className="logo">Sistema Meteorológico UTD</div>
        <div className="empty-space"></div>
      </header>

      {/* Nueva sección de header web optimizada */}
      <section className="header-section">
        <div className="header-content">
          <h1 className="main-title">Sobre Nosotros</h1>
          <p className="main-subtitle">Conoce más sobre nuestro sistema meteorológico y el equipo que lo desarrolla</p>
        </div>
      </section>

      <main className={`content ${isWeb ? 'content-web' : ''}`}>
        <div className="content-wrapper">
          {/* Header original mantenido como alternativa */}
          <section className="header" style={{ display: 'none' }}>
            <h1 className="title">Sobre Nosotros</h1>
            <p className="subtitle">Conoce más sobre nuestro sistema meteorológico</p>
          </section>

          {/* Nueva sección header para contenido */}
          <section className="section-header">
            <h2 className="section-title-main">Nuestro Proyecto</h2>
            <p className="section-subtitle">Un sistema desarrollado con tecnología de vanguardia para el monitoreo meteorológico</p>
          </section>

          <section className="grid-container">
            <article className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdSchool size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Universidad Tecnológica de Durango</h3>
              </header>
              <p className="card-text">
                La Universidad Tecnológica de Durango es una institución comprometida con la excelencia académica
                y la formación de profesionales capaces de enfrentar los retos del mundo actual.
              </p>
              {/* Texto original mantenido */}
              <p className="text" style={{ display: 'none' }}>
                La Universidad Tecnológica de Durango es una institución comprometida con la excelencia académica
                y la formación de profesionales capaces de enfrentar los retos del mundo actual.
              </p>
            </article>

            <article className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdCloud size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Sistema Meteorológico</h3>
              </header>
              <p className="card-text">
                Este sistema fue desarrollado por estudiantes y profesores de la UTD para monitorear las condiciones
                climáticas en tiempo real y proporcionar datos históricos para investigación y análisis.
              </p>
              {/* Texto original mantenido */}
              <p className="text" style={{ display: 'none' }}>
                Este sistema fue desarrollado por estudiantes y profesores de la UTD para monitorear las condiciones
                climáticas en tiempo real y proporcionar datos históricos para investigación y análisis.
              </p>
            </article>

            <article className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdGroups size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Equipo de Desarrollo</h3>
              </header>
              <div className="team-list">
                {[
                  'Solís Guereca Alina Alecxandra',
                  'Sosa Villa Leslie Joselin',
                  'Robles Quezada Jacqueline',
                  'Gonzalez Espino Marco Antonio',
                  'Delgado Cabrera Miguel Angel',
                ].map((member, index) => (
                  <div className="team-member" key={member}>
                    {/* Avatar nuevo */}
                    <div className="member-avatar">
                      {member.split(' ')[0].charAt(0)}{member.split(' ')[1]?.charAt(0) || ''}
                    </div>
                    <div className="member-info">
                      <p className="member-name">{member}</p>
                      <p className="member-role">Desarrollador</p>
                    </div>
                    {/* Elemento original mantenido */}
                    <div style={{ display: 'none' }}>
                      <MdPerson size={20} color="#0A7764" />
                      <span className="member-text">{member}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={`card ${isWeb ? 'card-web' : ''}`}>
              <header className="card-header">
                <MdContactMail size={28} color="#0A7764" className="card-icon" />
                <h3 className="card-title">Contacto</h3>
              </header>
              <div className="contact-list">
                <div className="contact-item">
                  <MdEmail size={24} color="#0A7764" className="contact-icon" />
                  <div className="contact-content">
                    <p className="contact-label">Email</p>
                    <p className="contact-text">meteorologia@utd.edu.mx</p>
                  </div>
                  {/* Elemento original mantenido */}
                  <span className="contact-text" style={{ display: 'none' }}>meteorologia@utd.edu.mx</span>
                </div>
                <div className="contact-item">
                  <MdPhone size={24} color="#0A7764" className="contact-icon" />
                  <div className="contact-content">
                    <p className="contact-label">Teléfono</p>
                    <p className="contact-text">+52 618 123 4567</p>
                  </div>
                  {/* Elemento original mantenido */}
                  <span className="contact-text" style={{ display: 'none' }}>+52 618 123 4567</span>
                </div>
                <div className="contact-item">
                  <MdLocationOn size={24} color="#0A7764" className="contact-icon" />
                  <div className="contact-content">
                    <p className="contact-label">Dirección</p>
                    <p className="contact-text">Durango - Mezquital, 34308 Gabino Santillán, Dgo.</p>
                  </div>
                  {/* Elemento original mantenido */}
                  <span className="contact-text" style={{ display: 'none' }}>Durango - Mezquital, 34308 Gabino Santillán, Dgo.</span>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">© 2023 Sistema Meteorológico UTD - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutScreen;