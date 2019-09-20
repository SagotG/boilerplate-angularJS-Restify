import Task from '../views/Task/Task';
import Profil from '../views/Profile/Profile';
import Drum from '../views/Drum/Drum';
import Render from '../views/Render/Render';

var dashRoutes = [
    { path: "/profil", name: "Profil", icon:"users_single-02", component: Profil},
    { path: "/render", name: "Render", component: Render},
    { path: "/drum", name: "Drum", icon:"users_single-02", component: Drum},
    { path: "/", name: "Home", icon: "design_image", component: Task},
];

export default dashRoutes;
