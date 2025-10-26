import { StacksTestnet } from '@stacks/network';
import { openContractCall, showConnect } from '@stacks/connect';
import { AnchorMode, PostConditionMode, uintCV, contractPrincipalCV } from '@stacks/transactions';
export const network = new StacksTestnet();
const DEPLOYER = import.meta.env.VITE_CONTRACT_DEPLOYER as string;
const LOAN = import.meta.env.VITE_CONTRACT_LOAN as string;
const TOKEN = import.meta.env.VITE_CONTRACT_TOKEN as string;
export const contractLoan = `${DEPLOYER}.${LOAN}`;
export const contractToken = `${DEPLOYER}.${TOKEN}`;
export function connectWallet(appName = 'LendLink', onFinish?: () => void) {
  showConnect({ onFinish, userSession: undefined, appDetails: { name: appName, icon: window.location.origin + '/favicon.ico' }, redirectTo: '/' });
}
export async function callCreateLoan(args: { principalAmount: bigint; interestBps: bigint; duration: bigint; collateralAmount: bigint; principalToken?: string; collateralToken?: string; }) {
  const fnArgs = [
    contractPrincipalCV(DEPLOYER, args.principalToken ?? 'lend-token'),
    uintCV(args.principalAmount),
    uintCV(args.interestBps),
    uintCV(args.duration),
    contractPrincipalCV(DEPLOYER, args.collateralToken ?? 'lend-token'),
    uintCV(args.collateralAmount),
  ];
  await openContractCall({
    contractAddress: DEPLOYER,
    contractName: LOAN,
    functionName: 'create-loan',
    functionArgs: fnArgs,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    onFinish: (data) => console.log('create-loan tx', data),
  });
}
export async function callFundLoan(id: bigint) {
  await openContractCall({
    contractAddress: DEPLOYER,
    contractName: LOAN,
    functionName: 'fund-loan',
    functionArgs: [uintCV(id)],
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    onFinish: (data) => console.log('fund-loan tx', data),
  });
}
export async function callRepay(id: bigint) {
  await openContractCall({
    contractAddress: DEPLOYER,
    contractName: LOAN,
    functionName: 'repay',
    functionArgs: [uintCV(id)],
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    onFinish: (data) => console.log('repay tx', data),
  });
}
export async function callCancel(id: bigint) {
  await openContractCall({
    contractAddress: DEPLOYER,
    contractName: LOAN,
    functionName: 'cancel-loan',
    functionArgs: [uintCV(id)],
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  });
}
export const pretty = (v: bigint | number | string) => new Intl.NumberFormat().format(Number(v));