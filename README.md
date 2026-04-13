# Fullstack Inventory Dashboard

Aplicación fullstack para gestión de inventario y usuarios.

## Stack

- Backend: Node.js LTS, TypeScript, Express, Mongoose, MongoDB, JWT, bcrypt
- Frontend: React, React Router DOM, Material UI, Recharts, React Hook Form, Dayjs, decimal.js
- Testing manual API: Postman collection incluida

## Estructura

- backend: API REST con autenticación y autorización por rol
- frontend: Dashboard gerencial + Inventario + Administración de usuarios
- postman: colección para todos los endpoints principales

## Requisitos previos

- Node.js 20+
- MongoDB local o remoto

## Configuración

### Backend

1. Copiar backend/.env.example a backend/.env
2. Completar variables:
	 - MONGODB_URI
	 - JWT_SECRET
	 - JWT_EXPIRES_IN (opcional)

### Frontend

1. Copiar frontend/.env.example a frontend/.env
2. Ajustar VITE_API_URL si cambia la URL del backend

## Instalación

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Ejecución en desarrollo

Importante:
- Este repositorio conserva un proyecto Next.js en la raíz.
- Si ejecutas `npm run dev` en la raíz, verás la pantalla de Next.js (no el dashboard de inventario).
- Para esta prueba usa siempre las carpetas `backend` y `frontend`.

### 1) Levantar backend

```bash
cd backend
npm run dev
```

Servidor API: http://localhost:4000

### 2) Crear usuarios de prueba

Con el backend levantado:

```bash
cd backend
npm run seed
```

Credenciales demo:
- ADMIN: admin@demo.com / Admin123!
- USER: user@demo.com / User123!

### 3) Levantar frontend

```bash
cd frontend
npm run dev
```

Frontend: http://localhost:5173

## Ejecución rápida desde la raíz

Si no quieres cambiar de carpeta, puedes ejecutar:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

## Scripts principales

### Backend

- npm run dev: desarrollo con recarga
- npm run build: compilar TypeScript
- npm run start: ejecutar build
- npm run seed: crear usuarios y productos demo

### Frontend

- npm run dev: desarrollo
- npm run build: build producción
- npm run preview: vista previa build

## Endpoints principales

Base URL backend: /api

- Auth:
	- POST /auth/register
	- POST /auth/login
- Products:
	- GET /products?offset&limit&search&from&to
	- GET /products/:id
	- POST /products (ADMIN)
	- PATCH /products/:id (ADMIN)
	- DELETE /products/:id (ADMIN, soft delete)
- Users (ADMIN):
	- GET /users?offset&limit&active
	- GET /users/:id
	- POST /users
	- PATCH /users/:id
	- PATCH /users/:id/status

## Postman

- Archivo: postman/inventory-api.postman_collection.json
- Importar colección y configurar variables:
	- baseUrl
	- token
	- productId
	- userId

## Notas funcionales

- Rutas protegidas en frontend con verificación de sesión.
- Sección de usuarios solo visible para rol ADMIN.
- Cálculo de valor total de inventario usando decimal.js para evitar errores de precisión.
- Manejo de carga y notificaciones visuales con MUI.
