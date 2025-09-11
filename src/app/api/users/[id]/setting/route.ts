import { NextResponse } from "next/server";
import db from "../../../../../../lib/db";
import sql from "mssql";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context;
  const sqlConnect = await db();
  const res = await sqlConnect
    .request()
    .input("userId", params.id)
    .query("select theme, font, language from users where userId=@userId");

  return NextResponse.json(res.recordset[0]);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { theme, font, language } = body;

    const pool = await db(); // اتصال به دیتابیس
    await pool
      .request()
      .input("theme", sql.NVarChar, theme)
      .input("font", sql.NVarChar, font)
      .input("language", sql.NVarChar, language)
      .input("id", sql.Int, parseInt(params.id))
      .query(
        "UPDATE users SET theme = @theme, font=@font, language=@language WHERE userId = @id"
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json(
      { error: "Failed to insert setting" },
      { status: 500 }
    );
  }
}
