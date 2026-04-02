// src/app/api/upload/route.ts - Local file system version
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = timestamp + "-" + originalName;

    // Determine upload directory based on file type
    let uploadDir = "public/uploads";
    const type = formData.get("type") || "general";
    
    if (type === "menu") {
      uploadDir = "public/uploads/menu";
    } else if (type === "gallery") {
      uploadDir = "public/uploads/gallery";
    }

    // Ensure directory exists
    const fullPath = path.join(process.cwd(), uploadDir);
    if (!existsSync(fullPath)) {
      await mkdir(fullPath, { recursive: true });
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(fullPath, filename);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = "/" + uploadDir.replace("public/", "") + "/" + filename;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
