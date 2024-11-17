import { Injectable } from '@nestjs/common';
import * as AWS from "@aws-sdk/client-s3"

@Injectable()
export class AwsService {
    private s3 = new AWS.S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.BUCKET_ACCESS_KEY,
            secretAccessKey: process.env.BUCKET_SECRET_KEY
        }
    })

    async uploadFile(file: Express.Multer.File){
        const key = file.originalname
        const bucket = "nest-oxxo-test"
        const url = `https://${bucket}.s3.amazonaws.com/${key}`
        const command = new AWS.PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket
        })
        await this.s3.send(command)
        return url
    }
}
