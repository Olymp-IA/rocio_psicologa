# Psicología - Backend API

🧠 API REST para el sitio web de psicología, construida con Node.js, Express y Prisma.

## Tecnologías

- **Node.js + Express** - Servidor web
- **TypeScript** - Tipado estático
- **Prisma** - ORM para PostgreSQL
- **JWT** - Autenticación
- **Nodemailer** - Envío de emails

## Estructura

```
src/
├── index.ts              # Entry point
├── config/
│   ├── database.ts       # Cliente Prisma
│   └── env.ts            # Variables de entorno
├── controllers/
│   ├── auth.controller.ts
│   ├── appointments.controller.ts
│   ├── contact.controller.ts
│   └── blog.controller.ts
├── routes/
│   ├── auth.routes.ts
│   ├── appointments.routes.ts
│   ├── contact.routes.ts
│   └── blog.routes.ts
├── middleware/
│   ├── auth.middleware.ts
│   └── validation.middleware.ts
├── services/
│   └── email.service.ts
└── utils/
```

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar base de datos
npx prisma generate
npx prisma db push

# Desarrollo
npm run dev

# Build de producción
npm run build  
npm start
```

## Variables de Entorno

Crear `.env`:

```env
# Servidor
PORT=3001
NODE_ENV=development

# Base de datos PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/psicologia_db"

# JWT
JWT_SECRET=tu-super-secreto-cambiar-en-produccion
JWT_EXPIRES_IN=7d

# Frontend (CORS)
FRONTEND_URL=http://localhost:3000

# Email SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_FROM=Consulta Psicología <noreply@psicologia.com>
```

## API Endpoints

### Autenticación
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/refresh
```

### Citas
```
GET    /api/appointments/availability
POST   /api/appointments
GET    /api/appointments/:id
DELETE /api/appointments/:id
GET    /api/appointments          (admin)
PUT    /api/appointments/:id      (admin)
```

### Contacto
```
POST   /api/contact
GET    /api/contact               (admin)
PATCH  /api/contact/:id/read      (admin)
```

### Blog
```
GET    /api/blog/posts
GET    /api/blog/posts/:slug
GET    /api/blog/categories
POST   /api/blog/posts            (admin)
PUT    /api/blog/posts/:id        (admin)
DELETE /api/blog/posts/:id        (admin)
```

## Modelos de Base de Datos

- **User** - Usuarios del sistema (admin/psicólogo)
- **Patient** - Pacientes/clientes
- **Service** - Servicios ofrecidos
- **Appointment** - Citas
- **ContactMessage** - Mensajes de contacto
- **Post** - Artículos del blog
- **Category** - Categorías del blog
- **Availability** - Horarios disponibles

## Deploy

### Railway/Render
1. Conectar repositorio
2. Configurar variables de entorno
3. Agregar PostgreSQL

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## Licencia

MIT
