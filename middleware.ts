import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './app/utils/supabase/middleware'


export async function middleware(request: NextRequest) {

    try {
       

        return await updateSession(request)
    } catch (error) {
        console.log("Middleware error: ", error);
    }
}


export const config = {
    matcher: [
        '/login',
        '/dashboard',
        '/dashboard/profile',
        '/dashboard/add-admin-feedback',
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}
