import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import mime from "mime-types";

const s3 = new S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

interface UploadRequestBody {
    file: string;
    mimeType: string;
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as UploadRequestBody;
        const { file, mimeType } = body;

        if (!file || !mimeType) {
            console.error("Missing required fields: ", { file, mimeType });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate base64 string
        if (!/^data:.+;base64,/.test(file)) {
            console.error("Invalid base64 file format");
            return NextResponse.json(
                { error: "Invalid file format" },
                { status: 400 }
            );
        }

        // Generate unique file name
        const extension = mime.extension(mimeType);
        if (!extension) {
            console.error("Unsupported MIME type: ", mimeType);
            return NextResponse.json(
                { error: "Unsupported file type" },
                { status: 400 }
            );
        }
        const fileName = `${nanoid()}.${extension}`;

        // Decode base64 string to binary
        const buffer = Buffer.from(
            file.replace(/^data:.+;base64,/, ""),
            "base64"
        );

        // Prepare S3 upload parameters
        const params = {
            Bucket: process.env.AWS_S3_BUCKET || "",
            Key: fileName,
            Body: buffer,
            ContentType: mimeType,
        };

        // Upload to S3
        const command = new PutObjectCommand(params);
        const s3Response = await s3.send(command);
        console.log("S3 upload successful:", s3Response);

        // Construct file URL
        const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        return NextResponse.json({ url: fileUrl });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error uploading to S3:", error.message);
        } else {
            console.error("Unknown error uploading to S3:", error);
        }
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}
