import React from 'react';
import { Route, Switch, } from 'react-router-dom'


import '../../public/index.css'

import Routes from '../routes';
import Navbar from '../_components/navbar';


export default function App() {
    return (
        <div>
            <Navbar />
            <Switch>
                {Routes.map(({ path, exact, component: C, ...rest }) => (
                    <Route
                        key={path}
                        path={path}
                        exact={exact}
                        render={(props) => (
                            <C {...props} {...rest} />
                        )}

                    />

                ))}
            </Switch>
        </div>
    )
}