import React, { Suspense } from 'react'
import { Users } from 'react-feather'
import { Redirect, Route, RouteProps, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { FillLoader } from '../components'
import SideBar from '../components/SideBar'
import PageNotFound from '../containers/PageNotFound'
import { useAuthContext } from '../context/AuthProvider'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'

interface RouteType extends RouteProps {
  component: any
}

export type NavItem = {
  to: string
  title: string
  icon: React.ReactNode
  subMenu?: Array<{ to: string; title: string }>
}

const NAV_ITEMS: NavItem[] = [
  {
    to: `/auth/user-management`,
    title: 'User Management',
    icon: <Users size={20} color="white" className="sidebar-menu-icon" />
  }
]

const PrivateRoute = ({ component: Component, ...rest }: RouteType) => {
  const { isAuthenticating, isAuthenticated } = useAuthContext()

  if (isAuthenticating) {
    return <FillLoader />
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Suspense fallback={<FillLoader color="black" />}>
            <Component {...rest} />
          </Suspense>
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

const PublicRoute = ({ component: Component, ...rest }: RouteType) => (
  <Route {...rest}>
    <Component />
  </Route>
)

const Navigation = (): JSX.Element => (
  <Router>
    <Suspense fallback={<FillLoader />}>
      <Switch>
        {PUBLIC_ROUTES.map((route) => {
          return <PublicRoute key={route.path} {...route} />
        })}
        <Route
          path="/auth"
          render={() => (
            <SideBar
              bg="gray.900"
              color="white"
              navItems={NAV_ITEMS}
              hoverColor="gray.700"
              accentColor="cyan.500"
            >
              {PRIVATE_ROUTES.map((route) => {
                return <PrivateRoute key={route.path} {...route} />
              })}
            </SideBar>
          )}
        />
        <Route render={PageNotFound} />
      </Switch>
    </Suspense>
  </Router>
)

export default Navigation
