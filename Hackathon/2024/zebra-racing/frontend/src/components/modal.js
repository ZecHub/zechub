import React, { useEffect, useState } from 'react';
import QrCodeGenerator from './qrcode';

import './modal.css';

const Modal = ({ title, description, thumbnail, qrcode, onClose, children }) => {
  //   const [modalTitle, setModalTitle] = useState(title);
  //   useEffect(() => {
  //   const interval = setInterval(() => {    

  //   }, 2000);
    
  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {thumbnail && <img className="modal-thumbnail" src={thumbnail} alt="Thumbnail" />}
        {qrcode && <QrCodeGenerator value={qrcode} />}
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;