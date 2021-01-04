import AuthPage from "@/components/pages/auth/AuthPage";
import NotFoundPage from "@/components/pages/NotFoundPage";
import LogoutPage from "@/components/pages/auth/LogoutPage";
import Home from "@/components/pages/home/Home";
import EventsPage from "@/components/pages/events/EventsPage";
import MapPage from "@/components/pages/events/pages/MapPage";
import AvailableEventsPage from "@/components/pages/events/pages/available/AvailableEventsPage"
import ProfilePage from "@/components/pages/profile/ProfilePage";
import ProfileInfo from "@/components/pages/profile/forms/ProfileInfo";

export default [
    //Not found placeholder
    {path: '/:NotFound(.*)', component: NotFoundPage},

    //
    {path: '/', redirect: '/home'},

    //Authentication
    {path: '/login', component: AuthPage, name: 'login', meta: {requiresUnauth: true}},
    {path: '/register', component: AuthPage, name: 'register', meta: {requiresUnauth: true}},
    {path: '/reset-password', component: AuthPage, name: 'reset-password', meta: {requiresUnauth: true}},

    //User actions
    {path: '/home', component: Home, name: 'home', meta: {requiresAuth: true}},
    {path: '/logout', component: LogoutPage, name: 'logout', meta: {requiresAuth: true}},

    {
        path: '/events',
        component: EventsPage,
        name: 'events',
        meta: {requiresAuth: true},
        redirect: {name: 'events-map'},
        children: [
            {path: 'map', component: MapPage, name: 'events-map'},
            {path: 'created', component: NotFoundPage, name: 'events-created'},
            {path: 'participating', component: NotFoundPage, name: 'events-participating'},
            {path: 'available', component: AvailableEventsPage, name: 'events-available'},
        ]
    },
    {
        path: '/profile',
        component: ProfilePage,
        name: 'profile',
        meta: {requiresAuth: true},
        redirect: {name: 'profile-info'},
        children: [
            {path: 'info', component: ProfileInfo, name: 'profile-info'},
            {path: 'settings', component: NotFoundPage, name: 'profile-settings'},
        ]
    },
    {path: '/friend', component: NotFoundPage, name: 'participating', meta: {requiresAuth: true}},


];
