import { NavLink } from "react-router-dom";
import { FaBox, FaUser, FaCreditCard, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";

const SidebarUser = () => {
  const menuItems = [
    { name: "Orders", icon: <FaBox />, path: "/orders" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Saved Cards", icon: <FaCreditCard />, path: "/cards" },
    { name: "Addresses", icon: <FaMapMarkerAlt />, path: "/addresses" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full p-4">
      <h2 className="text-xl font-bold mb-4">User Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200 transition ${isActive ? "bg-green-500 text-white" : ""}`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarUser;