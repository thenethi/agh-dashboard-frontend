export const data = {
  labels: ["2019", "2020", "2021", "2022", "2023"],
  datasets: [
    {
      label: "Hires per Year",
      data: [160, 150, 120, 180, 220],
      backgroundColor: "#00e676",
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: true,
      text: "Year-wise Hiring Data",
      color: "#fff",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#fff",
      },
    },
    y: {
      ticks: {
        color: "#fff",
      },
    },
  },
};

export const pieData = {
  labels: ["Technical", "Marketing", "HR", "Sales", "Finance"],
  datasets: [
    {
      label: "Department-wise Hiring",
      data: [40, 20, 15, 10, 15],
      backgroundColor: ["#00e676", "#ff9100", "#ff1744", "#2196f3", "#9c27b0"],
      hoverBackgroundColor: [
        "#00c853",
        "#ff6d00",
        "#d50000",
        "#1976d2",
        "#7b1fa2",
      ],
    },
  ],
};

export const pieOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "#fff",
      },
    },
  },
};

export const layout = [
  { i: "a", x: 0, y: 0, w: 4, h: 2 },
  { i: "b", x: 4, y: 0, w: 4, h: 2 },
  { i: "c", x: 8, y: 0, w: 4, h: 2 },
  { i: "d", x: 0, y: 2, w: 4, h: 2 },
  { i: "e", x: 4, y: 2, w: 4, h: 2 },
  { i: "f", x: 8, y: 2, w: 4, h: 2 },
];

export const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
export const cols = { lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 };
