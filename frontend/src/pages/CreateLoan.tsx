import React, { useState } from 'react';
import { callCreateLoan, pretty } from '../lib/stacks';
export default function CreateLoan(){
  const [principalAmount, setPrincipalAmount] = useState(100000);
  const [interestBps, setInterestBps] = useState(500);
  const [duration, setDuration] = useState(10);
  const [collateralAmount, setCollateralAmount] = useState(50000);
  return (
    <div className="container">
      <h2>Create a Loan Request</h2>
      <label>Principal Amount (LUSD)</label>
      <input type="number" value={principalAmount} onChange={e=>setPrincipalAmount(Number(e.target.value))}/>
      <label>Interest (basis points)</label>
      <input type="number" value={interestBps} onChange={e=>setInterestBps(Number(e.target.value))}/>
      <label>Duration (blocks)</label>
      <input type="number" value={duration} onChange={e=>setDuration(Number(e.target.value))}/>
      <label>Collateral Amount (LUSD)</label>
      <input type="number" value={collateralAmount} onChange={e=>setCollateralAmount(Number(e.target.value))}/>
      <div style={{marginTop:12}}>
        <button onClick={()=>callCreateLoan({
          principalAmount: BigInt(principalAmount),
          interestBps: BigInt(interestBps),
          duration: BigInt(duration),
          collateralAmount: BigInt(collateralAmount)
        })}>Create Loan</button>
      </div>
      <p style={{opacity:.8, marginTop:10}}>Total repay preview: {pretty(principalAmount * (1+interestBps/10000))} LUSD</p>
    </div>
  );
}