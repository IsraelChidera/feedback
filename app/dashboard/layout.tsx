import type { Metadata } from "next";
import DashboardNav from "@/components/widget/DasboardNav";
import Sidebar from "@/components/widget/Sidebar";
import { redirect } from 'next/navigation';
import { createClient } from "../utils/supabase/server";

export const metadata: Metadata = {
    title: "Feedback Share - Dashboard",
    description: "",
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const supabase = createClient();
    const {data, error} = await supabase.auth.getUser();
  
    if(error || !data.user){
        return redirect('/login');
    }

    return (
        <main className='bg-[#EBEBEB] flex relative'>
            <div className='md:block hidden bg-white z-30 fixed top-0 left-0 h-screen'>
                <Sidebar />
            </div>
            <div className='relative md:pl-[250px] w-full'>

                <div className="relative">
                    <div className="sticky z-40 top-0 right-0">
                        <DashboardNav />
                    </div>
                    {children}
                </div>

                <footer className="bg-white fixed bottom-0 left-0 w-full">
                    <p className="text-center text-sm pt-2 pb-4">&copy; 2024 | Israel Chidera</p>
                </footer>
            </div>


        </main>
    );
}
