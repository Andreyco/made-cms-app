import { Link, NavLink } from "remix";
import cx from "classnames";
import { Users, Book, Settings, LogOut } from "react-feather";
import { Avatar } from "~/components";

export let Sidebar: React.FC = function () {
  return (
    <>
      <div className="sidebar-header">Logo</div>
      <div className="sidebar-main">
        <NavLink to="/admin/articles" className={getClassName}>
          <Book></Book> <span>articles</span>
        </NavLink>
        <NavLink to="/admin/users" className={getClassName}>
          <Users></Users> <span>users</span>
        </NavLink>
      </div>
      <div className="sidebar-footer">
        <Avatar
          size={40}
          imageUrl={
            "https://scontent.fhrk1-1.fna.fbcdn.net/v/t1.6435-9/36262132_1736364299792325_6825084014123024384_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=U5YgPmveZT4AX91eEa9&_nc_ht=scontent.fhrk1-1.fna&oh=00_AT-fxW9wwLsRNVdhNcF4fcHSwNLtN9naswvul7OnGKZJbQ&oe=62205AFC"
          }
        ></Avatar>
        <div>
          <span>Lucia Badinová</span><br/>
          <span>lucia.badinova@gmail.com</span>
        </div>
        <div>
          <Link to="/admin/profile">
            <Settings></Settings>
          </Link>
          <Link to="/auth/logout">
            <LogOut></LogOut>
          </Link>
        </div>
      </div>
    </>
  );
};

function getClassName(props: { isActive: boolean }): string {
  return cx("block-link", { "block-link-active": props.isActive });
}
