"use client";
import { FC, useEffect } from "react";
import { usePrepareContractWrite, useWalletClient } from "wagmi";
import {
  useGenericErc20Allowance,
  useGenericErc20Decimals,
  useGenericErc20Symbol,
  usePrepareGenericErc20Approve,
} from "@/generated";
import { formatUnits, zeroAddress } from "viem";
import { TxButton } from "./TxButton";
import clsx from "clsx";

interface Props extends React.ComponentPropsWithoutRef<typeof TxButton> {
  token: `0x${string}`;
  spender: `0x${string}`;
  amount?: bigint;
  preparation: ReturnType<typeof usePrepareContractWrite>;
  transactionSummary?: string;
  // This prevents displaying errors when user hasn't interacted with the button or input yet
  hasUserInteracted?: boolean;
}
/**
 * A version of the TxButton that allows to ensure and set (if needed) a given ERC20 allowance before
 * signing the transaction.
 */
export const AllowanceTxButton: FC<Props> = ({
  token,
  spender,
  amount = 0n,
  preparation,
  transactionSummary = "",
  hasUserInteracted = false,
  ...props
}) => {
  const { data: walletClient } = useWalletClient();
  const { data: symbol } = useGenericErc20Symbol({ address: token });
  const { data: decimals } = useGenericErc20Decimals({ address: token });
  const { data: allowance } = useGenericErc20Allowance({
    address: token,
    args: [walletClient?.account.address || zeroAddress, spender],
    watch: true,
  });
  const allowancePreparation = usePrepareGenericErc20Approve({
    address: token,
    args: [spender, amount],
  });
  useEffect(() => {
    preparation.refetch();
  }, [allowance]);

  const hasEnoughAllowance = Boolean(allowance && allowance >= amount);
  return (
    <div>
      <TxButton
        className={clsx(!hasEnoughAllowance && "hidden")}
        preparation={preparation}
        transactionSummary={transactionSummary}
        {...props}
      />
      <TxButton
        className={clsx(hasEnoughAllowance && "hidden")}
        preparation={allowancePreparation}
        transactionSummary={`Allow Ledgity Yield to spend ${formatUnits(
          amount,
          decimals!,
        )} ${symbol}`}
        {...props}
        disabled={amount === 0n}
        hasUserInteracted={hasUserInteracted}
      >
        Allow
      </TxButton>
    </div>
  );
};
