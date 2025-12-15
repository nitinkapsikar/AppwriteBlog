import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

function NavbarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "text-white px-3 py-1 rounded-md transition-all duration-300",
          isActive && "bg-[#0f3460]"
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default NavbarLink;
