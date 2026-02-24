import { useGetUsersQuery } from "../../../store/api";
import { PageSkeleton } from "../../PageSkeleton";
import DataTable from "./DataTable";
import getColumns from "./getColumns";
import { useMemo, useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { LucideSearch } from "lucide-react";

const DemoPage = () => {
  const columns = useMemo(() => getColumns, []);
  const [search, setSearch] = useState("");

  const { data: users, isLoading, isError } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data,
      isLoading,
      isError,
    }),
  });

  if (isLoading) return <PageSkeleton />;
  if (isError) return <div>Error loading data</div>;

  // Filter users by name (case-insensitive)
  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <div className="w-full max-w-md">
        <Label htmlFor="search" className="mb-1 text-gray-700 font-medium">
          Search Users
        </Label>
        <div className="relative">
          <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <Input
            id="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filteredUsers && (
        <DataTable
          columns={columns}
          data={filteredUsers}
        />
      )}
    </div>
  );
};

export default DemoPage;