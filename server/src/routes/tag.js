import express from 'express';
import { tag } from '../controllers';

const router = express.Router();

router.get('/', tag.getTags);

export default router;