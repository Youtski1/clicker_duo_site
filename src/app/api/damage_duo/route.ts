import { NextRequest, NextResponse } from "next/server";
import DuoService from "@/app/services/duo_service";

const time_last_query: { [telegram_id: number]: Date } = {}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const duo_service = new DuoService();

    if (data.telegram_id in time_last_query) {
        const actual_time = new Date();
        const time: Date = time_last_query[data.telegram_id];
        time.setSeconds(time.getSeconds() + 7);

        if ( time > actual_time) 
            return new NextResponse("delay damage duo", {status: 400})

        time_last_query[data.telegram_id] = actual_time
    }
    else {
        time_last_query[data.telegram_id] = new Date();
    }

    await duo_service.damageDuo(data.telegram_id);
    return new NextResponse("successfully damage duo", {status: 200});
}   

