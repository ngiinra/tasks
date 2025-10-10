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
      .query(
        "SELECT t.* FROM tasks t INNER JOIN (SELECT id, MAX(editTime) AS MaxEditTime FROM tasks WHERE userId = @userId AND deleted = 0 GROUP BY id) latest ON t.id = latest.id AND t.editTime = latest.MaxEditTime WHERE t.userId = @userId AND t.deleted = 0 ORDER BY t.editTime DESC;"
      );
    return NextResponse.json(response.recordset);
  } catch (err) {
    console.error("fetching user tasks error:", err);
    return NextResponse.json(
      { error: "Failed to fetch user tasks" },
      { status: 500 }
    );
  }
}
