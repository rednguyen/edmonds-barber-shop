"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import BookingModal from "@/components/BookingModal";

interface BookingContextValue {
  isOpen: boolean;
  preselectedServiceId?: string;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();

  const openBooking = useCallback((serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPreselectedServiceId(undefined);
  }, []);

  const value = useMemo(
    () => ({ isOpen, preselectedServiceId, openBooking, closeBooking }),
    [isOpen, preselectedServiceId, openBooking, closeBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
