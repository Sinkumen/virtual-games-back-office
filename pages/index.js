import Dashboard from "@/contents/Admin/Dashboard";
import MainLayoutLight from "@/layouts/MainLayoutLight";

export default function Home() {
  return (
    <>
      <title>Admin Dashboard</title>
      <MainLayoutLight>
        <Dashboard />
      </MainLayoutLight>
    </>
  );
}
