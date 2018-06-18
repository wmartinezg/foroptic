import React from 'react';

const AddSubclase1 = ({styles, handleClickRegr}) => {
  return (
    <div>
      <button className="ui right labeled icon button fluid" style={styles.titBuscar}>
        <i className="large sitemap yellow icon"></i>
        Opciones
      </button>

      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickRegr}>
        <i className="large arrow left violet icon"></i>
        Regresar
      </button>
    </div>
  )
};

export default AddSubclase1
