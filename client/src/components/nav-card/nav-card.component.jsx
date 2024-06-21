import { useNavigate } from "react-router-dom";
import "./nav-card.styles.css";

const NavCard = ({ Icon, title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div className="nav-card" onClick={() => navigate(link)}>
      <Icon size="75%" style={{ width: 'min-content', paddingRight: "10px"}} />
      <div className="nav-info">
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>
    </div>
  );
};

export default NavCard;
