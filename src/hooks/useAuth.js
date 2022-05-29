const { useEffect } = require('react');
const { useSelector } = require('react-redux');
const { useNavigate } = require('react-router-dom');

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = () => {
  const currentUser = useSelector(mapState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
