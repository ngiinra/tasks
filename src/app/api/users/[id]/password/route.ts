import { NextResponse } from "next/server";
import db from "./../../../../../../lib/db";
import sql from "mssql";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 }
      );
    }

    const pool = await db();
    await pool
      .request()
      .input("id", sql.Int, parseInt(params.id))
      .input("password", sql.NVarChar, newPassword)
      .query("UPDATE users SET password = @password WHERE userId = @id");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}
