import React from 'react';

function Typography() {
  return (
    <section className="section">
      <h2>Tipografía</h2>
      
      <div className="typography-examples">
        <div className="surface-padded-section">
          <h3>Encabezados</h3>
          <h1>Heading 1 - 2.5rem (40px)</h1>
          <h2>Heading 2 - 2rem (32px)</h2>
          <h3>Heading 3 - 1.75rem (28px)</h3>
          <h4>Heading 4 - 1.5rem (24px)</h4>
          <h5>Heading 5 - 1.25rem (20px)</h5>
          <h6>Heading 6 - 1rem (16px)</h6>
        </div>

        <div className="surface-padded-section">
          <h3>Texto de Párrafo</h3>
          <p>
            Este es un párrafo normal con <strong>texto en negrita</strong> y 
            <em> texto en cursiva</em>. El tamaño de fuente base es de 16px con 
            una altura de línea de 1.5 para mejorar la legibilidad.
          </p>
          <p className="text-small">
            Texto pequeño - 0.875rem (14px) - Útil para notas al pie o texto secundario.
          </p>
          <p className="text-large">
            Texto grande - 1.125rem (18px) - Para destacar información importante.
          </p>
        </div>

        <div className="surface-padded-section">
          <h3>Enlaces</h3>
          <p>
            Este es un <a href="#">enlace normal</a> dentro de un párrafo.
          </p>
          <p>
            <a href="#" className="link-primary">Enlace primario</a> | 
            <a href="#" className="link-secondary"> Enlace secundario</a> | 
            <a href="#" className="link-danger"> Enlace de peligro</a>
          </p>
        </div>

        <div className="surface-padded-section">
          <h3>Listas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h4>Lista desordenada</h4>
              <ul>
                <li>Elemento de lista 1</li>
                <li>Elemento de lista 2
                  <ul>
                    <li>Subelemento 2.1</li>
                    <li>Subelemento 2.2</li>
                  </ul>
                </li>
                <li>Elemento de lista 3</li>
              </ul>
            </div>
            <div>
              <h4>Lista ordenada</h4>
              <ol>
                <li>Primer elemento</li>
                <li>Segundo elemento</li>
                <li>Tercer elemento</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="surface-padded-section">
          <h3>Citas</h3>
          <blockquote>
            "La excelencia en el transporte no es un acto, sino un hábito."
            <cite>- Sistema de Transporte</cite>
          </blockquote>
        </div>

        <div className="surface-padded-section">
          <h3>Código</h3>
          <p>
            Código en línea: <code>const vehiculo = 'activo';</code>
          </p>
          <pre>
            <code>{`// Bloque de código
function calcularRuta(origen, destino) {
  const distancia = calcularDistancia(origen, destino);
  return distancia * TARIFA_POR_KM;
}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default Typography;