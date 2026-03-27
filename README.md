
# NovaStore Ecommerce (Next.js + Vercel)

Aplicacion web ecommerce moderna, mobile-first y lista para despliegue en Vercel con:

- Next.js App Router + React + TypeScript
- Tailwind CSS
- API Routes serverless
- Mercado Pago para checkout online
- Transferencia bancaria con subida de comprobante a Cloudinary
- Persistencia de pedidos en Supabase
- Carrito global con drawer flotante
- Boton flotante de WhatsApp con resumen del carrito

## 1) Stack y arquitectura

- Frontend: Next.js App Router, React 19, Tailwind CSS 4
- Backend serverless: rutas en `app/api/*`
- Base de datos: Supabase (tabla `orders`)
- Pagos: Mercado Pago API (preferencias)
- Imagenes de comprobantes: Cloudinary
- Deploy: Vercel

## 2) Estructura de carpetas

```bash
app/
	api/
		checkout/mercadopago/route.ts
		orders/route.ts
		upload-proof/route.ts
	admin/page.tsx
	checkout/
		checkout-client.tsx
		page.tsx
	orders/
		orders-client.tsx
		page.tsx
	products/
		[slug]/
			page.tsx
			product-gallery.tsx
		page.tsx
	globals.css
	layout.tsx
	page.tsx
components/
	cart/
	layout/
	products/
	providers/
lib/
	cloudinary.ts
	currency.ts
	mercadopago.ts
	orders.ts
	products.ts
	supabase.ts
	types.ts
.env.example
supabase-schema.sql
```

## 3) Configuracion local

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env.local` en la raiz usando `.env.example`.

3. Configurar Supabase:

- Crear proyecto en Supabase.
- Ejecutar SQL de `supabase-schema.sql`.
- Copiar `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE`.

4. Configurar Mercado Pago:

- Crear app en Mercado Pago Developers.
- Copiar Access Token en `MERCADOPAGO_ACCESS_TOKEN`.

5. Configurar Cloudinary:

- Crear cuenta y obtener `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

6. Levantar entorno:

```bash
npm run dev
```

## 4) Variables de entorno

Requeridas para produccion:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_WHATSAPP_PHONE`
- `MERCADOPAGO_ACCESS_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 5) Funcionalidades implementadas

### Home y navegacion

- Hero moderno responsive
- Navbar superior con categorias
- Buscador funcional (redirige al catalogo con query)
- Seccion de productos mas buscados

### Catalogo y detalle

- Grid de productos con imagen, nombre, precio y boton de agregar
- Filtros por categoria, precio y texto
- Pagina individual con galeria de imagenes y compra

### Carrito

- Carrito flotante visible en toda la web
- Drawer lateral con listado de productos
- Modificar cantidades, eliminar y ver total automatico

### Checkout

- Formulario de cliente (nombre, direccion, telefono, email)
- Pago con Mercado Pago (creacion de preferencia)
- Alternativa transferencia bancaria con datos bancarios
- Subida de comprobante (imagen) a Cloudinary
- Guardado de pedidos en Supabase

### Integraciones

- Boton flotante WhatsApp con mensaje predefinido + resumen del carrito
- API Mercado Pago
- Imagenes optimizadas con `next/image` y dominios remotos habilitados

### SEO y performance

- Metadata global y dinamica por producto
- App Router optimizado para Vercel
- Imagenes con `sizes`, lazy loading y dominios remotos

### Extras recomendados

- Historial de pedidos por email (`/orders`)
- Panel admin base (`/admin`) para futura expansion con roles

## 6) Endpoints API serverless

- `POST /api/checkout/mercadopago`: crea preferencia de pago y guarda pedido pendiente.
- `GET /api/orders?email=`: obtiene pedidos por email.
- `POST /api/orders`: guarda pedido (ej. transferencia).
- `POST /api/upload-proof`: sube comprobante de transferencia a Cloudinary.

## 7) Despliegue en Vercel

1. Push al repositorio.
2. Importar proyecto en Vercel.
3. Definir variables de entorno (Environment Variables).
4. Deploy.

Comandos:

- Build: `npm run build`
- Start (preview): `npm run start`

## 8) Siguientes mejoras para produccion avanzada

- Webhooks de Mercado Pago para actualizar estado `paid` automatico.
- Autenticacion real (NextAuth o Supabase Auth).
- CRUD completo de productos para panel admin.
- Control de stock en tiempo real.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
