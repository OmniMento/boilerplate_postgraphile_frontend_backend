import React from 'react';
import { Redirect } from 'react-router';

import Home from './pages/home';


export const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/boilerplate',
        exact: true,
    },
    {
        path: '/',
        component: () => <Redirect to='/' />
    },
];
