import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidePanelLinks from './SidePanelLinks';

const useStyles = makeStyles({
  shape: {
    width: 265,
    height: '100%',
    backgroundColor: '#f7f9fa',
    padding: 40,
  },
});

const SidePanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.shape}>
      <SidePanelLinks />
    </div>
  );
};

export default SidePanel;
