import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  LANG,
  LANG_OBJ,
  postReq2,
  SYSTEM_MODE,
  SYSTEM_MODE_NAME,
  WARNING_CODE,
} from "../../utils";

const buttonMapping = [
  [
    {
      id: WARNING_CODE.HSWW_AMBER_OUTDOOR,
      text: LANG(LANG_OBJ.HSWW_AMBER_OUTDOOR),
      color: "orange",
    },
    {
      id: WARNING_CODE.HSWW_RED_OUTDOOR,
      text: LANG(LANG_OBJ.HSWW_RED_OUTDOOR),
      color: "red",
    },
    {
      id: WARNING_CODE.HSWW_BLACK_OUTDOOR,
      text: LANG(LANG_OBJ.HSWW_BLACK_OUTDOOR),
      color: "black",
    },
    {
      id: WARNING_CODE.HSWW_CANCEL_OUTDOOR,
      text: LANG(LANG_OBJ.HSWW_CANCEL_OUTDOOR),
      color: "grey",
    },
  ],
  [
    {
      id: WARNING_CODE.HSWW_AMBER_INDOOR,
      text: LANG(LANG_OBJ.HSWW_AMBER_INDOOR),
      color: "orange",
    },
    {
      id: WARNING_CODE.HSWW_RED_INDOOR,
      text: LANG(LANG_OBJ.HSWW_RED_INDOOR),
      color: "red",
    },
    {
      id: WARNING_CODE.HSWW_BLACK_INDOOR,
      text: LANG(LANG_OBJ.HSWW_BLACK_INDOOR),
      color: "black",
    },
    {
      id: WARNING_CODE.HSWW_CANCEL_INDOOR,
      text: LANG(LANG_OBJ.HSWW_CANCEL_INDOOR),
      color: "grey",
    },
  ],
];

export const Toggle: React.FC = () => {
  const dispatch = useDispatch();

  const [systemMode, setSystemMode] = useState(null);

  const getSystemMode = async () => {
    await postReq2(
      {
        path: "/warning-system/get-mode",
      },
      dispatch
    ).then((res) => {
      if (res.data.mode) {
        setSystemMode(res.data.mode);
      }
    });
  };

  const handleChangeSystemMode = async (mode: SYSTEM_MODE) => {
    await postReq2(
      {
        path: "/warning-system/change-mode",
        data: { mode },
      },
      dispatch
    ).then((res) => {
      if (res.data.mode) {
        setSystemMode(res.data.mode);
      }
    });
  };

  const handleAlarm = async (warningCode: WARNING_CODE) => {
    await postReq2(
      {
        path: "/warning-system/manual-publish",
        data: {
          warningCode,
        },
      },
      dispatch
    );
  };

  const handleCrawler = async () => {
    await axios({
      method: "GET",
      url: "https://data.weather.gov.hk/weatherAPI/opendata/hsww.php?lang=en",
    }).then((res) => {
      if (!res || !res.data) {
      } else {
        // re-render
        console.log(res.data);
        // const data = await response.json();
      }
    });
  };

  useEffect(() => {
    getSystemMode();
    handleCrawler();

    const interval = setInterval(() => {
      handleCrawler();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box className="flex flex-col gap-4 justify-start items-center w-full bg-(--color-secondary) px-4 pt-24 sm:h-[calc(100vh-6rem)]">
      {systemMode && (
        <>
          <Box className="text-2xl">{LANG(LANG_OBJ.SYSTEM_TITLE)}</Box>
          <FormGroup className="text-(--color-primary)">
            <FormControlLabel
              control={
                <Switch
                  checked={systemMode === SYSTEM_MODE.MANUAL}
                  onChange={(e) => {
                    const targetMode = e.target.checked
                      ? SYSTEM_MODE.MANUAL
                      : SYSTEM_MODE.AUTO;
                    handleChangeSystemMode(targetMode);
                    return targetMode;
                  }}
                />
              }
              label={SYSTEM_MODE_NAME[systemMode]}
            />
          </FormGroup>
          <Box className="w-full flex gap-4">
            {buttonMapping.map((list, key) => {
              return (
                <Box key={key} className="w-full flex flex-col gap-4">
                  {list.map(({ id, text, color }) => {
                    const disabled = systemMode === SYSTEM_MODE.AUTO;
                    return (
                      <Button
                        key={id}
                        className="w-full h-[50px]"
                        variant={"contained"}
                        sx={{ background: color }}
                        onClick={() => handleAlarm(id)}
                        disabled={disabled}
                      >
                        {text}
                      </Button>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};
