const { useEffect } = require('react');
const { useSelector } = require('react-redux');
const { useNavigate } = require('react-router-dom');
const { selectCurrentUser } = require('../features/User/userSlice');

const useAuth = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
