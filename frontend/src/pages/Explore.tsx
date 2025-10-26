import React from 'react';
import LoanCard from '../components/LoanCard';
const loans = [
  { id:1, borrower:'ST3ABC...', principalAmount:100000, interestBps:500, duration:10, collateralAmount:50000, status:'OPEN' as const },
  { id:2, borrower:'ST3DEF...', principalAmount:250000, interestBps:800, duration:50, collateralAmount:150000, status:'FUNDED' as const },
];
export default function Explore(){
  return (
    <div className="container">
      <h2>Explore Loans</h2>
      {loans.map(l => <LoanCard key={l.id} loan={l} />)}
    </div>
  );
}