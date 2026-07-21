import { useState, useEffect } from "react";

const AGENT_API = "http://localhost:5001";
const FALLBACK_ADDRESS = {
  address: "t1Lzga2SGN3nVpBYF7zKDCRZDHsQ6oGNqQ5",
  type: "transparent",
  network: "mainnet",
  note: "Fallback transparent t-address",
};

export default function useZcashStats() {
  const [stats, setStats] = useState(null);
  const [address, setAddress] = useState(FALLBACK_ADDRESS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = () => {
      fetch(`${AGENT_API}/zcash`)
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            setStats(data.stats);
            setAddress(data.address || FALLBACK_ADDRESS);
          } else {
            setAddress(FALLBACK_ADDRESS);
          }
        })
        .catch(() => {
          setAddress(FALLBACK_ADDRESS);
        })
        .finally(() => setLoading(false));
    };

    fetch_();
    // Retry after 3 seconds if first fetch fails
    const retry    = setTimeout(fetch_, 3000);
    const interval = setInterval(fetch_, 120000);
    return () => { clearInterval(interval); clearTimeout(retry); };
  }, []);

  return { stats, address, loading };
}