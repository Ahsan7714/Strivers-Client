import React,{useEffect,useState} from 'react';
import { RenderPage, Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { loadUser } from '../../../store/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';

const WaterMark = ({ fileUrl }) => {
  const proxyUrl = 'https://dental-backend.vercel.app/proxy?url=';
  const proxiedFileUrl = `${proxyUrl}${encodeURIComponent(fileUrl)}`;
  const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

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
        {Array.from({ length: 3 }, (_, row) =>
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
                transform: 'rotate(-40deg)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              <div className="text-center">
                <p style={{ margin: 0 }}>{user?.name}</p>
                <p style={{ margin: 0 }}>{user?.email}</p>
              </div>
            </div>
          ))
        )}
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
