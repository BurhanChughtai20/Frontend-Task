import { useGetUsersQuery } from "../../../store/api";
import getColumns from "./get-columns";
import { useMemo, useState } from "react";
import { Input } from "../../ui/input";
import { LucideSearch, Users, SlidersHorizontal, UserCheck } from "lucide-react";
import { PageSkeleton } from "../../page-skeleton";
import DataTable from "./data-table";

const styles = {
  pageGradient: "min-h-screen relative bg-gradient-to-br from-white via-gray-50 to-orange-100",
  card: "rounded-2xl p-5 bg-white shadow-lg border border-orange-100 relative",
  accentGradient: "bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500",
  pill: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold",
  searchInput: "pl-10 h-11 rounded-xl border-orange-200 bg-orange-50/50 text-stone-700 placeholder:text-stone-400 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 focus:bg-white transition-all",
  emptyState: "rounded-2xl p-16 text-center bg-white border-dashed border-orange-200 shadow-sm",
  blobTopRight: "fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none",
  blobBottomLeft: "fixed bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none",
  headerTitle: "text-3xl font-black tracking-tight text-stone-900",
  headerSubtitle: "text-sm mt-1 text-stone-500",
  emptyButton: "mt-5 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg hover:opacity-80",
};

const headerInfo = {
  label: "Directory",
  title: "User Management",
  description: "Browse, search, and manage your user base",
};

const DemoPage = () => {
  const columns = useMemo(() => getColumns, []);
  const [search, setSearch] = useState("");

  const { data: users, isLoading, isError } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({ data, isLoading, isError }),
  });

  if (isLoading) return <PageSkeleton />;

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center p-10 rounded-2xl shadow-lg bg-white border border-orange-100">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-orange-100/10">
            <Users className="w-7 h-7 text-orange-500" />
          </div>
          <p className="text-lg font-semibold text-stone-700">Failed to load users</p>
          <p className="text-sm text-stone-400 mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = users?.length ?? 0;
  const matchedUsers = filteredUsers?.length ?? 0;

  const stats = [
    { icon: <Users className="w-4 h-4" />, label: `${totalUsers} Total Users`, classes: `${styles.pill} ${styles.accentGradient} text-white shadow-lg` },
  ];

  if (search) {
    stats.push({
      icon: <UserCheck className="w-4 h-4" />,
      label: `${matchedUsers} Matched`,
      classes: `${styles.pill} bg-orange-50/20 text-orange-500 border border-orange-200`,
    });
  }

  return (
    <div className={styles.pageGradient}>
      <div className={styles.blobTopRight} style={{ background: "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className={styles.blobBottomLeft} style={{ background: "radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

      <div className="container mx-auto py-10 px-4 space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1 text-orange-500">{headerInfo.label}</p>
            <h1 className={styles.headerTitle}>{headerInfo.title}</h1>
            <p className={styles.headerSubtitle}>{headerInfo.description}</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {stats.map((stat, idx) => (
              <div key={idx} className={stat.classes}>
                {stat.icon}
                {stat.label}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400" />
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px]">
              <LucideSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-500" size={16} />
              <Input
                id="search"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            {search ? (
              <button onClick={() => setSearch("")} className={`${styles.pill} bg-orange-50/20 text-orange-500 border border-orange-200 hover:opacity-80`}>Clear filter</button>
            ) : (
              <div className={`${styles.pill} bg-orange-50/5 text-stone-400 border-dashed border-orange-200`}>
                <SlidersHorizontal className="w-4 h-4" />
                No filters
              </div>
            )}
          </div>
          {search && (
            <p className="text-xs mt-3 text-stone-400">
              Showing <span className="font-semibold text-orange-500">{matchedUsers}</span> of {totalUsers} users matching &quot;{search}&quot;
            </p>
          )}
        </div>

        {filteredUsers && filteredUsers.length > 0 ? (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-orange-100">
            <DataTable columns={columns} data={filteredUsers} />
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-orange-50/20">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-lg font-bold text-stone-900">No users found</p>
            <p className="text-sm mt-1 text-stone-400">Try adjusting your search term</p>
            <button onClick={() => setSearch("")} className={styles.emptyButton}>Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default DemoPage;