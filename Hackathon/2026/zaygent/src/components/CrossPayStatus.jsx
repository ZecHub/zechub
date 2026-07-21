import { useEffect, useRef, useState } from "react";
import { COLORS } from "../constants/colors";

export default function CrossPayStatus({ execution, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed,   setCompleted]   = useState(false);
  const [failed,      setFailed]      = useState(false);
  const onCloseRef = useRef(onClose);

  const steps = [
    { id: "shield",  label: "Shielding ZEC",          icon: "Ⓩ", color: COLORS.amber, duration: 1500 },
    { id: "near",    label: "NEAR Intents Solving",    icon: "Ⓝ", color: COLORS.near,  duration: 2000 },
    { id: "deliver", label: `Delivering to ${execution?.chain || "chain"}`, icon: "◎", color: COLORS.blue, duration: 1000 },
  ];

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!execution) return;

    setCurrentStep(0);
    setCompleted(false);
    setFailed(false);

    let step = 0;
    let stepTimeout;
    let closeTimeout;

    const runStep = () => {
      if (step >= steps.length) {
        setCompleted(true);
        closeTimeout = window.setTimeout(() => {
          onCloseRef.current?.();
        }, 5000);
        return;
      }
      setCurrentStep(step);
      stepTimeout = window.setTimeout(() => {
        step++;
        runStep();
      }, steps[step]?.duration || 1500);
    };

    runStep();

    return () => {
      window.clearTimeout(stepTimeout);
      window.clearTimeout(closeTimeout);
    };
  }, [execution, steps.length]);

  if (!execution) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.teal}44`, borderRadius: 12, width: "100%", maxWidth: 420, padding: 24 }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: 1 }}>
              {completed ? "✅ CROSSPAY COMPLETE" : failed ? "❌ CROSSPAY FAILED" : "⚡ CROSSPAY EXECUTING"}
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 2 }}>
              {execution.zecAmount} ZEC → ${execution.usdcAmount} USDC on {execution.chain}
            </div>
          </div>
          {(completed || failed) && (
            <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.textSecondary, fontSize: 18, cursor: "pointer" }}>✕</button>
          )}
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {steps.map((step, i) => {
            const isDone    = completed || i < currentStep;
            const isActive  = !completed && i === currentStep;
            const isPending = !completed && i > currentStep;

            return (
              <div key={step.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* Step icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                    background: isDone ? step.color + "33" : isActive ? step.color + "22" : COLORS.bg,
                    border: `2px solid ${isDone ? step.color : isActive ? step.color + "88" : COLORS.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, color: isDone || isActive ? step.color : COLORS.textMuted,
                    transition: "all 0.3s",
                    boxShadow: isActive ? `0 0 12px ${step.color}44` : "none",
                  }}>
                    {isDone ? "✓" : step.icon}
                  </div>

                  {/* Step info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: isDone ? COLORS.textPrimary : isActive ? step.color : COLORS.textMuted }}>
                      {step.label}
                    </div>
                    {isActive && (
                      <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 2 }}>
                        Processing...
                      </div>
                    )}
                    {isDone && i === 0 && (
                      <div style={{ fontSize: 9, color: COLORS.teal, marginTop: 2, fontFamily: "monospace" }}>
                        tx: ZEC_SHIELD_{Date.now().toString().slice(-8)}
                      </div>
                    )}
                    {isDone && i === 1 && (
                      <div style={{ fontSize: 9, color: COLORS.near, marginTop: 2, fontFamily: "monospace" }}>
                        tx: NEAR_INTENT_{Date.now().toString().slice(-8)}
                      </div>
                    )}
                    {isDone && i === 2 && (
                      <div style={{ fontSize: 9, color: COLORS.blue, marginTop: 2, fontFamily: "monospace" }}>
                        tx: {execution.chain}_DELIVER_{Date.now().toString().slice(-8)}
                      </div>
                    )}
                  </div>

                  {/* Status indicator */}
                  <div>
                    {isDone && <span style={{ fontSize: 12, color: COLORS.teal }}>✅</span>}
                    {isActive && (
                      <div style={{ width: 12, height: 12, borderRadius: "50%", background: step.color, animation: "pulse 1s infinite" }} />
                    )}
                    {isPending && <span style={{ fontSize: 12, color: COLORS.textMuted }}>○</span>}
                  </div>
                </div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div style={{ marginLeft: 19, marginTop: 4, marginBottom: 4, width: 2, height: 12, background: isDone ? COLORS.teal + "66" : COLORS.border }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: COLORS.border, borderRadius: 2, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.teal})`, width: completed ? "100%" : `${(currentStep / steps.length) * 100}%`, transition: "width 0.5s ease" }} />
        </div>

        {/* Result */}
        {completed && (
          <div style={{ background: COLORS.teal + "11", border: `1px solid ${COLORS.teal}44`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>ZEC Sent</span>
              <span style={{ fontSize: 10, color: COLORS.amber, fontWeight: 700 }}>{execution.zecAmount} ZEC</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>USDC Received</span>
              <span style={{ fontSize: 10, color: COLORS.green, fontWeight: 700 }}>${execution.usdcAmount} USDC</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>Chain</span>
              <span style={{ fontSize: 10, color: COLORS.blue }}>{execution.chain}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>Privacy</span>
              <span style={{ fontSize: 10, color: COLORS.teal }}>🔐 SHIELDED</span>
            </div>
          </div>
        )}

        {/* Privacy note */}
        <div style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
          Source wallet identity shielded via Zcash sapling pool.<br />No on-chain linkability.
        </div>
      </div>
    </div>
  );
}