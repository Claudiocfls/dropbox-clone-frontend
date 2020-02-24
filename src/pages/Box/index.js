import React, { useState, useEffect } from 'react';
import './styles.css';
import { MdInsertDriveFile } from 'react-icons/md';
import api from '../../services/api';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DropZone from 'react-dropzone';
import socket from 'socket.io-client';

// const mockedFile = {
//   _id: 2,
//   url: '',
//   title: 'Arquivo mockado',
//   createdAt: new Date(),
// };

// const mockedBox = {
//   files: [mockedFile, mockedFile, mockedFile],
//   _id: '222222',
//   title: 'Box mockada',
// };

const Box = (props) => {
  const { match: { params: { id } } } = props;
  const [box, setBox] = useState({
    files: [],
    _id: id,
    title: 'alguma coisa',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`boxes/${id}`);
      const boxData = response.data;
      setBox(boxData);
    };
    fetchData();
    subscribeToNewFiles();
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
          <div className="input-area" { ...getRootProps() }>
            <input { ...getInputProps() } />
            <p>Arraste arquivos ou clique aqui</p>
          </div>
        )}
      </DropZone>
      <ul>
        <li className="list-item">
          <strong>Nome do arquivo</strong>
          <strong>Criado em</strong>
        </li>
        {box.files && box.files.map(file => (
          <li key={file._id} className="list-item">
            <a href={file.url}>
              <MdInsertDriveFile size={24} color="#A5CFFF" />
              <strong>{file.title}</strong>
            </a>
            <span>Há {formatDistance(new Date(file.createdAt), new Date(), {
              locale: pt
            })}</span>
          </li>
        ))}
        {!box.files && (
          <div className="box-empty-warning">
            <MdInsertDriveFile size={92} color="#d6d6d6" />
            <h1>Não há arquivos<br/>nessa caixa</h1>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Box;