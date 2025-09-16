import React from "react";
import { FaWhatsapp } from "react-icons/fa"; 

const WhatsAppButton = () => {
  const phoneNumber = "5493411234567"; 
  const message = "Hola, quisiera más información sobre el hotel."; 
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
   <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"  // usa tu CSS
    >
      <FaWhatsapp size={32} color="white" />
    </a>
  );
};

export default WhatsAppButton;