import React, { useState, useEffect } from 'react';
import './styles.css';
import { MdInsertDriveFile } from 'react-icons/md';
import api from '../../services/api';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DropZone from 'react-dropzone';
import socket from 'socket.io-client';

const Box = (props) => {
  const [box, setBox] = useState({});
  const { match: { params: { id } } } = props;

  useEffect(() => {
    if(Object.keys(box).length === 0) {
      const fetchData = async () => {
        const response = await api.get(`boxes/${id}`);
        const boxData = response.data;
        setBox(boxData);
      };
      fetchData();
      subscribeToNewFiles();
    }
  }, [id]);
  
  const subscribeToNewFiles = () => {
    const io = socket('http://localhost:3001');
    
    io.emit('connectRoom', id);
    io.on('file', data => {
      if(box.files) {
        setBox({ ...box, files: [data, ...box.files] });
      }
    });
  }

  const handleUpload = (files) => {
    files.forEach(file => {
      const data = new FormData();
      data.append('file', file);
      
      api.post(`boxes/${box._id}/files`, data);
    });
  }
  
  return (
    <div id="box-container">
      <header>
        <h1>{box.title}</h1>
      </header>
      <DropZone onDropAccepted={handleUpload}>
        { ({ getRootProps, getInputProps }) => (
          <div style={{ border: '1px solid #000' }} { ...getRootProps() }>
            <input { ...getInputProps() } />
            <p>Arraste arquivos ou clique aqui</p>
          </div>
        )}
      </DropZone>
      <ul>
        {box.files && box.files.map(file => (
          <li key={file._id}>
            <a href={file.url}>
              <MdInsertDriveFile size={24} color="#A5CFFF" />
              <strong>{file.title}</strong>
            </a>
            <span>Há {formatDistance(new Date(file.createdAt), new Date(), {
              locale: pt
            })}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Box;