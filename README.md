# Apparel Express — E-commerce para pruebas de QA

Tienda en línea de demostración construida con React 18, Vite 5 y Tailwind CSS. Usa [Fake Store API](https://fakestoreapi.com/docs) como backend y está pensada como **sistema bajo prueba** para prácticas de QA manual y automatizado.

| Aspecto | Detalle |
|---|---|
| URL | https://ecommerce-react-tailwind-seven.vercel.app |
| Tecnología | React 18, React Router 6, Zustand, Tailwind CSS 3, Vite 5 |
| Hosting | Vercel |
| API | Fake Store API — https://fakestoreapi.com/docs |
| Persistencia local | `localStorage` del navegador (`auth-storage`, `cart-storage`, `order-storage`, `product-storage`) |

---

## ¿Qué hace la API y qué se simula en el frontend?

Fake Store API es una API pública de prueba: **responde a todas las operaciones, pero no guarda los cambios** (un `POST /products` devuelve `201` con un id, pero el producto no queda creado). Tampoco tiene roles, stock, cupones ni pagos. Por eso la app combina datos reales de la API con lógica propia en el navegador.

| Funcionalidad | Origen | Detalle |
|---|---|---|
| Catálogo de productos y categorías | **API** | `GET /products`, `GET /products/:id`, `GET /products/categories` |
| Login de usuarios de la API | **API** | `POST /auth/login` (devuelve un token real; `401` si las credenciales son incorrectas) |
| Lista de usuarios | **API** | `GET /users` (se usa en el login, en el registro para validar duplicados y en el panel admin) |
| Registro | API + front | `POST /users` responde `201`, pero el usuario se guarda en `localStorage` para poder iniciar sesión después |
| Crear, editar y borrar productos (admin) | API + front | `POST/PUT/DELETE /products` responden OK; el cambio se guarda en `localStorage` y se aplica sobre los datos de la API |
| Confirmar pedido | API + front | `POST /carts` registra el carrito en la API; el pedido completo se guarda en `localStorage` |
| Pedidos previos de usuarios de la API | **API** | `GET /carts/user/:id` |
| Usuarios de prueba (`admin`, `problem_user`, etc.) | **Front** | Definidos en `src/data/testUsers.js`; no existen en la API |
| Roles (Invitado, Cliente, Administrador) | **Front** | La API no tiene roles |
| Stock, cupones, costo de envío | **Front** | Reglas en `src/utils/products.js` y `src/utils/pricing.js` |
| Pasarela de pago | **Front** | Simulada en `src/utils/payment.js` (no se cobra nada) |
| Defectos intencionales (`problem_user`, `slow_user`, `error_user`) | **Front** | Simulados en `src/utils/qa.js` y en los componentes que lo usan |

> **En resumen:** los errores reales que puede dar la API son pocos (credenciales incorrectas `401`, producto inexistente, caída del servicio). Todos los comportamientos "para que falle" de los usuarios de prueba se programaron en el frontend, igual que hace [saucedemo.com](https://www.saucedemo.com).
>
> Para volver al estado inicial: borrar los datos del sitio en el navegador (DevTools → Application → Local Storage) o usar **Reset catalog** en el panel admin (solo restaura productos).

---

## Roles de usuario

| Rol | Cómo se obtiene | Qué puede hacer |
|---|---|---|
| Invitado | Sin iniciar sesión | Ver catálogo y detalle, buscar, filtrar, ordenar y gestionar el carrito. Al ir al checkout se le pide iniciar sesión |
| Cliente | Registro, usuario de prueba o usuario de la API | Todo lo del invitado + checkout y "My Orders" |
| Administrador | Usuario `admin` | Panel `/admin`: CRUD de productos, cambio de estado de pedidos, ver usuarios y bloquear/desbloquear registrados |

Un cliente que entra a `/admin` ve la página **403 · Access denied**. Un invitado que entra a una ruta protegida es redirigido a `/login?redirect=...` y vuelve a esa ruta después de iniciar sesión.

## Cuentas de prueba

| Usuario | Contraseña | Rol | Comportamiento esperado |
|---|---|---|---|
| `admin` | `Admin123!` | Administrador | Entra directo a `/admin` |
| `standard_user` | `Apparel123!` | Cliente | Todo funciona correctamente |
| `locked_out_user` | `Apparel123!` | Cliente | No puede entrar: *"Sorry, this user has been locked out."* |
| `problem_user` | `Apparel123!` | Cliente | Puede comprar, pero con defectos visibles (ver abajo) |
| `slow_user` | `Apparel123!` | Cliente | El login y cada petición a la API tardan 3 segundos extra |
| `error_user` | `Apparel123!` | Cliente | Todos sus pedidos fallan al confirmar: *"Internal server error. Your order could not be processed."* |
| `mor_2314` | `83r5^_` | Cliente | Usuario real de la API: login con token real e historial de pedidos de la API |
| `johnd` | `m38rmF$` | Cliente | Usuario real de la API |

Los demás usuarios de la API (`kevinryan`, `donero`, `derek`, …) se pueden consultar en `GET https://fakestoreapi.com/users`.

### Mensajes de error del login

| Caso | Mensaje |
|---|---|
| Usuario vacío | `Username is required` |
| Contraseña vacía | `Password is required` |
| Credenciales incorrectas | `Username and password do not match any user` |
| Usuario bloqueado | `Sorry, this user has been locked out.` |
| API caída | `Unable to connect to the server. Please try again later.` |

### Defectos intencionales de `problem_user`

Sirven para practicar el reporte de defectos. Con `standard_user` el mismo flujo funciona bien, así que se puede comparar el resultado esperado con el obtenido.

| # | Módulo | Pasos para reproducir | Resultado esperado | Resultado obtenido |
|---|---|---|---|---|
| D1 | Catálogo | Iniciar sesión → Shop | Cada producto muestra su imagen | Todos los productos muestran la misma imagen |
| D2 | Catálogo | Shop → ordenar por *Price: low to high* | Productos de menor a mayor precio | El orden no cambia |
| D3 | Catálogo | Buscar `jacket` y luego `Jacket` | Mismos resultados | La búsqueda distingue mayúsculas |
| D4 | Carrito | Agregar un producto y subir la cantidad a 2 | Subtotal = precio × cantidad | El subtotal ignora la cantidad |
| D5 | Carrito | Aplicar el cupón `SAVE10` | 10 % de descuento | 1 % de descuento |
| D6 | Carrito | Con 2+ productos, eliminar el segundo | Se elimina el producto elegido | Se elimina el primero de la lista |

---

## Módulos y rutas

| Módulo | Rutas | Funcionalidad |
|---|---|---|
| Inicio | `/` | Banner, marcas, categorías, productos mejor valorados, ofertas con cuenta regresiva |
| Autenticación | `/login`, `/register` | Login, registro con validaciones, mostrar/ocultar contraseña, logout |
| Catálogo | `/shop`, `/product/:id` | Filtros por categoría y precio, búsqueda, ordenamiento, paginación (12 por página), detalle, stock. Los filtros viven en la URL (`?category=jewelery&price=0-200&q=ring&sort=price-asc`) |
| Carrito | `/cart` | Agregar, quitar, cambiar cantidad, vaciar, cupones, barra de envío gratis |
| Checkout | `/checkout`, `/order/:id` | 3 pasos: envío, pago y revisión; confirmación con número de pedido |
| Pedidos | `/orders` | Historial del cliente |
| Administración | `/admin?tab=products\|orders\|users` | Productos, pedidos y usuarios |
| Errores | cualquier otra ruta, `/product/999` | Página 404 y "Product not found" |

## Reglas de negocio

**Registro**
- Nombre y apellido: obligatorios, 2–30 caracteres, solo letras.
- Usuario: 4–20 caracteres (letras, números y `_`), único: no puede existir en la API ni localmente.
- Email: formato válido y único.
- Contraseña: 8–20 caracteres, con mayúscula, minúscula y número. La confirmación debe coincidir.
- Es obligatorio aceptar los términos.

**Catálogo y stock**
- Rango del filtro de precio: $0 – $1000.
- La búsqueda no distingue mayúsculas y busca en título y descripción.
- Stock inicial: los productos 7 y 14 están agotados; el resto tiene entre 1 y 15 unidades. Se muestra "Only N left" cuando quedan 5 o menos.
- En el carrito la cantidad va de 1 al stock disponible.
- Al confirmar un pedido se descuenta el stock. Si otro pedido dejó el stock por debajo de lo que hay en el carrito, el pedido se rechaza.

**Cupones** (no distinguen mayúsculas)

| Código | Efecto |
|---|---|
| `SAVE10` | 10 % de descuento sobre el subtotal |
| `WELCOME5` | $5 de descuento si el subtotal es ≥ $50 |
| `FREESHIP` | Envío estándar gratis |
| `SUMMER2024` | Vencido: *"This coupon has expired"* |
| Otro | *"Invalid coupon code"* |

**Envío**
- Estándar: $5. Es gratis si el subtotal (antes del descuento) es ≥ $150 o con `FREESHIP`.
- Express: siempre $15.
- Total = subtotal − descuento + envío.

**Checkout**
- Nombre 3–50 caracteres, dirección 5–100, ciudad obligatoria.
- Código postal: 5 dígitos. Teléfono: 9 dígitos, empieza con 9.
- Tarjeta: 16 dígitos y válida según el algoritmo de Luhn. Vencimiento `MM/YY`, no vencido y como máximo 10 años a futuro. CVV de 3 dígitos.

| Tarjeta de prueba | Resultado |
|---|---|
| `4242 4242 4242 4242` | Aprobada |
| `4000 0000 0000 0002` | *"Your card was declined."* |
| `4000 0000 0000 9995` | *"Your card has insufficient funds."* |
| Cualquier otra tarjeta válida (Luhn) | Aprobada |
| `1234 5678 9012 3456` | *"Card number is invalid"* (no pasa Luhn) |

**Administración**
- Producto: título 3–100 caracteres; precio > 0 y ≤ 10000 con máximo 2 decimales; stock entero 0–999; descripción 10–500; URL de imagen http(s); categoría obligatoria.
- Estados de pedido: Pending, Shipped, Delivered, Cancelled. Los pedidos cancelados no suman a los ingresos.
- Solo los usuarios registrados desde la app se pueden bloquear o desbloquear. Un usuario bloqueado recibe el mensaje de usuario bloqueado al iniciar sesión.

---

## Cómo se verificó la app

Cada flujo se ejecutó en el navegador (Chrome) contra la API real, en escritorio (1440 px) y móvil (390 px):

| Flujo | Verificación |
|---|---|
| Catálogo | 20 productos de la API; búsqueda, ordenamiento, filtro por categoría y precio; filtros reflejados en la URL; productos agotados deshabilitados |
| Carrito | Tope de cantidad = stock; cupones válidos, inválidos y vencidos; cálculo de subtotal, descuento, envío y total |
| Login | Campos vacíos, credenciales incorrectas (`401` de la API), usuario bloqueado, login real con `mor_2314`, redirección a la página original |
| Registro | Todas las validaciones, usuario duplicado contra la API, login con el usuario nuevo |
| Checkout | Validaciones de envío y pago, tarjeta rechazada, compra exitosa, número de pedido, carrito vaciado y stock descontado |
| Roles | Invitado redirigido al login; cliente con 403 en `/admin`; admin con CRUD, cambio de estado y lista de usuarios |
| Defectos | Los 6 defectos de `problem_user` se reproducen |

## Automatización

Los elementos principales tienen atributos `data-testid` para usarlos como selectores estables en Selenium, Cypress o Playwright:

| Pantalla | Selectores |
|---|---|
| Login | `input-username`, `input-password`, `toggle-password`, `login-button`, `login-error`, `error-username`, `error-password` |
| Registro | `input-firstname`, `input-lastname`, `input-username`, `input-email`, `input-password`, `input-confirmPassword`, `input-terms`, `register-button`, `register-error` |
| Header | `nav-shop`, `cart-link`, `cart-badge`, `login-nav-button`, `user-menu-button`, `logout-button`, `mobile-menu-button` |
| Catálogo | `search-input`, `sort-select`, `open-filters`, `filter-category-<categoria>`, `clear-filters`, `filter-chip`, `results-count`, `product-card-<id>`, `add-to-cart`, `quick-view`, `no-results` |
| Detalle | `product-detail-title`, `product-detail-price`, `stock-status`, `quantity-increment`, `quantity-decrement`, `quantity-value`, `add-to-cart-detail` |
| Carrito | `cart-item-<id>`, `cart-increment`, `cart-decrement`, `cart-quantity`, `cart-remove`, `confirm-delete`, `coupon-input`, `apply-coupon`, `coupon-error`, `summary-subtotal`, `summary-discount`, `summary-shipping`, `summary-total`, `checkout-button` |
| Checkout | `input-fullName`, `input-address`, `input-city`, `input-postalCode`, `input-phone`, `shipping-standard`, `shipping-express`, `continue-to-payment`, `input-cardName`, `input-cardNumber`, `input-expiry`, `input-cvv`, `continue-to-review`, `place-order`, `order-error`, `order-number` |
| Admin | `tab-products`, `tab-orders`, `tab-users`, `new-product`, `edit-product`, `delete-product`, `save-product`, `confirm-delete-product`, `order-status-select`, `toggle-lock` |

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/          # Button, Modal, Drawer, ConfirmDialog, Rating, QuantityStepper, EmptyState
│   ├── form/        # FormInput, PasswordInput, Checkbox, ErrorBanner, AuthShell
│   ├── home/        # Secciones de la página de inicio
│   ├── shop/        # Filtros del catálogo
│   ├── product/     # Tarjeta, vista rápida, detalle, stock
│   ├── cart/        # Línea del carrito, resumen, cupones
│   ├── order/       # Estado e ítems de pedidos
│   └── admin/       # Tablas y formularios del panel
├── data/            # Usuarios de prueba y categorías
├── hooks/           # useAuth, useCart, useProducts, useShopFilters, usePagination…
├── services/        # Llamadas a Fake Store API
├── store/           # Estado global con Zustand (persistido en localStorage)
├── utils/           # Reglas de negocio: precios, pagos, validaciones, defectos QA
└── views/           # Páginas
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```
