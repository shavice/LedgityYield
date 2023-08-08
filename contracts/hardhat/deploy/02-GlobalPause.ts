import { type DeployFunction } from "hardhat-deploy/dist/types";

module.exports.default = (async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const globalOwner = await deployments.get("GlobalOwner");

  await deployments.deploy("GlobalPause", {
    from: deployer,
    log: true,
    proxy: {
      proxyContract: "UUPS",
      execute: {
        init: {
          methodName: "initialize",
          args: [globalOwner.address],
        },
      },
    },
    waitConfirmations: chainId == "31337" ? 1 : 6,
  });
}) as DeployFunction;