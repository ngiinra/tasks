import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET() {
  try {
    const sqlConnect = await db();
    const response = await sqlConnect
      .request()
      .query("SELECT TOP 1 id FROM tasks ORDER BY id DESC");
    let lastId = response.recordset[0]?.id;
    if (!response.recordset[0]) lastId = 0;
    const generatedId = Number(lastId) + 1;
    return NextResponse.json(generatedId.toString());
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate new id for tasks" },
      { status: 500 }
    );
  }
}
