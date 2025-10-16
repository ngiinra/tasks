import { NextResponse } from "next/server";
import db from "../../../../../../lib/db";
import sql from "mssql";

export async function GET(
  _: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const dbConnect = await db();
    const res = await dbConnect
      .request()
      .input("id", Number(params.taskId))
      .query("SELECT * FROM tasks WHERE id = @id order by editTime");
    return NextResponse.json(res.recordset);
  } catch (err) {
    return NextResponse.json({ error: "Failed to get task" }, { status: 500 });
  }
}
