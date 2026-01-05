# Psicología - Frontend

🧠 Sitio web profesional para servicios de psicología, construido con Next.js 14.

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Framer Motion** - Animaciones fluidas
- **CSS Modules** - Estilos modulares

## Estructura

```
src/
├── app/                    # Páginas (App Router)
│   ├── page.tsx           # Landing Page
│   ├── about/             # Sobre Nosotros
│   ├── services/          # Servicios
│   ├── contact/           # Contacto
│   ├── appointments/      # Sistema de Citas
│   └── blog/              # Blog
├── components/            # Componentes reutilizables
│   ├── common/           # Header, Footer
│   └── home/             # Hero, Services, Testimonials...
├── lib/                   # Utilidades
│   └── api.ts            # Cliente API
└── styles/               # Estilos globales
```

## Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

## Usuarios de Prueba

El sistema incluye 3 tipos de usuarios para pruebas:

| Rol | Email | Password | Dashboard |
|-----|-------|----------|-----------|
| 🧑 Paciente | `paciente@test.com` | `123456` | `/dashboard` |
| 👩‍⚕️ Especialista | `especialista@test.com` | `123456` | `/dashboard/specialist` |
| 👑 Admin | `admin@test.com` | `123456` | `/dashboard/admin` |

### Funcionalidades por Rol

**Paciente:**
- Ver próxima sesión
- Historial de sesiones
- Descargar boletas

**Especialista:**
- Lista de pacientes
- Próximas sesiones
- Historial con subida de boletas

**Admin:**
- Todo lo del especialista
- Gestión de contenido (servicios, blog)
- Lista de usuarios
- Estadísticas

## Variables de Entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Características

- ✅ Diseño moderno y elegante
- ✅ Animaciones suaves con Framer Motion
- ✅ Totalmente responsive
- ✅ Sistema de citas interactivo
- ✅ Formulario de contacto
- ✅ Blog con categorías
- ✅ SEO optimizado
- ✅ Paleta de colores calmante

## Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary | `#5B8A72` | Verde salvia - Tranquilidad |
| Secondary | `#E8DDD4` | Beige cálido - Acogedor |
| Accent | `#C4A77D` | Dorado suave - Elegancia |
| Text | `#2D3436` | Legibilidad |
| Background | `#FDFCFB` | Limpio |

## Deploy

El proyecto está optimizado para Vercel:

```bash
vercel
```

## Licencia

MIT
