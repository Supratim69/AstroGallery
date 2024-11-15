import { NextResponse } from "next/server";
import { fetchNasaImages } from "../../../../utils/nasaApi";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const allImages = await fetchNasaImages();
    const paginatedImages = allImages.slice((page - 1) * limit, page * limit);

    return NextResponse.json(paginatedImages);
}
