import express from 'express';
import { api } from '../controllers';

const router = express.Router();

router.get('/', api.welcome);

export default router;