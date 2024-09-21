import { PathList } from "@/models/path";
import { Link } from "react-router-dom";

const NavHeader = () => {
  const pathList: PathList = [
    { path: "/", label: "Open Page" },
    { path: "/page01", label: "Page01" },
    { path: "/page02", label: "Page02" },
  ];
  return (
    <nav className="nav-header">
      {pathList.map((link) => {
        return (
          <Link key={link.path} to={link.path}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavHeader;
