// src/app/api/upload/route.ts - WITH DEBUG LOGGING
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: Request) {
  try {
    console.log("=== UPLOAD REQUEST RECEIVED ===");
    
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string || "general";
    
    console.log("File received:", file?.name);
    console.log("File type:", file?.type);
    console.log("File size:", file?.size);
    console.log("Upload type:", type);

    if (!file) {
      console.log("ERROR: No file provided");
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      console.log("ERROR: Invalid file type:", file.type);
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      console.log("ERROR: File too large:", file.size);
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = timestamp + "-" + originalName;
    console.log("Generated filename:", filename);

    // Determine upload directory based on file type
    let uploadDir = "public/uploads";
    
    if (type === "menu") {
      uploadDir = "public/uploads/menu";
    } else if (type === "gallery") {
      uploadDir = "public/uploads/gallery";
    }
    console.log("Upload directory:", uploadDir);

    // Ensure directory exists
    const fullPath = path.join(process.cwd(), uploadDir);
    if (!existsSync(fullPath)) {
      console.log("Creating directory:", fullPath);
      await mkdir(fullPath, { recursive: true });
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(fullPath, filename);
    await writeFile(filePath, buffer);
    console.log("File saved to:", filePath);

    // Return the public URL
    const publicUrl = "/" + uploadDir.replace("public/", "") + "/" + filename;
    console.log("Public URL:", publicUrl);
    console.log("=== UPLOAD SUCCESS ===");

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
    });
  } catch (error) {
    console.error("=== UPLOAD ERROR ===");
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file: " + (error as Error).message },
      { status: 500 }
    );
  }
}
