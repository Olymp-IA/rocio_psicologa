# Narrativa de Navegación y Arquitectura de Información
**Autor:** Nexus - Aditi (Arquitecto de Información para Sistemas Complejos)
**Proyecto:** Rocío Manosalva - Psicología Clínica

## 1. Filosofía de Navegación: "El Viaje hacia la Calma"
La navegación no es solo funcional; es el primer paso terapéutico. El usuario llega buscando alivio, claridad o ayuda. La estructura debe ser:
- **Intuitiva:** Sin fricción cognitiva.
- **Calmada:** Transiciones suaves, sin urgencia artificial.
- **Segura:** Accesible y predecible.

## 2. Mapa del Sitio (Sitemap)

### A. Público (El Portal de Bienvenida)
1.  **Inicio (Landing Page)**
    *   *Propósito:* Conexión emocional inmediata + Credibilidad.
    *   *Narrativa:* "Has llegado a un lugar seguro. Aquí hay esperanza y profesionalismo."
    *   *Flujo:* Hero (Promesa) -> Sobre Mí (Confianza) -> Servicios (Soluciones) -> Testimonios (Validación) -> Footer (Contacto).
2.  **Autenticación (El Umbral)**
    *   *Login / Registro:* Modal no invasivo. No sacamos al usuario de su contexto; le permitimos "entrar" sin irse.

### B. Privado (El Refugio del Paciente)
1.  **Dashboard del Paciente**
    *   *Propósito:* Gestión personal y continuidad terapéutica.
    *   *Narrativa:* "Este es tu espacio. Aquí está tu progreso."
    *   *Componentes:*
        *   **Próxima Sesión:** Lo más importante primero. "¿Cuándo nos vemos?"
        *   **Historial:** "¿Qué hemos logrado?" (Lista de sesiones pasadas).
        *   **Perfil:** Datos personales seguros.
2.  **Reserva de Citas (El Compromiso)**
    *   *Propósito:* Facilitar la acción de autocuidado.
    *   *Flujo (Modal):* Selección de Servicio -> Selección de Fecha/Hora -> Confirmación.

## 3. Flujos de Usuario (User Journeys)

### Usuario Nuevo (El Buscador)
1.  **Llegada:** Aterriza en `Home`. Ve las "bolas rebotando" (vida, dinamismo suave).
2.  **Exploración:** Lee "Reencuéntrate con tu paz interior". Hace scroll. Las bolas lo acompañan sutilmente.
3.  **Interés:** Se detiene en "Servicios". Ve los iconos personalizados (claridad visual).
4.  **Acción:** Decide agendar. Clic en "Ingresar" o "Reservar".
5.  **Conversión:** Se registra -> Accede al Dashboard -> Reserva su primera cita.

### Usuario Recurrente (El Paciente)
1.  **Llegada:** Entra directo a "Ingresar".
2.  **Acceso:** Login rápido.
3.  **Gestión:** Ve su dashboard. Confirma la hora de mañana.
4.  **Salida:** Cierra sesión con sensación de control.

## 4. Requerimientos de Interfaz (UI Guidelines para Nexus - Thor)
Para apoyar esta narrativa, necesitamos:
- **Iconografía:** No genérica. Líneas suaves, orgánicas. Que evoquen humanidad, no clínica fría.
- **Feedback Visual:** Al hacer hover, al cargar. El sistema debe "respirar" con el usuario.
