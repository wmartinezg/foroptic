import React from 'react';
import { Divider } from 'semantic-ui-react'

const VerCli1 = ({styles, handleClickRegr, handleClickUpd, handleClickDel}) => {
  return (
    <div>
      <button className="ui right labeled icon button fluid" style={styles.titBuscar}>
        <i className="large sitemap yellow icon"></i>
        Opciones
      </button>

      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickUpd}>
        <i className="large edit violet icon"></i>
        Modificar
      </button>
      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickDel}>
        <i className="large delete violet icon"></i>
        Eliminar
      </button>

      <Divider inverted />

      <button className="ui labeled icon button fluid" style={styles.dropdown} onClick={handleClickRegr}>
        <i className="large arrow left violet icon"></i>
        Regresar
      </button>

    </div>
  )
};

export default VerCli1
