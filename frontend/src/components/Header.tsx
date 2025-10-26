import React from 'react';
import { NavLink } from './NavLink';
import { connectWallet } from '../lib/stacks';
export default function Header(){
  return (
    <header>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <strong style={{fontSize:20}}>LendLink</strong>
        <nav className="nav">
          <NavLink to="/">Explore</NavLink>
          <NavLink to="/create">Create Loan</NavLink>
          <NavLink to="/mine">My Loans</NavLink>
        </nav>
      </div>
      <button onClick={()=>connectWallet()}>Connect Wallet</button>
    </header>
  );
}