// views/ContadorView.js
import React from 'react';
import '../styles/ContadorView.css'; // Importar el CSS

function ContadorView({ contador, onIncrementar, onResetear }) {
  return (
    <div className="contador-container">
      <h1 className="contador-valor">{contador}</h1>
      <button className="contador-boton" onClick={onIncrementar}>
        Incrementar
      </button>
      <button className="contador-boton resetear" onClick={onResetear}>
        Resetear
      </button>
    </div>
  );
}

export default ContadorView;
