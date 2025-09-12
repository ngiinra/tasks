import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import sql from "mssql";

export async function GET() {
  const sqlConnect = await db();
  const res = await sqlConnect.request().query("Select * from tasks");
  return NextResponse.json(res);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      list,
      tags,
      doneDate,
      todoDate,
      userId,
      deleted,
      state,
    } = body;
    const pool = await db();
    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("id", sql.NVarChar, id)
      .input("description", sql.NVarChar, description)
      .input("tags", sql.NVarChar, tags)
      .input("list", sql.NVarChar, list)
      .input("todoDate", sql.NVarChar, todoDate)
      .input("doneDate", sql.NVarChar, doneDate)
      .input("userId", sql.NVarChar, userId)
      .input("state", sql.NVarChar, state)
      .input("deleted", sql.Bit, deleted)
      .query(
        `INSERT INTO tasks (id, title, description, tags, list, todoDate, doneDate, userId, state, deleted)
         VALUES (@id, @title, @description, @tags, @list, @todoDate, @doneDate, @userId, @state, @deleted)`
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Insert error:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      { error: "Failed to insert task" },
      { status: 500 }
    );
  }
}
