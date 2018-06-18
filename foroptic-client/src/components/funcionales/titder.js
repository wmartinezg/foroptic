import React from 'react';

const TitDer = ({textBoton1, list, styles, handleClick}) => {
  // (list) ? console.log(list.length) : console.log("0")
    return(
      <div>
      <button className="ui right labeled icon button" style={styles.titBuscar}>
        <i className="large yellow icon">{(list) ? list.length : ""}</i>
          {textBoton1}
      </button>
  
      <button className="ui right labeled icon button" onClick={handleClick} style={styles.titBuscar}>
        <i className="large plus yellow icon"></i>
        Nuevo
      </button>
    </div>  )
  }

export default TitDer