import { useState } from 'react';
import { FiLock, FiUser, FiSave } from 'react-icons/fi';
import FormField from '../../components/Forms/FormField';
import Button from '../../components/Forms/Button';
import { authService } from '../../services/authService';
import { usePageTitle } from '../../hooks/usePageTitle';
import '../Birth/Birth.css';
import './Settings.css';

export default function Settings() {
  usePageTitle('Settings');

  const user = JSON.parse(localStorage.getItem('vems_user') || '{}');

  const [passwordForm, setPasswordForm] = useState({
    current_password: '', new_password: '', confirm_password: '',
  });
  const [passwordErrors, setPasswordErrors]   = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError]     = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((p) => ({ ...p, [name]: value }));
    setPasswordErrors((p) => ({ ...p, [name]: '' }));
    setPasswordSuccess('');
    setPasswordError('');
  };

  const validatePassword = () => {
    const e = {};
    if (!passwordForm.current_password)              e.current_password = 'Required';
    if (!passwordForm.new_password)                  e.new_password     = 'Required';
    else if (passwordForm.new_password.length < 6)   e.new_password     = 'Min 6 characters';
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      e.confirm_password = 'Passwords do not match';
    }
    return e;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const errs = validatePassword();
    if (Object.keys(errs).length > 0) { setPasswordErrors(errs); return; }
    setPasswordLoading(true);
    setPasswordError('');
    try {
      await authService.changePassword(passwordForm.current_password, passwordForm.new_password);
      setPasswordSuccess('Password changed successfully.');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setPasswordError(err?.response?.data?.message || err?.message || 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const getRoleLabel = (role) => ({
    admin: 'System Administrator', employee: 'Employee', customer: 'Customer',
  }[role] || role);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Settings</h1>
          <p className="page__subtitle">Manage your account preferences</p>
        </div>
      </div>

      <div className="settings__grid">
        <div className="settings__card">
          <div className="settings__card-header">
            <FiUser size={18} />
            <h2 className="settings__card-title">Account Information</h2>
          </div>
          <div className="settings__card-body">
            {[
              { label: 'Username',  value: user?.username },
              { label: 'Full Name', value: user?.full_name },
              { label: 'Email',     value: user?.email },
              { label: 'Role',      value: getRoleLabel(user?.role) },
            ].map((item) => (
              <div key={item.label} className="settings__info-row">
                <span className="settings__info-label">{item.label}</span>
                <span className="settings__info-value">{item.value || '—'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="settings__card">
          <div className="settings__card-header">
            <FiLock size={18} />
            <h2 className="settings__card-title">Change Password</h2>
          </div>
          <div className="settings__card-body">
            {passwordSuccess && (
              <div className="settings__alert settings__alert--success">{passwordSuccess}</div>
            )}
            {passwordError && (
              <div className="settings__alert settings__alert--error">{passwordError}</div>
            )}
            <form onSubmit={handlePasswordSubmit} noValidate>
              <div className="settings__form-fields">
                <FormField label="Current Password" name="current_password" type="password"
                  value={passwordForm.current_password} onChange={handlePasswordChange}
                  error={passwordErrors.current_password} required placeholder="Enter current password" />
                <FormField label="New Password" name="new_password" type="password"
                  value={passwordForm.new_password} onChange={handlePasswordChange}
                  error={passwordErrors.new_password} required placeholder="Enter new password" hint="Minimum 6 characters" />
                <FormField label="Confirm New Password" name="confirm_password" type="password"
                  value={passwordForm.confirm_password} onChange={handlePasswordChange}
                  error={passwordErrors.confirm_password} required placeholder="Confirm new password" />
              </div>
              <div className="settings__form-actions">
                <Button type="submit" icon={FiSave} loading={passwordLoading}>
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="settings__card settings__card--full">
          <div className="settings__card-header">
            <h2 className="settings__card-title">System Information</h2>
          </div>
          <div className="settings__card-body">
            <div className="settings__sys-grid">
              {[
                { label: 'System Name',  value: 'Vital Events Management System' },
                { label: 'Version',      value: '1.0.0' },
                { label: 'Institution',  value: 'Wollo University — KIoT' },
                { label: 'Department',   value: 'Computer Science' },
              ].map((item) => (
                <div key={item.label} className="settings__sys-item">
                  <span className="settings__info-label">{item.label}</span>
                  <span className="settings__info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
