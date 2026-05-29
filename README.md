# AutoPago Backend

Backend para el sistema administrativo de compra, venta y financiamiento de autos y terrenos.

## Tecnologías

- **NestJS**: Framework para Node.js
- **Prisma**: ORM para bases de datos
- **PostgreSQL**: Base de datos relacional
- **JWT**: Autenticación
- **Swagger**: Documentación de APIs
- **PDFKit**: Generación de PDFs

## Instalación

```bash
cd autopago-backend
npm install
```

## Configuración

1. Crea una base de datos PostgreSQL
2. Copia el archivo `.env` y configura tus credenciales:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/autopago?schema=public"
   JWT_SECRET="tu-clave-secreta-super-segura-aqui-cambiala-en-produccion"
   JWT_EXPIRES_IN="7d"
   PORT=3000
   ```

3. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

## Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## Documentación de APIs

La documentación Swagger está disponible en: `http://localhost:3000/api/docs`

## Funcionalidades principales

- **Autenticación**: Inicio de sesión y gestión de usuarios con roles
- **Gestión de clientes**: Registrar y administrar clientes
- **Gestión de vendedores**: Registrar y administrar vendedores
- **Gestión de vehículos**: Registrar y administrar vehículos en inventario
- **Gestión de terrenos**: Registrar y administrar terrenos en inventario
- **Ventas**: Registrar ventas a contado o con financiamiento
- **Financiamientos**: Gestionar financiamientos y generar mensualidades automáticas
- **Pagos**: Registrar pagos y seguimiento de mensualidades
- **Pagarés**: Generar y descargar pagarés en PDF automáticamente
- **Dashboard**: Estadísticas y resumen financiero

## Estructura del proyecto

```
autopago-backend/
├── src/
│   ├── auth/                # Autenticación
│   ├── clients/             # Clientes
│   ├── dashboard/           # Dashboard
│   ├── financings/          # Financiamientos
│   ├── installments/        # Mensualidades
│   ├── lands/               # Terrenos
│   ├── payments/            # Pagos
│   ├── prisma/              # Prisma
│   ├── promissory-notes/    # Pagarés
│   ├── sales/               # Ventas
│   ├── sellers/             # Vendedores
│   ├── users/               # Usuarios
│   ├── vehicles/            # Vehículos
│   ├── app.module.ts        # Módulo principal
│   └── main.ts              # Punto de entrada
├── prisma/
│   └── schema.prisma        # Esquema de la base de datos
├── uploads/                 # Carpeta para PDFs generados
├── .env                     # Variables de entorno
├── package.json
└── tsconfig.json
```
