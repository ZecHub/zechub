import React from 'react';
import {QRCodeSVG} from 'qrcode.react';

const QrCodeGenerator = ({ value }) => {
  return (
    <div style={{marginTop: '32px'}}>
      <QRCodeSVG 
        value={value}           // The data you want to encode (e.g., Zcash address)
        size={200}              // Size of the QR code (optional, default is 128)
        bgColor={"#ffffff"}     // Background color (optional, default is white)
        fgColor={"#000000"}     // Foreground color (optional, default is black)
        level={"H"}             // Error correction level (optional, default is "L")
      />
    </div>
  );
};

export default QrCodeGenerator;
