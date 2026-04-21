// Base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Laptop Gaming Pro",
        categoria: "laptops",
        precio: 1299.99,
        descripcion: "Laptop de alto rendimiento para gaming",
        emoji: "💻"
    },
    {
        id: 2,
        nombre: "Smartphone X",
        categoria: "smartphones",
        precio: 899.99,
        descripcion: "Teléfono inteligente de última generación",
        emoji: "📱"
    },
    {
        id: 3,
        nombre: "Auriculares Inalámbricos",
        categoria: "accesorios",
        precio: 199.99,
        descripcion: "Auriculares de alta calidad con cancelación de ruido",
        emoji: "🎧"
    },
    {
        id: 4,
        nombre: "Tablet Ultra",
        categoria: "laptops",
        precio: 599.99,
        descripcion: "Tablet portátil con pantalla OLED",
        emoji: "⌚"
    },
    {
        id: 5,
        nombre: "Cargador Rápido",
        categoria: "accesorios",
        precio: 49.99,
        descripcion: "Cargador USB-C de 65W",
        emoji: "🔌"
    },
    {
        id: 6,
        nombre: "Smartphone Z",
        categoria: "smartphones",
        precio: 799.99,
        descripcion: "Teléfono compacto y potente",
        emoji: "📞"
    },
    {
        id: 7,
        nombre: "Funda Protectora",
        categoria: "accesorios",
        precio: 29.99,
        descripcion: "Funda resistente a golpes",
        emoji: "🛡️"
    },
    {
        id: 8,
        nombre: "Monitor 4K",
        categoria: "laptops",
        precio: 399.99,
        descripcion: "Monitor de resolución 4K 144Hz",
        emoji: "🖥️"
    }
];

// Carrito de compras
let carrito = [];
let categoriaActual = 'todos';

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    renderizarProductos(productos);
    
    // Evento para abrir/cerrar carrito
    document.getElementById('carritoIcon').addEventListener('click', abrirCarrito);
    
    // Cerrar modal al hacer clic fuera
    document.getElementById('modalCarrito').addEventListener('click', function(event) {
        if (event.target === this) {
            cerrarCarrito();
        }
    });
});

// Renderizar productos
function renderizarProductos(productosAMostrar) {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';
    
    if (productosAMostrar.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No hay productos en esta categoría</p>';
        return;
    }
    
    productosAMostrar.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <div class="producto-imagen">${producto.emoji}</div>
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-categoria">${producto.categoria}</p>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtrar productos
function filtrarProductos(categoria) {
    categoriaActual = categoria;
    
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('activo');
    });
    event.target.classList.add('activo');
    
    // Filtrar y mostrar
    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(p => p.categoria === categoria);
        renderizarProductos(productosFiltrados);
    }
}

// Agregar al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id === idProducto);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito');
}

// Eliminar del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
    // Actualizar contador
    const count = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById('carritoCount').textContent = count;
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Abrir carrito
function abrirCarrito() {
    const modal = document.getElementById('modalCarrito');
    modal.style.display = 'block';
    actualizarVistaCarrito();
}

// Cerrar carrito
function cerrarCarrito() {
    document.getElementById('modalCarrito').style.display = 'none';
}

// Actualizar vista del carrito
function actualizarVistaCarrito() {
    const carritoItems = document.getElementById('carritoItems');
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        document.getElementById('totalCarrito').textContent = '0.00';
        return;
    }
    
    carritoItems.innerHTML = '';
    let total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <div class="item-nombre">${item.nombre}</div>
                <div class="item-cantidad">Cantidad: ${item.cantidad}</div>
            </div>
            <div class="item-precio">$${subtotal.toFixed(2)}</div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">
                Eliminar
            </button>
        `;
        carritoItems.appendChild(itemElement);
    });
    
    document.getElementById('totalCarrito').textContent = total.toFixed(2);
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    alert(`¡Compra realizada con éxito!\n\nTotal: $${total.toFixed(2)}\n\nGracias por tu compra en TechStore 🎉`);
    
    // Limpiar carrito
    carrito = [];
    actualizarCarrito();
    cerrarCarrito();
    localStorage.removeItem('carrito');
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 999;
        animation: slideInRight 0.3s;
    `;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notificacion.remove(), 300);
    }, 3000);
}

// Agregar animación CSS para notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Cargar carrito del localStorage al abrir la página
window.addEventListener('load', function() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
});
