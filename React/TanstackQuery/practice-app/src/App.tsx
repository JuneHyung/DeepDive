import "./App.css";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./api/api";
import { queryClient } from "./api/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Users = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
  });

  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>Error Loading users </p>;

  return (
    <ul>
      {data.map((user: { id: number; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Users</h1>
      <Users />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
