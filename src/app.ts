import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRout } from './app/modules/user/user.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/users', userRout);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API of the first project..."
  });
});

export default app;
