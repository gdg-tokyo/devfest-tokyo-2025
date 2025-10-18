import React from 'react'

interface OverlayMessageCardProps {
  message: string
  isVisible: boolean
}

const OverlayMessageCard: React.FC<OverlayMessageCardProps> = ({
  message,
  isVisible,
}) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center font-google-sans text-black-02">
        <p className="text-xl font-semibold mb-4">{message}</p>
        {/* You can add a button to retry or close here if needed */}
      </div>
    </div>
  )
}

export default OverlayMessageCard
