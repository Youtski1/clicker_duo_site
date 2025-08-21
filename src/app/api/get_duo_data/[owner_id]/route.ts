import { NextRequest, NextResponse } from "next/server";
import DuoService from "@/app/services/duo_service";

export async function GET(req: NextRequest, { params }: { params: { owner_id: string } }) {
    const { owner_id } = await params;
    const duo_service = new DuoService();
    const duo = await duo_service.getData(parseInt(owner_id));
    
    if (!duo)
        return new NextResponse("Not found duo",{status: 404});


    return NextResponse.json({duo: duo}, {status: 200});
};