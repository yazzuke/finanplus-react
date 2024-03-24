import React from "react";
import GIcon from './googleLogo.png';

export const GoogleIcon = ({ ...props }) => {
  return <img src={GIcon} alt="Google Logo"  width={20 }{...props} />;
};

export default GoogleIcon;
