import React from 'react';

const HomeConf1 = ({styles, handleClickServ}) => {
  return (
    <div>
      <button className="ui right labeled icon button fluid" style={styles.titBuscar}>
        <i className="large sitemap yellow icon"></i>
        Opciones
      </button>

      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickServ}>
        <i className="large edit violet icon"></i>
        Servicios
      </button>
    </div>
  )
};

export default HomeConf1
