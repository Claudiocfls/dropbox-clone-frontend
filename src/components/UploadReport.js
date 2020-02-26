import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { MdCheckCircle } from 'react-icons/md';
import { FaHourglassStart } from 'react-icons/fa';

const useStyles = makeStyles({
  itemWrapper: {
    display: 'grid',
    gridTemplateColumns: '25px auto 80px',
    padding: '8px 16px',
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F7F9FA',
    boxShadow: '0 0 0 1px rgba(99,114,130,.16), 0 8px 16px rgba(27,39,51,.08)',
    borderRadius: 4,
    width: '600px',
    border: '1px solid #f9f9f9',
  },
});

const UploadReportListItem = ({ item }) => {
  const classes = useStyles();

  const StatusIcon = item.progress === 'completed' ? <MdCheckCircle size={20} color="#58a940" /> : <FaHourglassStart size={18} color="#d4d1d1" />;

  return (
    <div className={classes.itemWrapper}>
      {StatusIcon}
      <p>{item.name}</p>
      <span>{item.progress}</span>
    </div>
  );
};

const UploadReportList = ({ items }) => {
  const classes = useStyles();

  return (
    <div className={classes.listWrapper}>
      {items.map(item => (<UploadReportListItem item={item} />))}
    </div>
  );
}

const mockedItems = [
  {
    name: 'teste1',
    progress: 'uploading...',
  },
  {
    name: 'teste2',
    progress: 'uploading...',
  },
  {
    name: 'teste3',
    progress: 'uploading...',
  },
  {
    name: 'teste4',
    progress: 'completed',
  },
];

const UploadReport = (props) => {
  const { open } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <Snackbar open={open} onClose={() => {}}>
      <UploadReportList items={mockedItems} />
    </Snackbar>
  );
};

export default UploadReport;
