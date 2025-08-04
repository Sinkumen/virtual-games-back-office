import { getTenantColor, getTenantLightColor } from "@/constants/colors";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AppBarChart = ({ categories = [], series = [] }) => {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const primaryColor = getTenantColor(tenantId);
  const primaryLightColor = getTenantLightColor(tenantId);

  const [chartWidth, setChartWidth] = useState(400);

  // Dynamically adjust chart width based on window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth > 768 ? 400 : 350; // 90% of viewport width on mobile
      setChartWidth(width);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const barOptions = useMemo(
    () => ({
      chart: { id: "basic-bar" },
      colors: [primaryColor, primaryLightColor],
      xaxis: {
        categories,
      },
      plotOptions: {
        bar: {
          borderRadiusApplication: "end",
          horizontal: false,
        },
      },
    }),
    [categories]
  );

  const barSeries = useMemo(() => series, [series]);

  return (
    <div className="mixed-chart">
      <Chart
        options={barOptions}
        series={barSeries}
        type="bar"
        width={chartWidth}
      />
    </div>
  );
};

export default AppBarChart;
