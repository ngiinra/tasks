import { NextResponse } from "next/server";
import db from "../../../../../../lib/db";
import sql from "mssql";
export async function POST(
  _: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const dbConnect = await db();
    const res = await dbConnect
      .request()
      .input("id", Number(params.taskId))
      .query("update [dbo].[tasks] SET [deleted] = 1  WHERE [id]= @id");
    return NextResponse.json({ success: res.rowsAffected[0] > 0 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
