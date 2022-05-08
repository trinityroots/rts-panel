// assets
import { IconKey, IconSend, IconCircleCheck, IconVectorTriangle, IconWorld } from '@tabler/icons';
import { tokenContractAddress, tokenExplorer } from 'store/constant';

// constant
const icons = {
    IconKey,
    IconSend,
    IconCircleCheck,
    IconVectorTriangle,
    IconWorld
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const utilities = {
    id: 'non-admin-utils',
    title: 'Utilities',
    caption: 'Non-Administrative Tools',
    type: 'group',
    children: [
        {
            id: 'util-transfer',
            title: 'Transfer',
            type: 'item',
            url: '/utils/util-transfer',
            icon: icons.IconSend,
            breadcrumbs: false
        },
        {
            id: 'util-approve',
            title: 'Approve',
            type: 'item',
            url: '/utils/util-approve',
            icon: icons.IconCircleCheck,
            breadcrumbs: false
        },
        {
            id: 'util-transfer-from',
            title: 'Transfer From',
            type: 'item',
            url: '/utils/util-transfer-from',
            icon: icons.IconVectorTriangle,
            breadcrumbs: false
        },
        {
            id: 'util-explorer',
            title: 'Explorer',
            type: 'item',
            target: '_blank',
            external: true,
            url: `${tokenExplorer}${tokenContractAddress}`,
            icon: icons.IconWorld,
            breadcrumbs: false
        },
    ]
};

export default utilities;
