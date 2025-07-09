


import { Project, Client, CalendarEvent, MoodboardItem, Notification, User, ContentCalendarEntry, CollaborationSpace } from '../types';
import { allUsers } from './users';

export const mockProjects: Project[] = [
    {
        id: 'p1',
        name: 'Project Phoenix',
        ownerId: 'u2',
        description: 'Complete overhaul of the main web platform.',
        team: [
            allUsers.find(u => u.id === 'u2')!,
            allUsers.find(u => u.id === 'u3')!
        ],
        completion: 75,
        status: 'Real',
        deadline: new Date(2024, 8, 30),
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/1048/1048924.png',
        tasks: [
            { id: 't1', text: 'Design new UI mockups', completed: true },
            { id: 't2', text: 'Develop login and auth flow', completed: true },
            { id: 't3', text: 'Build project dashboard', completed: true },
            { id: 't4', text: 'Integrate calendar component', completed: false },
        ],
        notes: "Brand colors: Primary #0a777b, Accent #ffc107. Typography: Inter for body, Playfair Display for headers.",
        urls: [
            { id: 'l1', label: 'Figma Mockups', url: 'https://figma.com' },
            { id: 'l2', label: 'GitHub Repository', url: 'https://github.com' },
        ],
        clientId: 'c1',
        moodboardItems: [
            { id: 'm1', type: 'image', content: 'https://picsum.photos/seed/mood1/500/300', x: 50, y: 50, width: 300, height: 200, zIndex: 1, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' },
            { id: 'm2', type: 'note', content: 'Core idea: A blend of minimalism and organic textures. Think natural wood, stone, and clean lines.', x: 370, y: 50, width: 250, height: 200, zIndex: 2, backgroundColor: '#f3f4f6', textColor: '#1f2937', backgroundImageUrl: '' },
            { id: 'm3', type: 'image', content: 'https://picsum.photos/seed/mood2/400/600', x: 640, y: 50, width: 250, height: 420, zIndex: 3, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' },
            { id: 'm4', type: 'note', content: 'Color Palette: Deep Teal (#0a777b), Charcoal (#1a1a1a), Off-White (#f9f9f9), and Gold accent (#ffc107).', x: 50, y: 270, width: 300, height: 150, zIndex: 4, backgroundColor: '#0a777b', textColor: '#ffffff', backgroundImageUrl: '' },
            { id: 'm5', type: 'image', content: 'https://picsum.photos/seed/mood3/500/500', x: 370, y: 270, width: 250, height: 250, zIndex: 5, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' },
            { id: 'm6', type: 'image', content: 'https://picsum.photos/seed/mood4/500/400', x: 50, y: 440, width: 300, height: 230, zIndex: 6, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' },
            { id: 'm7', type: 'note', content: 'Typography: Playfair Display for headings, Inter for body text. Professional yet stylish.', x: 370, y: 540, width: 250, height: 130, zIndex: 7, backgroundColor: '#ffc107', textColor: '#1a1a1a', backgroundImageUrl: '' },
            { id: 'm8', type: 'image', content: 'https://picsum.photos/seed/mood5/400/300', x: 910, y: 50, width: 250, height: 200, zIndex: 8, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' },
            { id: 'm9', type: 'note', content: '"The only way to do great work is to love what you do." - Steve Jobs', x: 640, y: 490, width: 520, height: 180, zIndex: 9, backgroundColor: '#000000', textColor: '#ffffff', backgroundImageUrl: 'https://picsum.photos/seed/bg/800/600' },
        ],
        trashedMoodboardItems: [],
    },
    {
        id: 'p2',
        name: 'Aegis Mobile App',
        ownerId: 'u2',
        description: 'Develop the native iOS and Android applications.',
        team: [
            allUsers.find(u => u.id === 'u4')!,
            allUsers.find(u => u.id === 'u2')!
        ],
        completion: 30,
        status: 'Real',
        deadline: new Date(2024, 11, 15),
        logoUrl: 'https://static.vecteezy.com/system/resources/thumbnails/009/398/852/small/mobile-app-icon-clip-art-transparent-background-free-png.png',
        tasks: [
            { id: 't5', text: 'Setup React Native environment', completed: true },
            { id: 't6', text: 'Component library spike', completed: false },
            { id: 't7', text: 'User auth screen', completed: false },
        ],
        notes: "Targeting iOS 15+ and Android 10+. Use platform-agnostic components where possible.",
        urls: [],
        clientId: 'c2',
        moodboardItems: [
            { id: 'm10', type: 'image', content: 'https://picsum.photos/seed/appmood1/400/300', x: 20, y: 20, width: 250, height: 180, zIndex: 1, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' },
            { id: 'm11', type: 'note', content: 'Sleek & modern UI', x: 290, y: 20, width: 200, height: 180, zIndex: 2, backgroundColor: '#333333', textColor: '#ffffff', backgroundImageUrl: '' },
        ],
        trashedMoodboardItems: [],
    },
    {
        id: 'p3',
        name: 'Q4 Marketing Campaign',
        ownerId: 'u3',
        description: 'Launch and manage the end-of-year marketing blitz.',
        team: [
            allUsers.find(u => u.id === 'u4')!,
            allUsers.find(u => u.id === 'u3')!,
        ],
        completion: 90,
        status: 'Draft',
        deadline: null,
        logoUrl: 'https://cdn-icons-png.flaticon.com/512/299/299944.png',
        tasks: [
            { id: 't8', text: 'Finalize ad copy', completed: true },
            { id: 't9', text: 'Approve visuals', completed: true },
            { id: 't10', text: 'Launch social media ads', completed: false },
        ],
        notes: "Main slogan: 'End the year strong.' Focus on #ff7f50 for CTAs.",
        urls: [
             { id: 'l3', label: 'Ad Campaign Brief', url: 'https://docs.google.com' },
        ],
        clientId: 'c3',
        moodboardItems: [],
        trashedMoodboardItems: [],
    },
    {
        id: 'p4',
        name: 'Internal CRM Tool',
        ownerId: 'u4',
        description: 'Build a new tool for managing client relations.',
        team: [
            allUsers.find(u => u.id === 'u3')!,
            allUsers.find(u => u.id === 'u4')!,
        ],
        completion: 15,
        status: 'Real',
        deadline: new Date(2025, 1, 28),
        logoUrl: '',
        tasks: [
            { id: 't11', text: 'Gather requirements from sales team', completed: true },
            { id: 't12', text: 'Database schema design', completed: false },
        ],
        notes: "",
        urls: [],
        clientId: 'c2',
        moodboardItems: [],
        trashedMoodboardItems: [],
    },
];

const today = new Date();
const thisWeek = new Date();
thisWeek.setDate(today.getDate() - 3);
const thisMonth = new Date();
thisMonth.setDate(today.getDate() - 10);
const thisYear = new Date();
thisYear.setMonth(today.getMonth() - 2);
const lastYear = new Date();
lastYear.setFullYear(today.getFullYear() - 1);

export const mockClients: Client[] = [
    { id: 'c1', name: 'Innovate Corp', contactPerson: 'John Innovate', email: 'john@innovate.com', phone: '555-0101', ownerId: 'u2', status: 'Completed Project', urls: [{id: 'cu1', label: 'Company Website', url: 'https://innovate.com'}], notes: 'Primary contact for Project Phoenix. Prefers weekly updates via email.', createdAt: lastYear },
    { id: 'c2', name: 'Quantum Solutions', contactPerson: 'Sarah Quantum', email: 'sarah@quantum.io', phone: '555-0102', ownerId: 'u2', status: 'Confirmed', urls: [], notes: 'Interested in a new marketing campaign for Q1 2025.', createdAt: thisYear },
    { id: 'c3', name: 'Synergy Partners', contactPerson: 'Mike Synergy', email: 'mike@synergy.biz', phone: '555-0103', ownerId: 'u3', status: 'Confirmed', urls: [], notes: '', createdAt: thisMonth },
    { id: 'c4', name: 'Apex Dynamics', contactPerson: 'Emily Apex', email: 'emily@apexdynamics.co', phone: '555-0104', ownerId: 'u4', status: 'Pending', urls: [], notes: 'Initial contact made on July 5th. Follow up scheduled for July 12th.', createdAt: thisWeek },
    { id: 'c5', name: 'Momentum Group', contactPerson: 'David Momentum', email: 'david@momentum.co', phone: '555-0105', ownerId: 'u1', status: 'Not Interested', urls: [], notes: 'Not a good fit at this time. Re-evaluate in 6 months.', createdAt: today },
    { id: 'c6', name: 'Legacy Systems', contactPerson: 'Jane Legacy', email: 'jane@legacy.com', phone: '555-0106', ownerId: 'u1', status: 'Canceled', urls: [], notes: 'Project canceled due to budget constraints on their end.', createdAt: today },
];

export const mockEvents: CalendarEvent[] = [
    { id: 'ev1', title: 'Team Standup', start: new Date(2024, 6, 8, 9, 30), end: new Date(2024, 6, 8, 10, 0), type: 'meeting', ownerId: 'u2', description: 'Daily sync meeting with the dev team.' },
    { id: 'ev2', title: 'Finalize Q3 Report', start: new Date(2024, 6, 15, 17, 0), type: 'deadline', ownerId: 'u2', description: 'Compile all metrics and create the final report for stakeholders.' },
    { id: 'ev3', title: 'Client Meeting: Innovate Corp', start: new Date(2024, 6, 10, 14, 0), type: 'meeting', ownerId: 'u2' },
    { id: 'ev4', title: 'Renew SSL Certificate', start: new Date(2024, 6, 22, 11, 0), type: 'reminder', ownerId: 'u3' },
    { id: 'ev5', title: 'Project Phoenix Sprint Planning', start: new Date(2024, 6, 1, 10, 0), type: 'task', ownerId: 'u2' },
    { id: 'ev6', title: 'Design Review: CRM', start: new Date(2024, 6, 18, 13, 0), type: 'task', ownerId: 'u4' },
    { id: 'ev7', title: 'Marketing Sync', start: new Date(2024, 6, 12, 11, 30), type: 'meeting', ownerId: 'u3' },
];

export const mockContentEntries: ContentCalendarEntry[] = [
    {
        id: 'cc1',
        title: 'Launch Week Announcement',
        publishDate: new Date(2024, 6, 10),
        platformInfo: [
            { id: 'pi1', platform: 'Blog', publishTime: '09:00' },
            { id: 'pi2', platform: 'LinkedIn', publishTime: '10:30' }
        ],
        status: 'Published',
        executionTime: '08:00',
        script: 'Kazi Flow is officially launching! Our new platform helps teams streamline their workflows, eliminate procrastination, and foster creativity. Sign up today!',
        notes: 'Coordinate with social media posts. Add screenshots of the dashboard.',
        projectId: 'p1',
        ownerId: 'u2',
    },
    {
        id: 'cc2',
        title: 'New Feature Teaser',
        publishDate: new Date(2024, 6, 12),
        platformInfo: [
            { id: 'pi3', platform: 'X', publishTime: '12:00' },
            { id: 'pi4', platform: 'Instagram', publishTime: '12:15' }
        ],
        status: 'Scheduled',
        script: 'Something BIG is coming to Kazi Flow. Can you guess what it is? #productivity #newfeature #SaaS',
        notes: 'Use a blurred image of the feature icon.',
        projectId: 'p1',
        ownerId: 'u3',
    },
    {
        id: 'cc3',
        title: 'Behind the Scenes Reel',
        publishDate: new Date(2024, 6, 18),
        platformInfo: [
            { id: 'pi5', platform: 'Instagram', publishTime: '18:00' },
            { id: 'pi6', platform: 'TikTok', publishTime: '18:30' }
        ],
        status: 'Draft',
        executionTime: '14:00',
        script: 'A day in the life at Kazi Flow. Show the team working, coffee breaks, and a sneak peek of the office.',
        notes: 'Needs final video editing. Music: Upbeat instrumental.',
        projectId: 'p2',
        ownerId: 'u4',
    },
    {
        id: 'cc4',
        title: 'Weekly Productivity Tip',
        publishDate: new Date(2024, 6, 18),
        platformInfo: [
            { id: 'pi7', platform: 'LinkedIn', publishTime: '11:00' },
        ],
        status: 'Idea',
        script: '',
        notes: 'Topic idea: The Pomodoro Technique for deep work.',
        projectId: null,
        ownerId: 'u1',
    }
];

export const mockNotifications: Notification[] = [
    { id: '1', message: 'Project "Phoenix" is 75% complete.', timestamp: '2 hours ago', read: false },
    { id: '2', message: 'New client "Innovate Corp" added.', timestamp: 'Yesterday', read: false },
    { id: '3', message: 'Task "Finalize Q3 Report" is due tomorrow.', timestamp: 'Yesterday', read: true },
    { id: '4', message: 'You have been invited to join the "Q4 Marketing" collaboration space.', timestamp: '3 days ago', read: true },
];

export const mockCollaborationSpaces: CollaborationSpace[] = [
    {
        id: 'cs1',
        name: 'Q4 Marketing',
        description: 'A central hub for all Q4 marketing campaign efforts, including social media, content, and ad strategy.',
        ownerId: 'u1',
        members: ['u1', 'u3', 'u4'],
        pendingMembers: ['u5'],
        meetings: [
            { id: 'ev7', title: 'Marketing Sync', start: new Date(2024, 6, 12, 11, 30), type: 'meeting', ownerId: 'u3' },
            { id: 'ev8', title: 'Ad Creative Brainstorm', start: new Date(2024, 6, 19, 15, 0), type: 'meeting', ownerId: 'u1' }
        ],
        researchLinks: [
            { id: 'rl1', label: 'Competitor Analysis', url: 'https://google.com/search?q=competitors' },
            { id: 'rl2', label: 'Ad Platform Specs', url: 'https://facebook.com/business/ads' }
        ],
        moodboardItems: [
            { id: 'm1', type: 'image', content: 'https://picsum.photos/seed/mood1/500/300', x: 10, y: 10, width: 300, height: 200, zIndex: 1, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' },
            { id: 'm2', type: 'note', content: 'Focus on vibrant, energetic colors. #ff7f50 is key.', x: 320, y: 10, width: 200, height: 150, zIndex: 2, backgroundColor: '#ffffff', textColor: '#000000', backgroundImageUrl: '' }
        ],
        trashedMoodboardItems: [],
        linkedProjectIds: ['p3']
    },
    {
        id: 'cs2',
        name: 'CRM Development Team',
        description: 'Technical team for building the new internal CRM tool. All backend, frontend, and design discussions happen here.',
        ownerId: 'u7',
        members: ['u7', 'u3', 'u5'],
        pendingMembers: [],
        meetings: [
             { id: 'ev6', title: 'Design Review: CRM', start: new Date(2024, 6, 18, 13, 0), type: 'task', ownerId: 'u4' },
        ],
        researchLinks: [
            { id: 'rl3', label: 'Best CRM UX Patterns', url: 'https://uxdesign.cc' },
        ],
        moodboardItems: [],
        trashedMoodboardItems: [],
        linkedProjectIds: ['p4']
    }
];