import express from 'express';
import dotenv from 'dotenv';
import { DevEnvironmentService } from '@/service/DevEnvironment';

dotenv.config();

const router = express.Router();

router.get('/prepare_dev_environment', async (req, res) => {
  if (process.env.MODE_RUN === 'DEVELOP') {
    await DevEnvironmentService.Create();
    return res.json({ msg: 'Environment create success' });
  }

  return res.json({ msg: 'Sério que você achou que eu não tinha pensado nisso meu filho!' });
});

export default router;
