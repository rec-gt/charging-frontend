import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type TabPageProps = {
  tabPageData: tabPageData[];
};

type tabPageData = {
  id: string;
  name: string;
  action: () => void | Promise<void>;
};

export const TabPage: React.FC<TabPageProps> = (props) => {
  const [focusOn, setFocusOn] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const { tabPageData } = props;

  let tabId: any = tabPageData[0].id;

  const queryTabId: string = searchParams.get("tabId") ?? "";

  if (searchParams.get("tabId")) {
    if (tabPageData.map((tab) => tab.id).includes(queryTabId)) {
      tabId = queryTabId;
    }
  }

  useEffect(() => {
    setSearchParams({ tabId });
    setFocusOn(tabId);

    const handleAction = async () => {
      await tabPageData.filter((tab: any) => tab.id === tabId)[0].action();
    };

    handleAction();
  }, [tabId]);

  useEffect(() => {
    barScrollTo();
  }, [focusOn]);

  const barScrollTo = () => {
    const id = `tab-btn-${focusOn}`;

    const btnBar = document.getElementById("btn-bar");
    const targetElement = document.getElementById(id);

    if (btnBar && targetElement) {
      btnBar.style.width = `${targetElement.offsetWidth ?? 0}px`;
      btnBar.style.transform = `translateX(${targetElement.offsetLeft ?? 0}px)`;
    }
  };
  return (
    <>
      {tabPageData && tabPageData.length > 0 ? (
        <>
          <Stack
            className="relative"
            direction={"row"}
            spacing={1}
            marginBottom={"1rem"}
            borderBottom={"2px solid #eee"}
          >
            {tabPageData.map((tab, index) => (
              <Button
                id={`tab-btn-${tab.id}`}
                key={index}
                sx={{
                  borderRadius: 0,
                }}
                onClick={async () => {
                  setFocusOn(tab.id);
                  tab.action();
                  setSearchParams({ tabId: tab.id });
                }}
              >
                {tab.name}
              </Button>
            ))}
            <div
              id="btn-bar"
              className={`absolute left-0 bottom-0 w-0 h-0 m-0! border-b-[3px] border-[#0e778d] transition-transform duration-150`}
            />
          </Stack>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
