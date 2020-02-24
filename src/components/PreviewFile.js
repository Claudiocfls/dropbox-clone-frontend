import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  shape: {
    width: '100%',
    height: 168,
    backgroundColor: '#f3f4f5',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '12px',
  },
});

const PreviewFile = props => {
  const classes = useStyles();

  return (
    <div className={classes.shape}>
      Selecione um arquivo para ver mais detalhes
    </div>
  );
};

export default PreviewFile;
