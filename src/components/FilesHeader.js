import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidePanelLinks from './SidePanelLinks';

const useStyles = makeStyles({
  shape: {
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 30,
    paddingLeft: 0,
    fontSize: '20px',
  },
});

const FilesHeader = props => {
  const classes = useStyles();

  return (
    <div className={classes.shape}>
      {`Dropbox: ${props.title}`}
    </div>
  );
};

export default FilesHeader;
