import axios from "axios";
import { useEffect, useState } from "react";
import {
  WARNING_LEVEL
} from "../../utils";

export const Realtime: React.FC = () => {
  const [realtimeWarning, setRealtimeWarning] = useState(WARNING_LEVEL.CANCEL);

  const handleCrawler = async () => {
    await axios({
      method: "GET",
      url: "https://data.weather.gov.hk/weatherAPI/opendata/hsww.php?lang=en",
    }).then((res) => {
      if (!res || !res.data || !res.data.warningLevel) {
        setRealtimeWarning(WARNING_LEVEL.CANCEL);
        // setRealtimeWarning(WARNING_LEVEL.AMBER);
      } else {
        setRealtimeWarning(res.data.warningLevel);
      }
    });
  };

  useEffect(() => {
    handleCrawler();

    const interval = setInterval(() => {
      handleCrawler();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 bg-(--color-secondary) h-[400px] pt-24  sm:h-[calc(100vh-6rem)]">
  
    </div>
  );
};
