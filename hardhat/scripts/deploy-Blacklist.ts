import { deployUpgradeable } from "./lib/deployProxy";

const main = async () => await deployUpgradeable("Blacklist");

export default main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});