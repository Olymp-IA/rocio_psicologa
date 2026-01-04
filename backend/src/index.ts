import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';

// Import routes
import authRoutes from './routes/auth.routes';
import appointmentsRoutes from './routes/appointments.routes';
import contactRoutes from './routes/contact.routes';
import blogRoutes from './routes/blog.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

import path from 'path';
import transcriptionsRoutes from './routes/transcriptions.routes';

// ... (existing code)

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/transcriptions', transcriptionsRoutes);

// Static uploads (protected? or public? usually bonos are private, but for now public for admin viewing via URL)
// In production, should use signed URLs or protected route acting as proxy.
// For MVP/Demo:
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// ... (error handler & listen)

export default app;
