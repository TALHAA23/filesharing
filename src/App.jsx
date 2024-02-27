import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./Routes/Routes";
import UserProvider from "./Hooks/UserProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </QueryClientProvider>
  );
}
