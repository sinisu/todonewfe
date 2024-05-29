import { Navigate } from 'react-router-dom'

const PrivateRoute = ({user,children}) => {
    //children 리액트에서 자동 제공, 자식컴포넌트를 가져옴
  return user? children:<Navigate to="/login" />
  
}

export default PrivateRoute
