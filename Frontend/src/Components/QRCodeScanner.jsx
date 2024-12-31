import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRCodeScanner = () => {
    const [result, setResult] = useState('No result');

    const handleScan = data => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = err => {
        console.error(err);
    };

    return (
        <div>
            <h2>QR Code Scanner</h2>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <p>{result}</p>
        </div>
    );
};

export default QRCodeScanner;