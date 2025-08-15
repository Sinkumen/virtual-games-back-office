import { getTenantColor, getTenantLightColor } from "@/constants/colors";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AppBarChart = ({ categories = [], series = [] }) => {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const primaryColor = getTenantColor(tenantId);
  const primaryLightColor = getTenantLightColor(tenantId);

  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState(450);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        const barWidth = 40; // Adjust this value to change the width of each bar
        const calculatedWidth = categories.length * barWidth * series.length;
        setWidth(Math.max(calculatedWidth, 350)); // Ensure a minimum width
        setHeight(250);
      } else {
        setWidth("100%");
        setHeight(450);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [categories, series]);

  const barOptions = useMemo(
    () => ({
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      colors: [primaryColor, primaryLightColor],
      xaxis: {
        categories,

        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
          // borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: "#e0e0e0",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter: (val) => `${val}`,
        },
      },
      legend: {
        show: true,
        horizontalAlign: "left",
      },
    }),
    [categories, primaryColor, primaryLightColor]
  );

  const barSeries = useMemo(() => series, [series]);

  return (
    <div
      className="mixed-chart"
      style={{ overflowX: width === "100%" ? "hidden" : "auto" }}
    >
      <Chart
        options={barOptions}
        series={barSeries}
        type="bar"
        height={height}
        width={width}
      />
    </div>
  );
};

export default AppBarChart;
