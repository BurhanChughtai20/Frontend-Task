import { Skeleton } from "./ui/skeleton";


export function PageSkeleton() {
  return (
    <div className="flex space-x-4 p-4">
      <div className="w-64 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full" />
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <th key={idx}>
                    <Skeleton className="h-6 w-full" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {Array.from({ length: 5 }).map((_, colIdx) => (
                    <td key={colIdx} className="p-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}