
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { category, note } = body;

    const allowed = [
      "finansial",
      "confidence",
      "rekomendasi",
      "lainnya",
    ];

    if (
      !allowed.includes(category) ||
      typeof note !== "string" ||
      note.trim().length < 3 ||
      note.length > 2000
    ) {
      return NextResponse.json(
        { message: "Pilih kategori dan isi penjelasan minimal 3 karakter." },
        { status: 400 }
      );
    }

    // Demo: menerima dan memvalidasi masukan.
    // Belum menyimpan ke database atau memperbarui analisis.
    return NextResponse.json({
      success: true,
      message:
        "Masukan diterima oleh backend demo. Analisis belum diperbarui.",
    });
  } catch {
    return NextResponse.json(
      { message: "Format data tidak valid." },
      { status: 400 }
    );
  }
}
