import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { FaBoxOpen } from 'react-icons/fa';

const useStyles = makeStyles({
  shape: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    listStyle: 'none',
    '& > *': {
      marginBottom: 16,
      color: '#637282',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.7,
      },
    },
  },
  linkActive: {
    color: '#0070E0',
    fontWeight: 500,
  },
  boxIcon: {
    marginBottom: 38,
  },
  sectionTitle: {
    color: '#0070E0',
    marginBottom: 40,
  },
});

const links = [
  {
    name: 'Meus Arquivos',
    link: '',
  },
  {
    name: 'Compartilhado',
    link: '',
  },
  {
    name: 'Solicitações de Arquivo',
    link: '',
  },
  {
    name: 'Arquivos Excluídos',
    link: '',
  }
];

const SidePanelLinks = props => {
  const classes = useStyles();

  return (
    <div className={classes.shape}>
      <FaBoxOpen size={30} color="#1a6afa" className={classes.boxIcon} />
      <h3 className={classes.sectionTitle}>Arquivos</h3>
      <ul className={classes.list}>
        {links.map((link, index) => (
          <li key={`link-${index}`}>
            <a className={classnames({[classes.linkActive]: index === 0})}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidePanelLinks;
