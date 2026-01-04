# Proyecto Web Rocio Manosalva

Este repositorio contiene el código fuente completo (Frontend + Backend) para la plataforma de psicología de Rocio Manosalva.

## Estructura del Proyecto

- **/frontend**: Aplicación desarrollada en Next.js (React).
- **/backend**: API REST desarrollada en Node.js (Express) con PostgreSQL.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Docker & Docker Compose](https://www.docker.com/) (para la base de datos)
- [Git](https://git-scm.com/)

---

## 🚀 Guía de Inicio Rápido

### 1. Configuración del Backend

El backend maneja la lógica de negocio, autenticación y base de datos.

1.  **Navegar al directorio:**
    ```bash
    cd backend
    ```

2.  **Configurar Variables de Entorno:**
    Copia el archivo de ejemplo y ajústalo si es necesario.
    ```bash
    cp .env.example .env
    ```
    *Asegúrate de que `PORT=3002` y la `DATABASE_URL` apunte al puerto `5433` (ver docker-compose).*

3.  **Iniciar Base de Datos:**
    ```bash
    docker-compose up -d
    ```
    *Esto levantará un contenedor PostgreSQL llamado `rocio_db` en el puerto 5433.*

4.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

5.  **Desplegar Base de Datos (Prisma):**
    ```bash
    npx prisma migrate dev
    ```

6.  **Iniciar Servidor:**
    ```bash
    npm run dev
    ```
    *El servidor iniciará en `http://localhost:3002`.*

---

### 2. Configuración del Frontend

El frontend es la interfaz de usuario visible para pacientes y especialistas.

1.  **Navegar al directorio:**
    ```bash
    cd ../frontend
    ```

2.  **Configurar Variables de Entorno:**
    Crea un archivo `.env.local` en la carpeta `frontend`.
    ```bash
    echo "NEXT_PUBLIC_API_URL=http://localhost:3002/api" > .env.local
    ```

3.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

4.  **Iniciar Cliente:**
    ```bash
    npm run dev
    ```
    *La web estará disponible en `http://localhost:3000`.*

---

## 🎨 Identidad Corporativa

- **Estilo**: Minimalista y Elegante.
- **Paleta de Colores**: Midnight Blue (`#2C3E50`) & Gold (`#D4AF37`).
- **Marca**: Rocio Manosalva - Psicología Clínica.

## ✨ Características Principales

- **Experiencia de Usuario (UX)**:
  - **Intro Splash**: Pantalla de bienvenida inmersiva con animaciones suaves.
  - **Narrativa de Navegación**: "El Viaje hacia la Calma" (ver documentación).
  - **Iconografía Personalizada**: Iconos SVG escalables para cada servicio.

- **Panel de Paciente (Dashboard)**:
  - Gestión de citas y reprogramación.
  - **Subir Pagos**: Funcionalidad para adjuntar comprobantes.
  - **Perfil de Usuario**: Edición completa de datos personales (RUT inmutable).

- **Enfoque Online**:
  - Eliminación de direcciones físicas.
  - Integración visual para atención remota (Google Meet/Zoom).

## 📚 Documentación Adicional

En la carpeta `/docs` encontrarás documentación detallada sobre las decisiones de diseño y arquitectura:

- [**Narrativa de Navegación**](docs/navigation_narrative.md): Filosofía de diseño y flujos de usuario.
- [**Equipo del Proyecto**](docs/project_team.md): Roles de los agentes especialistas involucrados.

## 🛠 Comandos Útiles

- **Build de producción**: `npm run build` (en ambas carpetas).
- **Ver logs de DB**: `docker logs -f rocio_db`.
