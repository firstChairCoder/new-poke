import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./src/navigation/RootStack";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  );
}
