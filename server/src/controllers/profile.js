import Account from '../models/account';
import Post from '../models/post';
import Follow from '../models/follow';
import Bookmark from '../models/bookmark';
import Goal from '../models/goal';

export const getProfile = async (req, res, next) => {
  const username = req.params.username;

  try {
    const account = await Account.findUser(username);         // common_profile
    if (!account) {
      return res.status(400).send({
        msg: 'Not found user',
        code: 1
      });
    }

    const post = await Post.getPostCountByUsername(username); // 3
    const follower = await Follow.getFollowerCount(account._id);
    const followee = await Follow.getFolloweeCount(account._id);
    const bookmark = await Bookmark.getBookmarkCount(username);
    const goal = await Goal.findGoal(username);

    const result = {
      msg: 'SUCCESS',
      username: account.common_profile.username,
      fullname: account.common_profile.fullname,
      thumbnail: account.common_profile.thumbnail,
      count: {
        post: post,
        follower: follower,
        followee: followee,
        bookmark: bookmark.length === 0 ? 0 : bookmark[0].count,
        goal: {
          total: goal ? goal.goals.length : 0,
          done: goal ? getNotDoneGoalCount(goal.goals) : 0
        }
      }
    };

    res.send(result);
  } catch (e) {
    next(e);
  }
};

const getNotDoneGoalCount = (goals) => {
  let notDoneGoals = goals.filter(goal => {
    return goal.postId != null;
  });

  return notDoneGoals.length;
};