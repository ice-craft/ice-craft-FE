"use client";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { usePathname } from "next/navigation";

const GoogleTracker = () => {
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: pathname });
      ReactGA.send("pageview");
    }
  }, [initialized, pathname]);
  return null;
};

export default GoogleTracker;
