import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
import sql from "mssql";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const sqlConnect = await db();
    const result = await sqlConnect
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .query(
        `SELECT * FROM users WHERE username = @username and password= @password`
      );
    const user = result.recordset[0];

    if (user && user.userId) {
      const response = NextResponse.json({ success: true, user });

      // ست کردن کوکی
      response.cookies.set("user", String(user.userId).trim(), {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 هفته
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json(
      { error: "Failed to find login user" },
      { status: 500 }
    );
  }
}
