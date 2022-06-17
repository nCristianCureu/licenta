import Dashboard from "../components/admin/dashboard/Dashboard";
import Players from "../components/admin/team/Players";
import AddPlayer from "../components/admin/team/AddPlayer";
import Player from "../components/admin/team/Player";
import EditPlayer from "../components/admin/team/EditPlayer";
import AddNews from "../components/admin/news/AddNews";
import News from "../components/admin/news/News";
import SingleNews from "../components/admin/news/SingleNews";
import EditNews from "../components/admin/news/EditNews";
import Fixtures from "../components/admin/fixtures/Fixtures";
import Fixture from "../components/admin/fixtures/Fixture";
import AddFixtures from "../components/admin/fixtures/AddFixtures";

const routes = [
  { path: "/admin/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/admin/view-players", name: "Players", component: Players },
  { path: "/admin/add-player", name: "AddPlayer", component: AddPlayer },
  { path: "/admin/players/:id", name: "Player", component: Player },
  { path: "/admin/edit-player/:id", name: "EditPlayer", component: EditPlayer },
  { path: "/admin/add-news", name: "AddNews", component: AddNews },
  { path: "/admin/view-news", name: "News", component: News },
  { path: "/admin/news/:id", name: "SingleNews", component: SingleNews },
  { path: "/admin/edit-news/:id", name: "EditNews", component: EditNews },
  { path: "/admin/view-fixtures", name: "Fixtures", component: Fixtures },
  { path: "/admin/fixtures/:id", name: "Fixture", component: Fixture },
  {
    path: "/admin/add-fixtures",
    name: "AddFixtures",
    component: AddFixtures,
  },
];

export default routes;
