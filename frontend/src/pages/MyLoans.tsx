import React from 'react';
import LoanCard from '../components/LoanCard';
const mine = [
  { id:3, borrower:'ME', principalAmount:150000, interestBps:600, duration:20, collateralAmount:80000, status:'OPEN' as const },
];
export default function MyLoans(){
  return (
    <div className="container">
      <h2>My Loans</h2>
      {mine.map(l => <LoanCard key={l.id} loan={l} />)}
    </div>
  );
}