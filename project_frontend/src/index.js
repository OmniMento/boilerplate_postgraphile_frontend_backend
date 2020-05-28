import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button } from 'antd';

import { routes } from './routes';
import { ApiProvider } from '../src/api/ApiProvider';


import './styles/app.less';

export function App() {
    console.log(process.env.BACKEND_URL)
    return (
        <Router>
            <ApiProvider>
                <Switch>
                    {
                        routes.map(props => (
                            <Route key={props.path} {...props} />
                        ))
                    }
                </Switch>
            </ApiProvider>
        </Router>
    );
}

render(<App />, document.getElementById('app'));