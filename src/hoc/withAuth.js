import { useAuth } from '../hooks';

const WithAuth = (props) => useAuth() && props.children;

export default WithAuth;
