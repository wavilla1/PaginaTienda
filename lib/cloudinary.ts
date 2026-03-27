import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export function canUploadToCloudinary() {
  return Boolean(cloudName && apiKey && apiSecret);
}

export function configureCloudinary() {
  if (!canUploadToCloudinary()) {
    return false;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return true;
}

export async function uploadProofBuffer(buffer: Buffer, fileName: string) {
  const configured = configureCloudinary();

  if (!configured) {
    return null;
  }

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ecommerce-transfer-proofs",
        public_id: `${Date.now()}-${fileName.replace(/\s+/g, "-")}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("No se pudo subir el comprobante."));
          return;
        }

        resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });
}
