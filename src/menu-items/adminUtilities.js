// assets
import { IconUsers, IconCurrencyBitcoin } from '@tabler/icons';

// constant
const icons = {
    IconUsers,
    IconCurrencyBitcoin
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const adminUtilities = {
    id: 'utilities',
    title: 'Administrative',
    type: 'group',
    children: [
        {
            id: 'util-access-control',
            title: 'Access',
            type: 'item',
            url: '/utils/util-access-control',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'util-supply',
            title: 'Supply',
            type: 'item',
            url: '/utils/util-supply',
            icon: icons.IconCurrencyBitcoin,
            breadcrumbs: false
        }
    ]
};

export default adminUtilities;
