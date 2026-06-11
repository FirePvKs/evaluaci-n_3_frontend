# TechZone Store

Tienda de tecnología desarrollada en React como proyecto de evaluación.

## Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:

- [Node.js](https://nodejs.org/) versión 16 o superior
- npm (viene incluido con Node.js)

Para verificar que los tienes instalados, abre una terminal y ejecuta:

```
node -v
npm -v
```

Ambos comandos deben mostrar un número de versión sin errores.

## Cómo ejecutar el proyecto

**1. Descomprime el archivo ZIP** en la carpeta donde quieras trabajar.

**2. Abre una terminal** dentro de la carpeta `techzone_store`.

**3. Instala las dependencias** (solo la primera vez):

```
npm install
```

Este comando puede tardar entre 1 y 3 minutos dependiendo de tu conexión.

**4. Inicia el servidor de desarrollo:**

```
npm start
```

El proyecto se abrirá automáticamente en tu navegador en la dirección `http://localhost:3000`.

---

## Cómo probar cada funcionalidad

### Formulario y validaciones

1. Haz clic en **Guardar Producto** sin llenar nada → deben aparecer mensajes de error en rojo bajo cada campo obligatorio.
2. Ingresa un precio negativo o cero → debe aparecer el mensaje *"El precio debe ser mayor a 0"*.
3. Ingresa un stock negativo → debe aparecer el mensaje *"El stock debe ser 0 o mayor"*.

### Validación de imagen (2MB)

1. Selecciona una imagen que pese más de 2MB.
2. Debe aparecer el mensaje *"La imagen supera el tamaño permitido de 2MB"* y el campo se limpia automáticamente.
3. Selecciona una imagen que pese menos de 2MB → debe mostrarse la vista previa debajo del input.

### Agregar un producto

1. Completa todos los campos correctamente.
2. Selecciona una imagen válida (menos de 2MB).
3. Haz clic en **Guardar Producto**.
4. El formulario debe vaciarse y el producto debe aparecer como tarjeta en el catálogo de la derecha.
5. El contador **"Productos Registrados"** del encabezado debe aumentar en 1.

### Eliminar un producto

1. Con al menos un producto en el catálogo, haz clic en el botón **🗑️ Eliminar** de una tarjeta.
2. Debe aparecer una ventana de confirmación preguntando si deseas eliminar el producto.
3. Si haces clic en **Aceptar**, la tarjeta desaparece y el contador baja en 1.
4. Si haces clic en **Cancelar**, el producto se mantiene.

### Diseño responsivo

1. Reduce el ancho de la ventana del navegador a menos de 860px.
2. El layout debe pasar de dos columnas (formulario | catálogo) a una sola columna apilada.

---

## Estructura del proyecto

```
techzone_store/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── componentes/
│   │   └── ProductForm.jsx
│   └── img/
│       └── notebook.jpg
└── package.json
```
