import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DropZone from 'react-dropzone';
import api from '../services/api';
import { Button } from '@material-ui/core';
import classnames from 'classnames';
import UploadReport from './UploadReport';

const useStyles = makeStyles({
  fileSectionTitle: {
    color: '#637282',
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: 12,
    fontWeight: 500,
  },
  horizontalLine: {
    color: '#637282',
    marginTop: 18,
    marginBottom: 12,
    opacity: 0.3,
  },
  button: {
    textTransform: 'none',
  },
  dragZoneHidden: {
    display: 'none',
  },
});

const LoadFile = props => {
  const [isDragZoneHidden, setIsDragZone] = useState(true);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { id } = props;
  let fileList = [];

  const handleClick = () => {
    setIsDragZone(!isDragZoneHidden);
  }
  
  const addFileToQueue = (file) => {
    if(!open) setOpen(true);
  }

  const removeFile = (file) => {
    console.log(open);
    if (open) setOpen(false);
  }

  const handleUpload = (files) => {
    files.forEach(file => {
      const data = new FormData();
      data.append('file', file);
      addFileToQueue(file);

      api.post(`boxes/${id}/files`, data).then(res => {
        removeFile(file);
      });
    });
  }

  return (
    <div>
      <h4 className={classes.fileSectionTitle}>Arquivos</h4>
      <hr className={classes.horizontalLine} />
      
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        {isDragZoneHidden ? 'Enviar arquivos' : 'Fechar'}
      </Button>
      <div className={classnames({[classes.dragZoneHidden]: isDragZoneHidden})}>
        <DropZone onDropAccepted={handleUpload}>
          { ({ getRootProps, getInputProps }) => (
            <div className="input-area" { ...getRootProps() }>
              <input { ...getInputProps() } />
              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </DropZone>
      </div>
      <UploadReport open={open} onClose={() => {}} />
    </div>
  );
};

export default LoadFile;
