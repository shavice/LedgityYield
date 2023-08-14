"use client";
import { AppDashboard } from "@/components/app/dashboard/AppDashboard";
import { AppGetUSDC } from "@/components/app/get-usdc/AppGetUSDC";
import { AppInvest } from "@/components/app/invest/AppInvest";
import { AppLDYToken } from "@/components/app/ldy-token/AppLDYToken";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

import { type NextPage } from "next";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { usePublicClient } from "wagmi";

interface Props {
  defaultTab: string;
}

//@ts-ignore
const AppTabs: NextPage<Props> = ({ defaultTab }) => {
  const publicClient = usePublicClient();

  const [currentTab, setCurrentTab] = useState(
    defaultTab && defaultTab !== "" ? defaultTab : "invest",
  );

  // Figure out if it's an Arbitrum/Linea user or not
  const isArbitrum = publicClient && [42161, 421613].includes(publicClient.chain.id);
  const isLinea = publicClient && [59144, 59140].includes(publicClient.chain.id);

  return (
    <Tabs
      defaultValue={currentTab}
      className="flex w-screen flex-col items-center justify-center gap-10"
      onValueChange={(v) => {
        history.pushState({}, v, `/app/${v}`);
        setCurrentTab(v);
      }}
    >
      <TabsList className="mb-6 mt-12">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger
          value="invest"
          className="[&_div:hover]:!opacity-100 [&_div:hover]:!grayscale-0"
        >
          Invest
          {isLinea && (
            <div
              className={twMerge(
                "absolute -right-[30%] -top-[2rem] z-20 flex items-center justify-center gap-1 rounded-xl bg-gradient-to-tr from-orange-500 to-orange-700 px-[0.47rem] py-[0.04rem] text-center text-[0.8rem] font-bold text-white",
                currentTab === "invest" && "opacity-60 grayscale-[30%]",
              )}
            >
              <i className="ri-fire-fill text-x animate-pulse" />
              Airdrop
              <i className="ri-arrow-down-s-fill absolute -bottom-[1.33rem] left-1.5 -z-10 text-3xl text-orange-600/80"></i>
            </div>
          )}
        </TabsTrigger>
        {isArbitrum && (
          <TabsTrigger
            value="ldy-token"
            className="[&_div:hover]:!opacity-100 [&_div:hover]:!grayscale-0"
          >
            LDY Token
            <div
              className={twMerge(
                "absolute -right-[15%] -top-[2rem] z-20 flex items-center justify-center gap-1 rounded-xl bg-gradient-to-tr from-orange-500 to-orange-700 px-[0.47rem] py-[0.04rem] text-center text-[0.8rem] font-bold text-white",
                currentTab === "ldy-token" && "opacity-60 grayscale-[30%]",
              )}
            >
              <i className="ri-fire-fill text-x animate-pulse" />
              Lockdrop
              <i className="ri-arrow-down-s-fill absolute -bottom-[1.33rem] left-1.5 -z-10 text-3xl text-orange-600/80"></i>
            </div>
          </TabsTrigger>
        )}
        {isLinea && <TabsTrigger value="get-usdc">Get USDC</TabsTrigger>}
      </TabsList>
      <div className="[&_>_*]:animate-fadeAndMoveIn [&_>_*]:[animation-duration:300ms]">
        <TabsContent value="dashboard">
          <AppDashboard />
        </TabsContent>
        <TabsContent value="invest">
          <AppInvest />
        </TabsContent>
        <TabsContent value="ldy-token">
          <AppLDYToken />
        </TabsContent>
        <TabsContent value="get-usdc">
          <AppGetUSDC />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AppTabs;