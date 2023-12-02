"use client";
import {Suspense, useEffect} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {load, trackPageview} from "fathom-client";

const SITE_ID = process.env.NEXT_PUBLIC_FATHOM_SITE_ID || "";

const TrackPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    load(SITE_ID, {spa: "auto"});
  }, []);

  useEffect(() => {
    trackPageview();
  }, [pathname, searchParams]);
  return null;
};

const Fathom = () => {
  return (
    <Suspense fallback={null}>
      <TrackPageView/>
    </Suspense>
  );
};
export default Fathom;