import { lazy } from 'react'
import { RouteProps } from 'react-router'

export interface PrivateRouteObject extends RouteProps {
  exact: boolean
  path: string
  breadcrumb: string
  component: any
  title: string
}

const Posts = lazy(() => import('../containers/PostManagement'))
const Login = lazy(() => import('../containers/Login'))
const Register = lazy(() => import('../containers/Register'))

const PRIVATE_ROUTES: PrivateRouteObject[] = [
  {
    exact: false,
    path: '/auth/user-management',
    breadcrumb: 'Post Management',
    component: Posts,
    title: 'Post Management'
  }
]

const PUBLIC_ROUTES = [
  {
    exact: false,
    path: '/',
    breadcrumb: 'Post Management',
    component: Posts,
    title: 'Post Management'
  }
]

export { PUBLIC_ROUTES, PRIVATE_ROUTES }
