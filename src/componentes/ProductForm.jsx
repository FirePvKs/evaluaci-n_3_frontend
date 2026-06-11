import React, { useState, useRef } from 'react';

// Categorías disponibles para clasificar los productos
const CATEGORIAS = ['Notebook', 'Componentes', 'Accesorios'];

function ProductForm() {

  // Estados del formulario controlado
  const [nombre, setNombre]               = useState('');
  const [descripcion, setDescripcion]     = useState('');
  const [precio, setPrecio]               = useState('');
  const [categoria, setCategoria]         = useState('');
  const [stock, setStock]                 = useState('');
  const [imagen, setImagen]               = useState(null);
  const [visualizacion, setVisualizacion] = useState('');

  // Estado para los mensajes de error por campo
  const [errores, setErrores] = useState({});

  // Estado que almacena la lista de productos registrados
  const [productos, setProductos] = useState([]);

  // Estado para controlar qué pestaña del catálogo está activa
  const [tabActivo, setTabActivo] = useState('Notebook');

  // Referencia al input de archivo para poder limpiarlo al resetear el formulario
  const inputImagenRef = useRef(null);

  // Valida todos los campos del formulario
  // Retorna true si no hay errores, false si hay alguno
  const validarFormulario = () => {
    let nuevosErrores = {};

    if (nombre.trim() === '') {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    // La descripción no puede quedar vacía
    if (descripcion.trim() === '') {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    }

    if (precio === '') {
      nuevosErrores.precio = 'El precio es obligatorio';
    } else if (Number(precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }

    if (categoria === '') {
      nuevosErrores.categoria = 'Debe seleccionar una categoría';
    }

    // El stock debe ser un número mayor o igual a 0
    if (stock === '') {
      nuevosErrores.stock = 'El stock es obligatorio';
    } else if (Number(stock) < 0) {
      nuevosErrores.stock = 'El stock debe ser 0 o mayor';
    }

    if (!imagen) {
      nuevosErrores.imagen = 'Debe seleccionar una imagen';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Maneja la selección de imagen y valida que no supere los 2MB
  const verImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const limiteMB = 2;
      const limiteBytes = limiteMB * 1024 * 1024;

      // Si la imagen supera el límite, se muestra error y se limpia el input
      if (archivo.size > limiteBytes) {
        setErrores(prev => ({
          ...prev,
          imagen: `La imagen supera el tamaño permitido de ${limiteMB}MB.`
        }));
        e.target.value = '';
        setImagen(null);
        setVisualizacion('');
        return;
      }

      setImagen(archivo);
      // Genera una URL temporal para previsualizar la imagen seleccionada
      setVisualizacion(URL.createObjectURL(archivo));
      setErrores(prev => ({ ...prev, imagen: '' }));
    }
  };

  // Valida el formulario y agrega el nuevo producto al catálogo
  const guardarProducto = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      // Crea el objeto del nuevo producto con un ID único basado en timestamp
      const nuevoProducto = {
        id: Date.now(),
        nombre,
        descripcion,
        precio: Number(precio),
        categoria,
        stock: Number(stock),
        visualizacion,
      };

      // Agrega el producto al arreglo existente sin reemplazarlo
      setProductos([...productos, nuevoProducto]);

      // Cambia el tab activo a la categoría del producto recién guardado
      setTabActivo(nuevoProducto.categoria);

      // Resetea todos los campos del formulario
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCategoria('');
      setStock('');
      setImagen(null);
      setVisualizacion('');
      setErrores({});
      if (inputImagenRef.current) inputImagenRef.current.value = '';
    }
  };

  // Solicita confirmación y elimina el producto seleccionado del listado
  const eliminarProducto = (id, nombreProducto) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar "${nombreProducto}" del catálogo?`
    );
    if (confirmar) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  // Filtra los productos según la pestaña (categoría) activa
  const productosFiltrados = productos.filter(p => p.categoria === tabActivo);

  return (
    <div className="contenedor">

      {/* Encabezado con título y contador dinámico de productos */}
      <header className="encabezado">
        <h1>TechZone Store</h1>
        <div className="contador">
          Productos Registrados: <strong>{productos.length}</strong>
        </div>
      </header>

      {/* Layout principal: formulario a la izquierda, catálogo a la derecha */}
      <div className="layout">

        {/* Panel izquierdo: formulario para registrar nuevos productos */}
        <section className="seccion-formulario">
          <h2>Registrar Producto</h2>

          <form onSubmit={guardarProducto}>

            {/* Campo nombre */}
            <div className="campo">
              <label>Nombre del producto</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: MacBook Pro M3"
              />
              {errores.nombre && <p className="error">{errores.nombre}</p>}
            </div>

            {/* Campo descripción: usa textarea para texto más largo */}
            <div className="campo">
              <label>Descripción del producto</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe las características del producto..."
                rows={3}
              />
              {errores.descripcion && <p className="error">{errores.descripcion}</p>}
            </div>

            {/* Campo precio */}
            <div className="campo">
              <label>Precio ($)</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Ej: 999990"
                min="1"
              />
              {errores.precio && <p className="error">{errores.precio}</p>}
            </div>

            {/* Campo stock: debe ser mayor o igual a 0 */}
            <div className="campo">
              <label>Stock (unidades)</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Ej: 15"
                min="0"
              />
              {errores.stock && <p className="error">{errores.stock}</p>}
            </div>

            {/* Campo categoría */}
            <div className="campo">
              <label>Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Seleccione</option>
                {CATEGORIAS.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errores.categoria && <p className="error">{errores.categoria}</p>}
            </div>

            {/* Campo imagen con validación de tamaño máximo de 2MB */}
            <div className="campo">
              <label>Imagen del producto (máx. 2MB)</label>
              <input
                type="file"
                accept="image/*"
                onChange={verImagen}
                ref={inputImagenRef}
              />
              {errores.imagen && <p className="error">{errores.imagen}</p>}

              {/* Vista previa de la imagen seleccionada */}
              {visualizacion && (
                <div className="preview">
                  <p>Vista Previa:</p>
                  <img
                    src={visualizacion}
                    alt="visualizacion"
                    className="visualizacion"
                  />
                </div>
              )}
            </div>

            <button type="submit" className="btn-guardar">
              Guardar Producto
            </button>
          </form>
        </section>

        {/* Panel derecho: catálogo de productos organizado por pestañas */}
        <section className="seccion-catalogo">
          <h2>Catálogo de Productos</h2>

          {/* Pestañas de navegación por categoría */}
          <div className="tabs">
            {CATEGORIAS.map(tab => (
              <button
                key={tab}
                className={`tab ${tabActivo === tab ? 'tab-activo' : ''}`}
                onClick={() => setTabActivo(tab)}
              >
                {tab}
                {/* Muestra la cantidad de productos en cada categoría */}
                {productos.filter(p => p.categoria === tab).length > 0 && (
                  <span className="tab-count">
                    {productos.filter(p => p.categoria === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Estado vacío cuando no hay productos en la categoría activa */}
          {productosFiltrados.length === 0 ? (
            <div className="catalogo-vacio">
              <p>No hay productos en esta categoría.</p>
              <p>Agrega un producto de tipo {tabActivo} usando el formulario.</p>
            </div>
          ) : (
            /* Grilla de tarjetas de productos filtrados por categoría */
            <div className="lista-productos">
              {productosFiltrados.map((producto) => (
                <div className="card" key={producto.id}>

                  {/* Imagen del producto con badge de categoría */}
                  <div className="card-imagen">
                    <img src={producto.visualizacion} alt={producto.nombre} />
                    <span className="card-categoria">{producto.categoria}</span>
                  </div>

                  {/* Información del producto */}
                  <div className="card-info">
                    <h3>{producto.nombre}</h3>
                    <p className="card-descripcion">{producto.descripcion}</p>
                    <p className="card-precio">
                      ${producto.precio.toLocaleString('es-CL')}
                    </p>

                    {/* Indicador de stock disponible */}
                    <p className={`card-stock ${producto.stock === 0 ? 'sin-stock' : ''}`}>
                      {producto.stock === 0
                        ? 'Sin stock'
                        : `Stock: ${producto.stock} unidades`}
                    </p>

                    {/* Botón para eliminar el producto con confirmación previa */}
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(producto.id, producto.nombre)}
                    >
                      Eliminar
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default ProductForm;
