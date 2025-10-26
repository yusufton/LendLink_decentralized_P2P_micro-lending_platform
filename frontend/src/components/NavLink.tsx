import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export const NavLink: React.FC<{to:string, children: React.ReactNode}> = ({to, children}) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return <Link className={active? 'active': ''} to={to}>{children}</Link>;
};