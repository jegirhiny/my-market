import "./nav-wrapper.styles.css";
import Navigation from "../navigation/navigation.component";
import React from "react";
import { useState } from "react";

const NavWrapper = ({ child }) => {
  const [triggerRender, setTriggerRender] = useState(0);

  return (
    <div className="full">
      <Navigation triggerRender={triggerRender} />
      {React.cloneElement(child, { triggerRender, setTriggerRender })}
    </div>
  );
};

export default NavWrapper;
