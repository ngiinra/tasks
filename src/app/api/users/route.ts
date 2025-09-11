import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import sql from "mssql";

export async function GET() {
  const sqlConnect = await db();
  const res = await sqlConnect.request().query("Select * from users");
  return NextResponse.json(res);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fname,
      lname,
      username,
      password,
      email,
      phone,
      theme,
      font,
      language,
    } = body;

    const pool = await db();
    await pool
      .request()
      .input("fname", sql.NVarChar, fname)
      .input("lname", sql.NVarChar, lname)
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .input("email", sql.NVarChar, email)
      .input("theme", sql.NVarChar, theme)
      .input("font", sql.NVarChar, font)
      .input("language", sql.NVarChar, language)
      .input("phone", sql.NVarChar, phone)
      .query(
        `INSERT INTO users (font, theme, language, userId, fname, lname, phone, email, username, password)
         VALUES (@font, @theme, @language, @userId, @fname, @lname, @phone, @email, @username, @password)`
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json(
      { error: "Failed to insert user" },
      { status: 500 }
    );
  }
}
