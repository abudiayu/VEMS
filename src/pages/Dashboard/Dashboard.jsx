import { useState, useEffect } from 'react';
import { FiBookOpen, FiAlertCircle, FiHeart, FiScissors, FiUsers, FiTrendingUp } from 'react-icons/fi';
import StatCard from '../../components/Cards/StatCard';
import { reportService } from '../../services/reportService';
import { usePageTitle } from '../../hooks/usePageTitle';
import './Dashboard.css';

const COLUMNS = ['Registration No.', 'Type', 'Name', 'Date', 'Status'];

const FALLBACK_STATS = { births: 0, deaths: 0, marriages: 0, divorces: 0, total_users: 0, total_events: 0 };
const FALLBACK_EVENTS = [];

export default function Dashboard() {
  usePageTitle('Dashboard');

  const [stats, setStats]               = useState(FALLBACK_STATS);
  const [recentEvents, setRecentEvents] = useState(FALLBACK_EVENTS);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    reportService.getDashboardStats()
      .then((res) => {
        setStats(res?.data?.stats || FALLBACK_STATS);
        setRecentEvents(res?.data?.recent_events || FALLBACK_EVENTS);
      })
      .catch(() => {
        setStats(FALLBACK_STATS);
        setRecentEvents(FALLBACK_EVENTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const statusClass = (s) => ({
    registered: 'badge badge--green',
    pending:    'badge badge--orange',
    updated:    'badge badge--blue',
  }[s?.toLowerCase()] || 'badge badge--gray');

  const user = JSON.parse(localStorage.getItem('vems_user') || '{}');

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            Welcome back, <strong>{user?.username || 'Admin'}</strong>. Here is today's overview.
          </p>
        </div>
        <div className="dashboard__date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="dashboard__stats">
        <StatCard title="Birth Records"    value={loading ? '...' : stats.births}       icon={FiBookOpen}    color="blue"   trend={4}  trendLabel="this month" />
        <StatCard title="Death Records"    value={loading ? '...' : stats.deaths}       icon={FiAlertCircle} color="red"    trend={-2} trendLabel="this month" />
        <StatCard title="Marriage Records" value={loading ? '...' : stats.marriages}    icon={FiHeart}       color="green"  trend={6}  trendLabel="this month" />
        <StatCard title="Divorce Records"  value={loading ? '...' : stats.divorces}     icon={FiScissors}    color="orange" trend={1}  trendLabel="this month" />
        <StatCard title="Total Events"     value={loading ? '...' : stats.total_events} icon={FiTrendingUp}  color="purple" />
        <StatCard title="Registered Users" value={loading ? '...' : stats.total_users}  icon={FiUsers}       color="blue" />
      </div>

      <div className="dashboard__recent">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Recent Events</h2>
        </div>
        <div className="dashboard__table-wrap">
          <table className="dashboard__table">
            <thead>
              <tr>{COLUMNS.map((c) => <th key={c}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="dashboard__table-empty">
                  <div className="dashboard__loading"><div className="spinner" /><span>Loading...</span></div>
                </td></tr>
              ) : recentEvents.length === 0 ? (
                <tr><td colSpan={5} className="dashboard__table-empty">No recent events found.</td></tr>
              ) : (
                recentEvents.map((ev, i) => (
                  <tr key={ev.id || i}>
                    <td>{ev.registration_no}</td>
                    <td><span className={`badge badge--${ev.type?.toLowerCase()}`}>{ev.type}</span></td>
                    <td>{ev.name}</td>
                    <td>{ev.date}</td>
                    <td><span className={statusClass(ev.status)}>{ev.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
