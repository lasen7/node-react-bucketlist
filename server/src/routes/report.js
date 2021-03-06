import express from 'express';
import { report } from '../controllers';

const router = express.Router();

router.post('/post/:postId', report.reportPost);
router.get('/post', report.getReportedPosts);
router.post('/post/:postId/review', report.reviewPost);
router.post('/block/:username', report.blockUser);

export default router;