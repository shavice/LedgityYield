export const main = async () => {
  await (
    await import("./deploy-Blacklist")
  ).default;
  await (
    await import("./deploy-LTY")
  ).default;
  await (
    await import("./deploy-LTYStaking")
  ).default;
  await (
    await import("./deploy-LToken")
  ).default;
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});