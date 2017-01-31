import express from 'express';
import { bookmark } from '../controllers';

const router = express.Router();

router.post('/:postId/like', bookmark.likeBookmark);
router.delete('/:postId/like', bookmark.unlikeBookmark);
router.get('/:username', bookmark.getBookmarks);

export default router;