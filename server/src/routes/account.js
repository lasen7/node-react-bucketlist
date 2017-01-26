import express from 'express';
import { account } from '../controllers';

const router = express.Router();

router.post('/signup', account.signup);
router.post('/signin', account.signin);
router.post('/logout', account.logout);
router.get('/getinfo', account.getInfo);

export default router;