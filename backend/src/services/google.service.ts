export const generateMeetLink = async (): Promise<string> => {
    // En producción, aquí se usaría la API de Google Calendar
    // Requiere credenciales OAuth2 y Calendar API habilitada

    // Simulación: Generar link compatible con formato Meet
    const mockId = Math.random().toString(36).substring(7);
    return `https://meet.google.com/abc-${mockId}-xyz`;
};

export const createCalendarEvent = async (
    title: string,
    description: string,
    startTime: Date,
    endTime: Date,
    attendees: string[]
) => {
    // Mock: Simular creación de evento
    console.log('Creando evento en Google Calendar:', { title, startTime, attendees });
    return {
        id: 'mock-event-id',
        link: await generateMeetLink(),
    };
};
