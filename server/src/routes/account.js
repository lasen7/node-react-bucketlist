import express from 'express';
import { account } from '../controllers';

import multer from '../utils/multerWrapper';

const router = express.Router();

router.post('/signup', multer.single(), account.signup);
router.post('/signin', multer.single(), account.signin);
router.post('/logout', account.logout);
router.get('/getinfo', account.getInfo);

router.get('/success', account.success);
router.get('/failure', account.failure);

router.get('/facebook', account.facebook);
router.get('/facebook/callback', account.facebookCallback, account.facebookCallbackSuccess);

router.get('/google', account.google);
router.get('/google/callback', account.googleCallback, account.googleCallbackSuccess);

export default router;