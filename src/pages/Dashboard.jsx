import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Dashboard = () => {
  // Theme: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("eduhub_theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    // Apply theme class to html element so Tailwind's dark: utilities work
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("eduhub_theme", theme);
    } catch {}
  }, [theme]);

  // Accent colors
  const ACCENT_LIGHT = "#7B6EF6"; // original lavender for light mode
  const ACCENT_DARK = "#2563EB"; // blue accent for dark mode (user requested blue)
  const accentColor = theme === "dark" ? ACCENT_DARK : ACCENT_LIGHT;

  // Dummy data
  const stats = [
    { title: "Total Students", value: "1,250", change: "+5.2%" },
    { title: "Active Courses", value: "32", change: "+3.1%" },
    { title: "Attendance Rate", value: "92%", change: "-1.4%" },
    { title: "Assignments Pending", value: "48", change: "+2.8%" },
  ];

  const chartData = [
    { month: "Jan", students: 300 },
    { month: "Feb", students: 450 },
    { month: "Mar", students: 500 },
    { month: "Apr", students: 420 },
    { month: "May", students: 460 },
    { month: "Jun", students: 380 },
    { month: "Jul", students: 490 },
    { month: "Aug", students: 520 },
  ];

  const performanceData = [
    { name: "Completed", value: 75 },
    { name: "Remaining", value: 25 },
  ];
  const PERFORMANCE_COLORS_LIGHT = [accentColor, "#E5E5FF"];
  const PERFORMANCE_COLORS_DARK = [accentColor, "#1F2937"]; // second slice darker in dark mode
  const performanceColors =
    theme === "dark" ? PERFORMANCE_COLORS_DARK : PERFORMANCE_COLORS_LIGHT;

  const activities = [
    {
      date: "11 Oct 2025",
      activity: "New course added: React Basics",
      status: "Completed",
    },
    {
      date: "10 Oct 2025",
      activity: "Assignment submitted: Data Structures",
      status: "Pending",
    },
    {
      date: "09 Oct 2025",
      activity: "Student enrolled: Mousam Gorai",
      status: "Completed",
    },
    {
      date: "07 Oct 2025",
      activity: "Attendance report generated",
      status: "Completed",
    },
  ];

  // motion presets
  const cardMotion = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.48 },
  };
  const chartMotion = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  };

  return (
    <div
      className={`min-h-screen px-6 py-6 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-[#f8f7ff] text-slate-800"
      }`}
    >
      {/* HEADER */}
      <motion.div
        {...cardMotion}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-semibold">Welcome back to EduHub!</h1>
          <p className="text-sm text-gray-500 dark:text-slate-300/70">
            Your academic overview at a glance
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label="Toggle theme"
            className="flex items-center gap-2 rounded-xl px-3 py-2 border transition-colors duration-200
                       bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-sm"
          >
            {theme === "dark" ? (
              <>
                {/* Sun icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v2m0 14v2m8.66-10h-2M5.34 12H3m15.36 6.36-1.42-1.42M7.05 7.05 5.63 5.63m12.02 12.02-1.42-1.42M7.05 16.95 5.63 18.37"
                  />
                </svg>
                <span className="text-sm">Light</span>
              </>
            ) : (
              <>
                {/* Moon icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-sky-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707 8 8 0 1017.293 13.293z" />
                </svg>
                <span className="text-sm">Dark</span>
              </>
            )}
          </button>

          <button
            className="bg-[rgba(37,99,235,0.12)] text-[rgb(37,99,235)] px-3 py-2 rounded-xl text-sm font-medium shadow-sm hover:opacity-95 transition"
            style={{
              border: `1px solid ${
                theme === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(37,99,235,0.14)"
              }`,
            }}
          >
            + Add Widget
          </button>
        </div>
      </motion.div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.46 }}
            className={`rounded-2xl p-5 border ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-100"
            } shadow-sm`}
          >
            <p className="text-sm text-gray-500 dark:text-slate-300/70">
              {s.title}
            </p>
            <div className="flex items-baseline justify-between mt-2">
              <h2 className="text-2xl font-semibold">{s.value}</h2>
              <span
                className={`text-sm font-medium ${
                  s.change.includes("-") ? "text-red-400" : "text-green-400"
                }`}
              >
                {s.change}
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-slate-300/60 mt-1">
              vs last month
            </p>
          </motion.div>
        ))}
      </div>

      {/* MIDDLE (Charts + Performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Enrollment Bar Chart */}
        <motion.div
          {...chartMotion}
          className={`col-span-2 rounded-2xl p-6 border shadow-sm ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-100"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">
            Student Enrollment Trend
          </h3>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme === "dark" ? "#1f2937" : "#f1f5f9"}
                />
                <XAxis
                  dataKey="month"
                  stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                />
                <YAxis stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
                <Tooltip />
                <Bar
                  dataKey="students"
                  radius={[8, 8, 0, 0]}
                  fill={accentColor}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Pie */}
        <motion.div
          {...chartMotion}
          className={`rounded-2xl p-6 border shadow-sm ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-100"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>

          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={performanceData}
                  innerRadius={48}
                  outerRadius={80}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                >
                  {performanceData.map((entry, idx) => (
                    <Cell
                      key={`perf-${idx}`}
                      fill={performanceColors[idx % performanceColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center mt-2 text-sm text-gray-500 dark:text-slate-300/70">
            75% overall performance achieved
          </p>
        </motion.div>
      </div>

      {/* RECENT ACTIVITIES */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-2xl p-6 border shadow-sm ${
          theme === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-100"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 dark:text-slate-300/70 border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Activity</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.36 }}
                  className="border-b last:border-none"
                >
                  <td className="py-3">{act.date}</td>
                  <td className="py-3">{act.activity}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        act.status === "Completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                      }`}
                    >
                      {act.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
