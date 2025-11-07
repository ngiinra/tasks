import { NextResponse } from "next/server";
import db from "../../../../../../lib/db";
import sql from "mssql";

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const body = await request.json();
  const { text, value, active } = body;
  const params = context.params;
  try {
    const sqlConnect = await db();
    await sqlConnect
      .request()
      .input("userId", sql.Int, Number(params.id))
      .input("text", sql.NVarChar, text)
      .input("value", sql.NVarChar, value)
      .input("active", sql.Bit, active)
      .query(
        "INSERT INTO tags (text, value, userId, active) values (@text, @value, @userId, @active)"
      );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Insert error:", JSON.stringify(e, null, 2));

    return NextResponse.json(
      { error: "Added tag has failed." },
      { status: 500 }
    );
  }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const sqlConnect = await db();
    const res = await sqlConnect
      .request()
      .input("userId", sql.NVarChar, params.id)
      .query("SELECT * FROM tags WHERE userId = @userId");
    return NextResponse.json(res.recordset);
  } catch (e) {
    console.error("Insert error:", JSON.stringify(e, null, 2));

    return NextResponse.json(
      { error: "Getting list has failed." },
      { status: 500 }
    );
  }
}
