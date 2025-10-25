'use client'

import eventData from '@/data/dev/event.json'
import {
  CalendarToday,
  ConfirmationNumber,
  LocationOn,
} from '@mui/icons-material'

const EventOverview = () => {
  const { eventOverview } = eventData

  return (
    <section className="bg-off-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg border-2 border-gray-800 h-full">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                  <CalendarToday />
                </div>
                <h6 className="text-xl font-semibold">Date & Time</h6>
                <p className="mt-2 mb-4 text-gray-600">
                  {eventOverview.date} <br /> {eventOverview.time}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg border-2 border-gray-800 h-full">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                  <LocationOn />
                </div>
                <h6 className="text-xl font-semibold">Location</h6>
                <p className="mt-2 mb-4 text-gray-600">
                  <span>{eventOverview.location}</span>{' '}
                  <span className="text-gray-500">{eventOverview.address}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg border-2 border-gray-800 h-full">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                  <ConfirmationNumber />
                </div>
                <h6 className="text-xl font-semibold">Register</h6>
                <p className="mt-2 mb-4 text-gray-600">
                  <a
                    href={eventOverview.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventOverview
