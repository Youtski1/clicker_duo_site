import { NextResponse } from "next/server";
import UserService from "@/app/services/user_service";
import { UserTopLevel } from "@/app/types/user_top_level";

export async function GET() {
    const user_service = new UserService();
    const top_users: UserTopLevel[] | undefined = await user_service.getTopUsersLevel()

    if (!top_users) {
        return new NextResponse("Not found top_users", {status: 404})
    }

    return NextResponse.json({body: top_users}, {status: 200})
}