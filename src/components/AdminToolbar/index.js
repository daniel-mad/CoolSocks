import './styles.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from '../../utils';

const mapState = ({ user }) => ({ currentUser: user.currentUser });

function AdminToolbar() {
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAdmin(currentUser);
  if (!isAdmin) return null;

  return (
    <div className='adminToolbar'>
      <ul>
        <li className='admin-link'>
          <Link to='admin'>My Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminToolbar;
