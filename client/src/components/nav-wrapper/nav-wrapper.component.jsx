import "./nav-wrapper.styles.css";
import Navigation from "../navigation/navigation.component";

const NavWrapper = ({ child }) => {
  return (
    <div className="full">
      <Navigation />
      {child}
    </div>
  );
};

export default NavWrapper;