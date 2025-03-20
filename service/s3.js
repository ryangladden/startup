const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const multers3 = require('multer-s3')
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const {bucket} = require('./s3.json');


const s3 = new S3Client({
    credentials: fromIni(),
    region: 'us-east-1'
})

async function generateUrl(key) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key
    })

    const url = getSignedUrl((s3, command, {
        expiresIn: 180,
    }))

    console.log(url)
    return url;
}

async function readFile(fileName) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: fileName
        });
    const { Body } = await s3.send(command);
    return Body.transformToString();
}

upload = multer({
    storage: multers3({
        s3,
        bucket: bucket,
        // acl: 'public-read',
        contentType: multers3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const filename = `${uuid()}${ext}`
            cb(null, filename);
        }
    })
})

module.exports = {
    upload,
    readFile
}



