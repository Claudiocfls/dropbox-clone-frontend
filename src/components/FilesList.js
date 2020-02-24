import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MdInsertDriveFile } from 'react-icons/md';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

const useStyles = makeStyles({
  list: {
    listStyle: 'none',
  },
  listHeader: {
    borderBottom: '1px solid #d6d6d6',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 12,
    paddingRight: 16,
    fontSize: '14px',
    fontWeight: 500,
    color: '#637282',
  },
  listItem: {
    padding: 14,
    paddingLeft: 18,
    borderBottom: '1px solid #d6d6d6',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'rgb(27, 39, 51)',
      fontWeight: 400,
    },
    '& a span': {
      paddingLeft: 12,
    },
  },
});

const FilesList = ({ box }) => {
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      <li className={classes.listHeader}>
        <span>Nome do arquivo</span>
        <span>Criado em</span>
      </li>
      {box.files && box.files.map(file => (
        <li key={file._id} className={classes.listItem}>
          <a href={file.url}>
            <MdInsertDriveFile size={32} color="#A5CFFF" />
            <span>{file.title}</span>
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
  );
};

export default FilesList;
