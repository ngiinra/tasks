import { NextResponse } from "next/server";
import db from "../../../../../../lib/db";
import sql from "mssql";

export async function GET(
  request: Request,
  context: { params: { userId: string } }
) {
  const params = context.params;
  try {
    const sqlConnect = await db();
    const response = await sqlConnect
      .request()
      .input("userId", sql.NVarChar, params.userId)
      .query("SELECT * FROM tasks WHERE userId = @userId");
    return NextResponse.json(response.recordset);
  } catch (err) {
    console.error("fetching user tasks error:", err);
    return NextResponse.json(
      { error: "Failed to fetch user tasks" },
      { status: 500 }
    );
  }
}
