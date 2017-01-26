import bcrypt from 'bcryptjs';

export const generateHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, (err, hash) => {
      if (err) {
        return reject(err);
      }

      resolve(hash);
    });
  });
};

export const compareHash = (hash, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        return reject(err);
      }

      // true or false
      resolve(result);
    });
  });
};