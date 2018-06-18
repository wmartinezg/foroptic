import React from 'react';

const ConfServ1 = ({styles, handleClickCl, handleClickSubcl, handleClickRegr}) => {
  return (
    <div>
      <button className="ui right labeled icon button fluid" style={styles.titBuscar}>
        <i className="large sitemap yellow icon"></i>
        Opciones
      </button>

      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickCl}>
        <i className="large edit violet icon"></i>
        Clases
      </button>
      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickSubcl}>
        <i className="large check violet icon"></i>
        Subclases
      </button>
      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickRegr}>
        <i className="large arrow left violet icon"></i>
        Regresar
      </button>
    </div>
  )
};

export default ConfServ1
