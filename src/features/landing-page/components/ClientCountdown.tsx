'use client' // Mark as client component

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import React, { CSSProperties, useEffect, useMemo, useState } from 'react' // Import useState, useEffect, and useMemo

interface ClientCountdownProps {
  // No initialTargetDate prop needed anymore
}

const ClientCountdown: React.FC<ClientCountdownProps> = () => {
  const [targetDate, setTargetDate] = useState<number>(0) // Initialize with 0
  const [isMobile, setIsMobile] = useState(false)
  const [showCountdown, setShowCountdown] = useState(true) // New state to control visibility

  useEffect(() => {
    // Calculate eventDate only on the client side
    const eventDate = new Date('2025-11-22T12:00:00+09:00')
    const now = new Date()
    // Only show countdown if the event is in the future
    if (eventDate.getTime() > now.getTime()) {
      setTargetDate(eventDate.getTime())
    } else {
      setShowCountdown(false) // Hide if event has already passed
    }
  }, []) // Empty dependency array to run once on mount

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const styles = useMemo(
    () => ({
      labelStyle: {
        fontSize: isMobile ? '0.75rem' : '1rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        color: '#1e1e1e',
      } as CSSProperties,
      digitBlockStyle: {
        width: isMobile ? 30 : 50,
        height: isMobile ? 42 : 70,
        fontSize: isMobile ? 22 : 36,
        backgroundColor: '#f0f0f0',
        color: '#1e1e1e',
        borderRadius: 8,
      },
      dividerStyle: { color: '#1e1e1e', height: 1 },
      separatorStyle: { color: '#1e1e1e', size: isMobile ? '4px' : '6px' },
    }),
    [isMobile]
  )

  if (!showCountdown || targetDate === 0) {
    return null // Only render if showCountdown is true and targetDate is set
  }

  return (
    <FlipClockCountdown
      to={targetDate} // Use the state variable
      labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
      labelStyle={styles.labelStyle}
      digitBlockStyle={styles.digitBlockStyle}
      dividerStyle={styles.dividerStyle}
      separatorStyle={styles.separatorStyle}
      duration={0.5}
      className="flex justify-center"
      onComplete={() => setShowCountdown(false)} // Hide when countdown completes
    />
  )
}

export default ClientCountdown
