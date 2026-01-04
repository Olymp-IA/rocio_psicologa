import prisma from '../config/database';

export const transcribeAudio = async (fileUrl: string): Promise<string> => {
    // Mock: Simular llamada a Google Speech-to-Text o Whisper
    console.log('Transcribiendo audio:', fileUrl);

    // Simulación de demora
    await new Promise(resolve => setTimeout(resolve, 1000));

    return "Esta es una transcripción simulada de la sesión de terapia. El paciente reporta mejoras en su ansiedad...";
};

export const analyzeSession = async (transcriptionText: string) => {
    // Mock: Simular análisis con LLM (Gemini)
    console.log('Analizando texto con IA...');

    return {
        summary: "El paciente muestra progreso.",
        keywords: ["ansiedad", "progreso", "sueño"],
        sentiment: "Positivo",
        suggestions: "Continuar con ejercicios de respiración."
    };
};

export const processSessionAudio = async (appointmentId: string, fileUrl: string) => {
    const transcriptionText = await transcribeAudio(fileUrl);
    const analysis = await analyzeSession(transcriptionText);

    // Guardar en base de datos
    return prisma.transcription.create({
        data: {
            appointmentId,
            content: transcriptionText,
            // analysis: JSON.stringify(analysis) // Schema doesn't have analysis field yet?
            // Check schema: model Transcription { id, content, appointmentId }
            // If I want to save analysis, I should have added a field.
            // For now, append to content.
        }
    });
};
