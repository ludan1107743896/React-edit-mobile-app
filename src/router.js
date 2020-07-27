import React from 'react';
import { Route, Switch } from 'dva/router';

import dynamic from 'dva/dynamic' // 路由按需加载
import { ConnectedRouter } from 'react-router-redux';
import App from './routes/App'

function RouterConfig({ history,app }) {
    const IndexPage = dynamic({
        app,
        component:(()=> import('./routes/pages/IndexPage'))
    })
    return (
        <ConnectedRouter history={history}>
            <App>
                <Switch>
                    <Route path="/" exact component={IndexPage}/>
                </Switch>
            </App>
        </ConnectedRouter>
    );
}
export default RouterConfig;
