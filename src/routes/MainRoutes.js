import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsAccessControl = Loadable(lazy(() => import('views/utilities/AccessControl')));
const UtilsSupply = Loadable(lazy(() => import('views/utilities/Supply')));
const UtilsTransfer = Loadable(lazy(() => import('views/utilities/Transfer')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-access-control',
            element: <UtilsAccessControl />
        },
        {
            path: '/utils/util-supply',
            element: <UtilsSupply />
        },
        {
            path: '/utils/util-transfer',
            element: <UtilsTransfer />
        },
    ]
};

export default MainRoutes;
