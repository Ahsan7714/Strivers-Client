import React from 'react';
import { RenderPage, Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const WaterMark= ({ fileUrl }) => {
    const renderPage = (props) => (
        <>
            {props.canvasLayer.children}
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                }}
            >
                {Array.from({ length: 3 }, (_, row) => (
                    Array.from({ length: 3 }, (_, col) => (
                        <div
                            key={`${row}-${col}`}
                            style={{
                                position: 'absolute',
                                top: `${row * 33.33}%`,
                                left: `${col * 33.33}%`,
                                width: '33.33%',
                                height: '33.33%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(0, 0, 0, 0.2)',
                                fontSize: `${1.5 * props.scale}rem`,
                                fontWeight: '',
                                // textTransform: 'uppercase',
                                transform: 'rotate(-40deg)',
                                userSelect: 'none',
                                pointerEvents: 'none',
                            }}
                        >
                             <div className=' text-center'>
                                <p style={{ margin: 0 }}>Ahmed</p>
                                <p style={{ margin: 0 }}>{'ahmed@gmail.com'}</p>
                            </div>
                        </div>
                    ))
                ))}
            </div>
            {props.annotationLayer.children}
            {props.textLayer.children}
        </>
    );

    return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
            <Viewer fileUrl={fileUrl} renderPage={renderPage} />
        </Worker>
    );
};

export default WaterMark;
