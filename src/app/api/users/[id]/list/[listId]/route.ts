import { NextResponse } from "next/server";
import db from "../../../../../../../lib/db";
import sql from "mssql";

export async function POST(
  request: Request,
  context: { params: { id: string; listId: string } }
) {
  const body = await request.json();
  const { text, value, active } = body;
  const params = context.params;
  try {
    const sqlConnect = await db();
    await sqlConnect
      .request()
      .input("id", sql.Int, Number(params.listId))
      .input("text", sql.NVarChar, text)
      .input("value", sql.NVarChar, value)
      .input("active", sql.Bit, active)
      .query(
        "UPDATE lists set text= @text, value= @value, active=@active where id=@id"
      );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("update error:", JSON.stringify(e, null, 2));

    return NextResponse.json(
      { error: "update list has failed." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { listId: string } }
) {
  const params = await context.params;
  try {
    const sqlConnect = await db();
    await sqlConnect
      .request()
      .input("id", sql.Int, Number(params.listId))
      .query("delete from list where id=@id");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("delete error:", JSON.stringify(e, null, 2));

    return NextResponse.json(
      { error: "delete list has failed." },
      { status: 500 }
    );
  }
}
