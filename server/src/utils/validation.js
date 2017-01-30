import inspector from 'schema-inspector';
import mongoose from 'mongoose';

export const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateSignupBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        pattern: 'email',
        code: 1,
        error: 'Invalid email'
      },
      fullname: {
        type: 'string',
        minLength: 1,
        code: 2,
        error: 'Invalid fullname'
      },
      username: {
        type: 'string',
        pattern: /^[0-9a-z_]{4,20}$/,
        code: 3,
        error: 'Invalid username'
      },
      password: {
        type: 'string',
        minLength: 4,
        code: 4,
        error: 'Invalid password'
      },
      gender: {
        type: 'string',
        pattern: /(male|female)$/,
        code: 5,
        error: 'Invalid gender'
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateSigninBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        pattern: /^[0-9a-z_]{4,20}$/,
        code: 1,
        error: 'Invalid username'
      },
      password: {
        type: 'string',
        minLength: 4,
        code: 2,
        error: 'Invalid password'
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateWritePostBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      image: {
        type: 'object',
        code: 1,
        error: 'Invalid image'
      },
      description: {
        type: 'string',
        minLength: 1,
        code: 2,
        error: 'Invalid description'
      },
      latitude: {
        type: 'string',
        optional: true
      },
      longitude: {
        type: 'string',
        optional: true
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateEditPostBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      image: {
        type: 'object',
        optional: true
      },
      description: {
        type: 'string',
        minLength: 1,
        optional: true
      },
      latitude: {
        type: 'number',
        optional: true
      },
      longitude: {
        type: 'number',
        optional: true
      }
    }
  };

  return inspector.validate(validation, body);
};