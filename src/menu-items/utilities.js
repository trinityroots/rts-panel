// assets
import { IconKey, IconSend, IconCircleCheck, IconVectorTriangle } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconSend,
    IconCircleCheck,
    IconVectorTriangle
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
    ]
};

export default utilities;
