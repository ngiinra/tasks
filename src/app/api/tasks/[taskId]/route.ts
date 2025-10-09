import { NextResponse } from "next/server";
import db from "../../../../../lib/db";
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
      .query("SELECT * FROM tasks WHERE id = @id");
    return NextResponse.json(res.recordset[0]);
  } catch (err) {
    return NextResponse.json({ error: "Failed to get task" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      tags,
      list,
      state,
      todoDate,
      doneDate,
      estimateHour,
      remainingHour,
      completedHour,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const pool = await db();
    await pool
      .request()
      .input("id", sql.Int, parseInt(params.taskId))
      .input("title", sql.NVarChar, title)
      .input("desc", sql.NVarChar, description)
      .input("tags", sql.NVarChar, tags)
      .input("list", sql.NVarChar, list)
      .input("state", sql.NVarChar, state)
      .input("todoDate", sql.NVarChar, todoDate)
      .input("doneDate", sql.NVarChar, doneDate)
      .input("eHour", sql.NVarChar, estimateHour)
      .input("rHour", sql.NVarChar, remainingHour)
      .input("cHour", sql.NVarChar, completedHour)
      .query(
        "UPDATE tasks SET title =@title, description= @desc, tags= @tags, list= @list, state= @state, todoDate= @todoDate,doneDate=@doneDate, estimateHour= @ehour, remainingHour=@rHour, completedHour= @cHour WHERE id = @id"
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
