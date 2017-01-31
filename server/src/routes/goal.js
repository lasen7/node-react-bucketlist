import express from 'express';
import { goal } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.post('/', multer.single(), goal.writeGoal);
router.get('/:username', goal.getGoals);

export default router;