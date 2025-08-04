import EmptyDataPlaceholder from "@/components/EmptyDataPlaceholder";
import { getTenantColor } from "@/constants/colors";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AppDonutChart = ({ labels = [], series = [] }) => {
  const [chartWidth, setChartWidth] = useState(400);

  // Dynamically adjust chart width based on window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth > 768 ? 400 : 340; // 90% of viewport width on mobile
      setChartWidth(width);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const donutOptions = useMemo(() => {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    const primaryColor = getTenantColor(tenantId);
    return {
      labels,
      colors: [primaryColor, "#FF6384", "#524573", "#4BC0C0", "#909197"],
      dataLabels: {
        enabled: true,
        dropShadow: { enabled: false },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              value: {
                show: true,
                fontSize: window.innerWidth > 768 ? "14px" : "12px",
                color: "#000",
                offsetY: 5,
              },
              total: {
                show: true,
                label: "Total",
                fontSize: window.innerWidth > 768 ? "16px" : "14px",
                color: "#000",
                formatter: (w) =>
                  w.globals.seriesTotals.reduce((a, b) => a + b, 0),
              },
            },
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        fontSize: "12px",
      },
    };
  }, [labels]);

  const donutSeries = useMemo(() => {
    return series;
  }, [series]);

  if (!series.length) {
    return <EmptyDataPlaceholder />;
  }

  return (
    <div className="mixed-chart">
      <div className="mixed-chart">
        {labels.length > 0 && series.length > 0 && (
          <Chart
            options={donutOptions}
            series={donutSeries}
            type="donut"
            width={chartWidth}
          />
        )}
      </div>
    </div>
  );
};

export default AppDonutChart;
