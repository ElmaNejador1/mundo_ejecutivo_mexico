import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDashboard, faThumbtack, faTableCells, faUsers, faNewspaper, faTv, faTrophy, faDownload, faVideo} from "@fortawesome/free-solid-svg-icons";

export const pagesSidebar = [
  {
    name: 'Dashboard',
    icon: <FontAwesomeIcon icon={faDashboard}/>,
    dir: "/admin/dashboard",
    admin: true,
    editor: false,
  },
  {
    name: 'Periódicos',
    icon: <FontAwesomeIcon icon={faNewspaper}/>,
    dir: "/admin/periodicos",
    admin: true,
    editor: true,
  },
  // {
  //   name: 'Video Facebook',
  //   icon: <FontAwesomeIcon icon={faFacebook}/>,
  //   dir: "/admin/videoFacebook",
  //   admin: true,
  //   editor: true,
  // },
  {
    name: 'Videos',
    icon: <FontAwesomeIcon icon={faVideo}/>,
    dir: "/admin/videos",
    admin: true,
    editor: true,
  },
  {
    name: 'Entradas',
    icon: <FontAwesomeIcon icon={faThumbtack}/>,
    dir: "/admin/entradas",
    admin: true,
    editor: true,
  },
  {
    name: 'TV',
    icon: <FontAwesomeIcon icon={faTv}/>,
    dir: "/admin/tv",
    admin: true,
    editor: true,
  },
  {
    name: 'Especiales',
    icon: <FontAwesomeIcon icon={faTrophy}/>,
    dir: "/admin/especiales",
    admin: true,
    editor: true,
  },
  {
    name: 'Descargables',
    icon: <FontAwesomeIcon icon={faDownload}/>,
    dir: "/admin/descargables",
    admin: true,
    editor: true,
  },
  {
    name: 'Categorías',
    icon: <FontAwesomeIcon icon={faTableCells}/>,
    dir: "/admin/categorias",
    admin: true,
    editor: true,
  },
  {
    name: 'Usuarios',
    icon: <FontAwesomeIcon icon={faUsers}/>,
    dir: "/admin/usuarios",
    admin: true,
    editor: false,
  },
]