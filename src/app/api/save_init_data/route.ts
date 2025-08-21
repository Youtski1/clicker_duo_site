import { NextRequest, NextResponse} from "next/server";
import ValidateService from "@/app/services/validaty_service";
import { init } from "next/dist/compiled/webpack/webpack";

export async function POST(req: NextRequest){
    const initData = await req.json()

    if (!initData){
        return new NextResponse("not found initData",{status:400})
    }

    const validate_service = new ValidateService()
    const res = await validate_service.createUserData(initData)

    if (res.status == 200){
        return new NextResponse("create init data",{status:200})
    }
    else if (res.status == 400){
        return new NextResponse("fake init data", {status:400})
    }



}