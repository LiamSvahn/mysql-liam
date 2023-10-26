import { query } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(req: Request, {params}: {params: {id: string}}) {
    const {id} = params;
    console.log("id", id)
    const result = await query({
        sql: "SELECT * FROM documents where id = " + parseInt(id),
        values: []
    });
    return NextResponse.json(result, {status: 200});
}

export async function PATCH(req: Request,{params}: {params: {id: string}}){
    const {id} = params;
    const body = await req.json();
    const {user, product} = body;
    const result = await query({
        sql: "UPDATE documents SET user=?, product=? WHERE ID =" + parseInt(id),
        values: [user, product]
    })
    return NextResponse.json(result, {status: 200})
}

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    const {id} = params;
    console.log("id removed", id)

    const result = await query({
        sql: "DELETE FROM documents where id = " + parseInt(id),
        values: []
    });
    return NextResponse.json(result, {status: 200});
}