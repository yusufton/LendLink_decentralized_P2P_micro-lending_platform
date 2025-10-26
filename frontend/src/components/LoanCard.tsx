import React from 'react';
import { callFundLoan, callRepay, callCancel, pretty } from '../lib/stacks';
type Loan = {
  id: number;
  borrower: string;
  lender?: string;
  principalAmount: number;
  interestBps: number;
  duration: number;
  collateralAmount: number;
  status: 'OPEN'|'FUNDED'|'SETTLED';
};
export default function LoanCard({ loan }: { loan: Loan }){
  const total = loan.principalAmount * (1 + loan.interestBps/10000);
  return (
    <div className="card">
      <h3>Loan #{loan.id}</h3>
      <p>Borrower: {loan.borrower.slice(0,10)}…</p>
      <p>Principal: {pretty(loan.principalAmount)} LUSD · Interest: {loan.interestBps/100}%</p>
      <p>Collateral: {pretty(loan.collateralAmount)} LUSD · Duration: {loan.duration} blocks</p>
      <p>Total repay: {pretty(total)} LUSD</p>
      <div style={{display:'flex', gap:8}}>
        {loan.status==='OPEN' && <button onClick={()=>callFundLoan(BigInt(loan.id))}>Fund</button>}
        {loan.status==='FUNDED' && <button onClick={()=>callRepay(BigInt(loan.id))}>Repay</button>}
        {loan.status==='OPEN' && <button onClick={()=>callCancel(BigInt(loan.id))} style={{background:'#ef476f'}}>Cancel</button>}
      </div>
    </div>
  );
}