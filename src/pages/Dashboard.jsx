import { LayoutDashboard, Monitor, Package, Server } from "lucide-react";
import { StatCard } from "../components/StatCard";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const data = [
    { name: 'Hardware', value: 567 },
    { name: 'Software', value: 432 },
    { name: 'Non-IT', value: 235 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

const activityData = [
    { name: 'Mon', assets: 12 },
    { name: 'Tue', assets: 19 },
    { name: 'Wed', assets: 8 },
    { name: 'Thu', assets: 15 },
    { name: 'Fri', assets: 22 },
];

export default function Dashboard() {
    return (
        <div className="space-y-8">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Assets"
                    value="1,234"
                    icon={LayoutDashboard}
                    trend="up"
                    trendValue="12"
                    color="bg-primary"
                />
                <StatCard
                    title="Hardware"
                    value="567"
                    icon={Server}
                    trend="up"
                    trendValue="5"
                    color="bg-secondary"
                />
                <StatCard
                    title="Software"
                    value="432"
                    icon={Package}
                    trend="up"
                    trendValue="8"
                    color="bg-accent"
                />
                <StatCard
                    title="Non-IT"
                    value="235"
                    icon={Monitor}
                    trend="down"
                    trendValue="2"
                    color="bg-warning"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Asset Distribution Chart */}
                <div className="card bg-base-100 shadow-xl overflow-hidden">
                    <div className="card-body p-6">
                        <h2 className="card-title text-base-content/80 mb-6">Asset Distribution</h2>
                        <div className="w-full h-[300px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="60%"
                                        outerRadius="80%"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--color-base-100)', borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: 'var(--color-base-content)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Chart */}
                <div className="card bg-base-100 shadow-xl overflow-hidden">
                    <div className="card-body p-6">
                        <h2 className="card-title text-base-content/80 mb-6">Assets Added (Last 5 Days)</h2>
                        <div className="w-full h-[300px] md:h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activityData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-base-300)" opacity={0.3} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--color-base-content)', opacity: 0.6, fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--color-base-content)', opacity: 0.6, fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--color-base-100)', borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ fill: 'var(--color-base-200)', opacity: 0.4 }}
                                        itemStyle={{ color: 'var(--color-base-content)' }}
                                    />
                                    <Bar dataKey="assets" fill="var(--color-primary)" radius={[8, 8, 0, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
