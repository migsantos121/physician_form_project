import * as React from 'react';
import {MobxRouter, startRouter} from 'mobx-router';
import routerStore from './stores/router'
import {Provider} from 'mobx-react';
import {Home} from "./components/home/home";
import {views} from "./stores/views"

const store = {
    app: {
        title: 'Physician Form',
    },
    router: routerStore
}; 


views.index.component = <Home/>;

startRouter(views, store);

export const routes = (
    <Provider store={store}>
      <MobxRouter/>
    </Provider>
)
