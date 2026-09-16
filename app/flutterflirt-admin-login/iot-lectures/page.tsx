"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToIoTLabsAdmin() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/flutterflirt-admin-login/iot-labs");
  }, [router]);

  return null;
}
