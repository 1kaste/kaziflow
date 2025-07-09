
import { User } from '../types';

export const allUsers: User[] = [
    { id: 'u1', name: 'Kazi Admin Prime', email: 'admin-prime@kaziflow.io', password: 'password-admin', avatarUrl: 'https://picsum.photos/seed/admin1/100/100', category: 'Primary Admin', productivityScore: 1000 },
    { id: 'u7', name: 'Kazi Admin Secundus', email: 'admin-secundus@kaziflow.io', password: 'password-admin', avatarUrl: 'https://picsum.photos/seed/admin2/100/100', category: 'Primary Admin', productivityScore: 980 },
    { id: 'u6', name: 'Temp Admin', email: 'admin-temp@kaziflow.io', password: 'password-temp', avatarUrl: 'https://picsum.photos/seed/temp/100/100', category: 'Temporary Admin', productivityScore: 750 },
    { id: 'u2', name: 'Client A', email: 'client-a@aegisflow.io', password: 'password-client', avatarUrl: 'https://picsum.photos/seed/u1/100/100', category: 'Brand', productivityScore: 720 },
    { id: 'u3', name: 'Client B', email: 'client-b@aegisflow.io', password: 'password-bob', avatarUrl: 'https://picsum.photos/seed/u2/100/100', category: 'Business', productivityScore: 650 },
    { id: 'u4', name: 'Client C', email: 'client-c@aegisflow.io', password: 'password-charlie', avatarUrl: 'https://picsum.photos/seed/u3/100/100', category: 'Client', productivityScore: 780 },
    { id: 'u5', name: 'Alex Ray', email: 'team@kaziflow.io', password: 'password-team', avatarUrl: 'https://picsum.photos/seed/team/100/100', category: 'Team Member', productivityScore: 800 },
];