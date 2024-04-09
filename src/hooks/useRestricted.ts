import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const useRestricted = () => {
  const [isRestricted, setIsRestricted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const account = useAccount();

  const updateRestrictionStatus = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/aml?address=${account.address}`, {
      next: { revalidate: 3600 * 24 * 7 },
    });
    if (!response.ok) console.error(`Error while fetching AML endpoint (${response.statusText})`);
    else {
      const data = await response.json();
      setIsRestricted(data.restricted);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (account.address) updateRestrictionStatus();
  }, []);

  //   useEffect(() => {
  //     if (account.address) updateRestrictionStatus();
  //   }, [account.address]);

  return { isRestricted, isLoading };
};

export default useRestricted;
