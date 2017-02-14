import express from 'express';
import { profile } from '../controllers';

const router = express.Router();

router.get('/:username', profile.getProfile);

export default router;