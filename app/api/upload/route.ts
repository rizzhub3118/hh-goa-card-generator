import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    const base64 = image.split(",")[1];
    const buffer = Buffer.from(base64, "base64");

    const filename = `cards/${Date.now()}.png`;

    const blob = await put(filename, buffer, {
      access: "public",
      contentType: "image/png",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 }
    );
  }
}