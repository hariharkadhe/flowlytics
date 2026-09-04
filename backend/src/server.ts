import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect DB and Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(Server running on port );
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
