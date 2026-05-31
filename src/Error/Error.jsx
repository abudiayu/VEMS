import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Error.css';

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-page__content">
        <div className="error-page__code">404</div>
        <h1 className="error-page__title">Page Not Found</h1>
        <p className="error-page__desc">
          The page you are looking for does not exist or has been moved.
        </p>
        <button className="error-page__btn" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
