import React, { useEffect, useRef } from 'react';

// @ts-ignore
import QRious from 'qrious';

const QRCode = ({ walletAddress }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Create a new QRious instance to generate the QR code
        const qr = new QRious({
            element: canvasRef.current,
            value: walletAddress,
            size: 200, // Size of the QR code in pixels
        });
    }, [walletAddress]); // Regenerate QR code if walletAddress changes

    return <canvas ref={canvasRef}></canvas>;
};

export default QRCode;
