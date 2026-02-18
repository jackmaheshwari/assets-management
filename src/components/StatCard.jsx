import clsx from "clsx";

// eslint-disable-next-line no-unused-vars
export function StatCard({ title, value, icon: Icon, trend, trendValue, color }) {
    return (
        <div className="stats shadow w-full bg-base-100">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <div className={`p-3 rounded-2xl bg-primary/10`}>
                        <Icon className={`w-6 h-6 text-primary`} />
                    </div>
                </div>
                <div className="stat-title">{title}</div>
                <div className="stat-value">{value}</div>
                {trend && (
                    <div className={clsx("stat-desc flex items-center gap-1", trend === "up" ? "text-success" : "text-error")}>
                        <span>{trend === "up" ? "↑" : "↓"}</span>
                        <span>{trendValue}</span>
                        <span className="text-base-content/60 ml-1">vs last month</span>
                    </div>
                )}
                {!trend && <div className="stat-desc">Total count</div>}
            </div>
        </div>
    );
}
