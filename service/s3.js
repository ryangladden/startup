const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');
const fs = require('fs');

const {bucket} = require('./s3.json');


const s3 = new S3Client({
    credentials: fromIni(),
    region: 'us-east-1'
})

async function uploadFile(fileName, fileContent) {
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: fileContent
    });
    return s3.send(command);
}

async function readFile(fileName) {
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: fileName
        });
    const { Body } = await s3.send(command);
    return Body.transformToString();
}

module.exports = {
    uploadFile,
    readFile
}



