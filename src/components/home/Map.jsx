import React from "react";

const Map = () => (
  <div 
    className="map-container"
    style={{
      width: '100%',
      height: '450px',
      marginTop: '150px',
      marginBottom: '150px',
      padding: 0
    }}
  >
    <iframe
      title="Ubicación del hotel"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13820.767346843728!2d-60.667605516519274!3d-32.95028562467575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab6a57015929%3A0x61d5e8b338adfe4e!2sBlvd.%20Oro%C3%B1o%201234%2C%20S2000%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1756838318984!5m2!1ses-419!2sar"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      style={{
        border: 0,
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  </div>
);

export default Map;