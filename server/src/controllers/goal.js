import Goal from '../models/goal';
import { validateWriteGoalBody } from '../utils/validation';

export const writeGoal = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      msg: 'Invalid title',
      code: 2
    });
  }

  const body = {
    title: req.body.title
  };

  const validate = validateWriteGoalBody(body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: validate.error[0].message,
      code: validate.error[0].code
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      cde: 1
    });
  }

  Goal.writeGoal(req.user._id, req.user.common_profile.username, body.title)
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const getGoals = (req, res, next) => {
  Goal.findGoal(req.params.username)
    .then(goal => {
      let result = {};
      result.msg = 'SUCCESS';
      result.data = goal ? goal.goals : [];

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};

export const getGoalCount = (req, res, next) => {

  const getNotDoneGoalCount = (goals) => {
    let notDoneGoals = goals.filter(goal => {
      return goal.postId != null;
    });

    return notDoneGoals.length;
  };

  Goal.findGoal(req.params.username)
    .then(goal => {
      let result = {};
      result.msg = 'SUCCESS';
      result.total = goal ? goal.goals.length : 0;
      result.done = goal ? getNotDoneGoalCount(goal.goals) : 0;

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};