"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToIoTLabs() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/iot-labs");
  }, [router]);

  return null;
}
