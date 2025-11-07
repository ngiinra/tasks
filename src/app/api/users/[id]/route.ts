import { NextResponse } from "next/server";
import db from "./../../../../../lib/db";
import sql from "mssql";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sqlConnect = await db();
    const res = await sqlConnect
      .request()
      .input("id", sql.Int, Number(params.id))
      .query("SELECT * FROM users WHERE userId = @id");

    if (res.recordset.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(res.recordset[0]);
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
        `UPDATE users set font=@font, theme=@theme, language=@language,
        fname=@fname, lname=@lname, phone=@phone, email=@email, username=@username, password=@password
         where userId=@userId`
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
