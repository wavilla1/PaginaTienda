import { NextResponse } from "next/server";
import { uploadProofBuffer } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const proof = formData.get("proof");

    if (!(proof instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "No se recibio el archivo de comprobante." },
        { status: 400 },
      );
    }

    const arrayBuffer = await proof.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const uploadedUrl = await uploadProofBuffer(fileBuffer, proof.name);

    if (!uploadedUrl) {
      return NextResponse.json(
        {
          ok: false,
          message: "Cloudinary no esta configurado. Define variables CLOUDINARY_*.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, url: uploadedUrl });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "No se pudo subir el comprobante.",
      },
      { status: 500 },
    );
  }
}
