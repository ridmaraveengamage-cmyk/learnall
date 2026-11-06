import { Link } from '../router.jsx';
import { Empty } from '../components/Cards.jsx';

export default function NotFound() {
  return (
    <div className="wrap page">
      <Empty icon="compass" title="Page not found">
        That page doesn’t exist. <Link to="/">Go to the home page</Link>
      </Empty>
    </div>
  );
}
