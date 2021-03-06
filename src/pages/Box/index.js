import React, { useState, useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import socket from 'socket.io-client';
import SidePanel from '../../components/SidePanel';
import FilesHeader from '../../components/FilesHeader';
import LoadFile from '../../components/LoadFile';
import FilesList from '../../components/FilesList';
import { makeStyles } from '@material-ui/core';
import PreviewFile from '../../components/PreviewFile';

const useStyles = makeStyles({
  content: {
    display: 'grid',
    gridTemplateColumns: 'auto 280px',
    gridColumnGap: 40,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 40,
  },
});

const Box = (props) => {
  const { match: { params: { id } } } = props;
  const [box, setBox] = useState({
    files: [],
    _id: id,
    title: 'alguma coisa',
  });
  const [newFile, setNewFile] = useState({}); 
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`boxes/${id}`);
      const boxData = response.data;
      setBox(boxData);
    };
    
    fetchData();
    subscribeToNewFiles();
  }, [id]);

  useEffect(() => {
    if (Object.keys(newFile).length)
      setBox({ ...box, files: [newFile, ...box.files] });
  }, [newFile]);

  const subscribeToNewFiles = () => {
    const io = socket('http://localhost:3001');
    
    io.emit('connectRoom', id);
    
    io.on('file', data => {
      setNewFile(data);
    });
  }
  
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
      <SidePanel />
      <div className={classes.container}>
        <FilesHeader title={box.title} />
        <div className={classes.content} >
          <div>
            <LoadFile id={box._id} />
            <FilesList box={box} />
          </div>
          <PreviewFile />
        </div>
      </div>
    </div>
  );
}

export default Box;