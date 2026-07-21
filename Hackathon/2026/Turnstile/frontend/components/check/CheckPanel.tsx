"use client";

import { useState } from "react";

import { PrivacyNotice } from "@/components/check/PrivacyNotice";
import { ScanProgress } from "@/components/check/ScanProgress";
import { UfvkForm } from "@/components/check/UfvkForm";
import { VerdictCard } from "@/components/check/VerdictCard";
import { Alert02Icon, Icon } from "@/components/icons/Icon";
import { Button } from "@/components/ui/Button";
import type { ScanResult } from "@/lib/types";

const POLL_MS = 2000;

type State =
  | { status: "idle" }
  | { status: "scanning"; birthday: number }
  | { status: "done"; result: ScanResult }
  | { status: "failed"; message: string };

export function CheckPanel() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function scan(ufvk: string, birthday: number) {
    setState({ status: "scanning", birthday });

    try {
      const started = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ufvk, birthday }),
      });

      const accepted = await started.json();

      if (!started.ok) {
        setState({
          status: "failed",
          message: accepted.error ?? "The scan could not be started.",
        });
        return;
      }

      await poll(accepted.jobId as string);
    } catch {
      setState({
        status: "failed",
        message: "Could not reach the scan service. Your key was not stored anywhere.",
      });
    }
  }

  async function poll(jobId: string) {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, POLL_MS));

      const response = await fetch(`/api/scan/${jobId}`, { cache: "no-store" });
      const body = await response.json();

      if (!response.ok) {
        setState({
          status: "failed",
          message: body.error ?? "The scan could not be completed.",
        });
        return;
      }

      if (body.status === "done") {
        setState({ status: "done", result: body.result as ScanResult });
        return;
      }

      if (body.status === "failed") {
        setState({ status: "failed", message: body.error ?? "The scan failed." });
        return;
      }
    }
  }

  if (state.status === "scanning") {
    return <ScanProgress birthday={state.birthday} />;
  }

  if (state.status === "done") {
    return (
      <div className="flex flex-col gap-6">
        <VerdictCard result={state.result} />
        <Button variant="secondary" onClick={() => setState({ status: "idle" })}>
          Check another wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        {state.status === "failed" ? (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-exposed/40 bg-exposed/10 px-5 py-4 text-sm leading-relaxed text-exposed"
          >
            <Icon icon={Alert02Icon} size={16} />
            {state.message}
          </div>
        ) : null}

        <UfvkForm onScan={scan} />
      </div>

      <div className="lg:col-span-2">
        <PrivacyNotice />
      </div>
    </div>
  );
}
