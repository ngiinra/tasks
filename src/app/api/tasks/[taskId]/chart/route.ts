import { NextResponse } from "next/server";
import db from "../../../../../../lib/db";

export async function GET(
  _: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const dbConnect = await db();
    const res = await dbConnect
      .request()
      .input("id", Number(params.taskId))
      .query(
        "WITH RankedTasks AS ( SELECT *, CAST(editTime AS DATE) AS editDate, ROW_NUMBER() OVER (PARTITION BY CAST(editTime AS DATE) ORDER BY editTime DESC) AS rn FROM tasks WHERE id = @id) SELECT * FROM RankedTasks WHERE rn = 1 ORDER BY editDate;"
      );
    return NextResponse.json(res.recordset);
  } catch (err) {
    return NextResponse.json({ error: "Failed to get task" }, { status: 500 });
  }
}
