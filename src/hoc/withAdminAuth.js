import { useAdminAuth } from '../hooks';

const WithAdminAuth = (props) => useAdminAuth() && props.children;

export default WithAdminAuth;
