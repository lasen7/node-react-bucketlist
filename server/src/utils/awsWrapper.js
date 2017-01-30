import fs from 'fs';
import AWS from 'aws-sdk';

// s3 bucket name
const bucketName = 'bucket-list-sns';
const postFolder = 'post';

export const uploadToS3 = ({ path, name, contentType }) => {
  return new Promise((resolve, reject) => {
    if (!path || !name || !contentType) {
      return reject(new Error('Some arguments is undefined'));
    }

    AWS.config.region = process.env.AWS_REGION;
    AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY;
    AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;

    const s3 = new AWS.S3();

    const fileStream = fs.createReadStream(path);

    fileStream.on('error', err => {
      return reject(err);
    });

    fileStream.on('open', () => {
      const params = {
        Bucket: bucketName,
        Key: postFolder + '/' + name,
        Body: fileStream,
        ACL: 'public-read',
        ContentType: contentType,
      };

      s3.putObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }

        // http, https
        const imageUrl = s3.endpoint.href + bucketName + '/' + params.Key;
        resolve(imageUrl);
      });
    });
  });
};