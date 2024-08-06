"use client";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";

const GoogleTracker = () => {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: router.asPath });
      ReactGA.send("pageview");
    }
  }, [initialized, router]);
  return null;
};

export default GoogleTracker;
