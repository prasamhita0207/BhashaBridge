const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { port, clientUrl, demoMode } = require('./config/env');
const connectDB = require('./config/db');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

const translationRoutes = require('./routes/translation.routes');
const speechRoutes = require('./routes/speech.routes');
const conversationRoutes = require('./routes/conversation.routes');
const authRoutes = require('./routes/auth.routes');
const historyRoutes = require('./routes/history.routes');

const app = express();

// Dev-friendly CORS: reflect whatever origin the frontend is served from
// (localhost:3000, a random `serve`/live-server port, etc). In production,
// lock this back down to your real frontend domain via CLIENT_URL.
app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', demoMode }));

app.use('/api', translationRoutes);
app.use('/api', speechRoutes);
app.use('/api', conversationRoutes);
app.use('/api', authRoutes);
app.use('/api', historyRoutes);

app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.get('*', (req, res, next) => { if (req.path.startsWith('/api/')) return next(); res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')); });
app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => console.log(`[server] BhashaBridge API running on port ${port} (demoMode=${demoMode})`));
});
