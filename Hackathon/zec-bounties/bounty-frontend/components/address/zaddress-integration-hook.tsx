"use client";

import { useState, useEffect } from "react";
import { useBounty } from "@/lib/bounty-context";
import { ZAddressCollectionModal } from "./zaddress-collection-modal";
import { User } from "@/lib/types";

interface UseZAddressCollectionReturn {
  showZAddressModal: boolean;
  handleZAddressSubmit: (zAddress: string) => Promise<void>;
}

export function useZAddressCollection(): UseZAddressCollectionReturn {
  const { currentUser, zAddressUpdate } = useBounty();
  const [showZAddressModal, setShowZAddressModal] = useState(false);
  const [hasUserLoaded, setHasUserLoaded] = useState(false);
  const [stableUser, setStableUser] = useState<User | null>(null);

  // Check if Z-address collection is needed when user changes
  useEffect(() => {
    // ✅ Add delay to prevent brief flash during context loading
    const checkTimer = setTimeout(() => {
      if (currentUser !== null && currentUser !== undefined) {
        // ✅ Additional check: only proceed if user data has stabilized
        if (JSON.stringify(currentUser) === JSON.stringify(stableUser)) {
          // User data is stable, proceed with modal logic
          setHasUserLoaded(true);

          if (!currentUser.z_address) {
            setShowZAddressModal(true);
          } else {
            setShowZAddressModal(false);
          }
        } else {
          // User data changed, update stable user and wait
          setStableUser(currentUser);
        }
      } else if (currentUser === null) {
        // User explicitly set to null (logged out)
        setHasUserLoaded(false);
        setShowZAddressModal(false);
        setStableUser(null);
      }
    }, 300); // Reduced to 300ms for better UX

    return () => clearTimeout(checkTimer);
  }, [currentUser, stableUser]);

  const handleZAddressSubmit = async (zAddress: string) => {
    if (!currentUser) {
      throw new Error("No user logged in");
    }

    try {
      // Call backend to update user's Z-address
      const result = await zAddressUpdate(zAddress);
      console.log(result);

      // ✅ Close the modal after successful update
      setShowZAddressModal(false);
    } catch (error) {
      console.error("Failed to update Z-address:", error);
      throw error; // This will be caught by the modal's error handling
    }
  };

  return {
    showZAddressModal,
    handleZAddressSubmit,
  };
}

// Component wrapper that provides the Z-address collection functionality
interface ZAddressProviderProps {
  children: React.ReactNode;
}

export function ZAddressProvider({ children }: ZAddressProviderProps) {
  const { showZAddressModal, handleZAddressSubmit } = useZAddressCollection();

  return (
    <>
      {children}
      <ZAddressCollectionModal
        isOpen={showZAddressModal}
        onComplete={handleZAddressSubmit}
      />
    </>
  );
}
