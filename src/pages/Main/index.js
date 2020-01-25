import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';

function Main(props) {
  const [box, setBox] = useState('');

  const handleInputChange = e => {
    setBox(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post('boxes', {
      title: box,
    });

    props.history.push(`/box/${response.data._id}`);
  };

  return (
    <div id="main-container">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Criar um box"
          value={box}
          onChange={handleInputChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Main;
