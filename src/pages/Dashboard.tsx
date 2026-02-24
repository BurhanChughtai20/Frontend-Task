import DashboardHeader from "../components/dashboard/DashboardHeader"
import DemoPage from "../components/dashboard/table/Page"
import { DataChart } from "../shared"

const dashboardCards = [
  { title: "Visitors", description: "Jan - Jun 2024", dataKey: "desktop", barColor: "var(--color-desktop)" },
  { title: "Sales", description: "Jan - Jun 2024", dataKey: "sales", barColor: "var(--color-sales)" },
  { title: "Revenue", description: "Jan - Jun 2024", dataKey: "revenue", barColor: "var(--color-revenue)" },
]

const Dashboard = () => {
  return (
    <>
      <DashboardHeader title="Dashboard" />

      <div className="hidden lg:grid lg:grid-cols-3 gap-4 p-4">
        {dashboardCards.map((card, idx) => (
          <DataChart key={idx} {...card} />
        ))}
      </div>

      <div className="lg:hidden overflow-x-auto py-4 px-2">
        <div className="flex gap-4 min-w-max">
          {dashboardCards.map((card, idx) => (
            <div key={idx} className="w-72 shrink-0">
              <DataChart {...card} />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto py-10">
        <DemoPage />
      </div>
    </>
  )
}

export default Dashboard