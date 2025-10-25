'use client' // Mark as client component

import React, { useState, useEffect } from 'react' // Import useState and useEffect
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'

interface ClientCountdownProps {
  // No initialTargetDate prop needed anymore
}

const ClientCountdown: React.FC<ClientCountdownProps> = () => {
  const [targetDate, setTargetDate] = useState<number>(0) // Initialize with 0

  useEffect(() => {
    // Calculate eventDate only on the client side
    const eventDate = new Date('2025-11-22T00:00:00+09:00')
    setTargetDate(eventDate.getTime())
  }, []) // Empty dependency array to run once on mount

  if (targetDate === 0) {
    return null // Or a loading spinner
  }

  return (
    <FlipClockCountdown
      to={targetDate} // Use the state variable
      labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
      labelStyle={{
        fontSize: '1rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        color: '#1e1e1e',
      }}
      digitBlockStyle={{
        width: 50,
        height: 70,
        fontSize: 36,
        backgroundColor: '#f0f0f0',
        color: '#1e1e1e',
        borderRadius: 8,
      }}
      dividerStyle={{ color: '#1e1e1e', height: 1 }}
      separatorStyle={{ color: '#1e1e1e', size: '6px' }}
      duration={500}
      className="flex justify-center"
    />
  )
}

export default ClientCountdown
