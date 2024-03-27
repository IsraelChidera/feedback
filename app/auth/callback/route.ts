import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const cookieStore: any = cookies();
        const supabase= createRouteHandlerClient<any>({ cookies: () => cookieStore });
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL('/dashboard', request.url))
}