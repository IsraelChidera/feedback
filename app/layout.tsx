import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "@/store/features/User/UserContext";
import { FeedbackContextProvider } from "@/store/features/Feedback/FeedbackContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import QueryClientProviders from "@/store/QueryClientProviders";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core"; 

export const metadata: Metadata = {
  title: "Feedback Share - Get More Done with Feedback Share",
  description: "Seamlessly collect, organize, and share insights across all your products ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <CopilotKit runtimeUrl="/api/copilotkit">          
        <QueryClientProviders>
          <UserContextProvider>
            <FeedbackContextProvider>
              {children}
              <ToastContainer />
            </FeedbackContextProvider>
          </UserContextProvider>
        </QueryClientProviders>
        </CopilotKit>
      </body>
    </html>
  );
}
