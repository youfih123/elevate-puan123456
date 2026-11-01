
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.source !== "business-overview") {
      return NextResponse.json(
        { message: "Sumber permintaan tidak valid." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      regenerated: false,
      message:
        "Permintaan diterima. Untuk menghasilkan analisis baru, lengkapi assessment dan hubungkan mesin analisis AI.",
    });
  } catch {
    return NextResponse.json(
      { message: "Permintaan tidak valid." },
      { status: 400 }
    );
  }
}
