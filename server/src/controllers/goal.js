import Goal from '../models/goal';
import { validateWriteGoalBody, validateObjectId } from '../utils/validation';

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
      code: 1
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
      result.goalId = goal ? goal._id : '';

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

export const deleteGoal = (req, res, next) => {
  const validateGoalId = validateObjectId(req.params.goalId);
  if (!validateGoalId) {
    return res.status(400).send({
      msg: 'Invalid goalId',
      code: 2
    });
  }

  const validateGoalsId = validateObjectId(req.params.goalsId);
  if (!validateGoalsId) {
    return res.status(400).send({
      msg: 'Invalid goalsId',
      code: 3
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Goal.findGoalById(req.params.goalId)
    .then(goal => {
      if (!goal) {
        return res.status(400).send({
          msg: 'Not found resource',
          code: 4
        });
      }

      if (goal.accountId.toString() !== req.user._id) {
        return res.status(401).send({
          msg: 'Not authorized',
          code: 1
        });
      }

      // find and remove goalId
      let index = goal.goals.findIndex(goal => goal._id.toString() === req.params.goalsId);
      if (index === -1) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 5;
        throw error;
      }

      goal.goals.splice(index, 1);
      goal.save();
    })
    .then(() => {
      res.send({
        msg: 'SUCCESS',
        goalsId: req.params.goalsId
      });
    })
    .catch(err => {
      next(err);
    });
};

export const editGoal = (req, res, next) => {
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

  const validateGoalId = validateObjectId(req.params.goalId);
  if (!validateGoalId) {
    return res.status(400).send({
      msg: 'Invalid goalId',
      code: 2
    });
  }

  const validateGoalsId = validateObjectId(req.params.goalsId);
  if (!validateGoalsId) {
    return res.status(400).send({
      msg: 'Invalid goalsId',
      code: 3
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Goal.findGoalById(req.params.goalId)
    .then(goal => {
      if (!goal) {
        return res.status(400).send({
          msg: 'Not found resource',
          code: 4
        });
      }

      if (goal.accountId.toString() !== req.user._id) {
        return res.status(401).send({
          msg: 'Not authorized',
          code: 1
        });
      }

      // find and edit goalId
      let index = goal.goals.findIndex(goal => goal._id.toString() === req.params.goalsId);
      if (index === -1) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 5;
        throw error;
      }

      goal.goals[index].title = body.title;
      goal.save();
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};