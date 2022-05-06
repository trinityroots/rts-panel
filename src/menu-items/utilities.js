// assets
import { IconKey, IconSend } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconSend
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
    ]
};

export default utilities;
