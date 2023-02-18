import { NavLink, Outlet, } from "react-router-dom";
import { menuList } from "../../assets/data/dashboardMenu";
import logo from '../../assets/images/logo.png'
import Header from "./Header";

const Sidebar = () => {

    return (
        <>
            <aside className="sidebarArea">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="menu">
                    <ul>
                        {
                            menuList.map((item, index) => (
                                <li key={index}>
                                    <NavLink to={item.url} className={(data) => data.isActive ? "active" : ""}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </aside>
            <main className="mainArea">
                <div className="container">
                    <Header />
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default Sidebar;