import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("path");
  if (!filePath) return new NextResponse("missing path", { status: 400 });

  // Prevent path traversal
  const publicDir = path.join(process.cwd(), "public");
  const resolved = path.resolve(publicDir, filePath);
  if (!resolved.startsWith(publicDir)) {
    return new NextResponse("forbidden", { status: 403 });
  }

  if (!fs.existsSync(resolved)) {
    return new NextResponse("not found", { status: 404 });
  }

  const buffer = fs.readFileSync(resolved);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
