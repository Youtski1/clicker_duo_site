import { NextRequest, NextResponse } from "next/server";
import ValidateService from "@/app/services/validaty_service";

interface Params {
    telegram_id: string;
  }
  
export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
    const { telegram_id } = await params;

    if (!telegram_id){
        return new NextResponse("not found telegram_id",{status:400})
    }
    const validate_service = new ValidateService()
    const initData = await validate_service.getUserData(parseInt(telegram_id))

    if (!initData){
        return NextResponse.json({initData: false},{status:200})
    }
    else{
        return NextResponse.json({initData: true},{status:200})
    }

}