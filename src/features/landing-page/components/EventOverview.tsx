'use client'

import RegistrationButton from '@/components/common/RegistrationButton'
import eventData from '@/data/dev/event.json'
import {
  CalendarToday,
  ConfirmationNumber,
  LocationOn,
} from '@mui/icons-material'

const EventOverview = () => {
  const { eventOverview } = eventData

  return (
    <section
      className="container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl bg-off-white"
      data-testid="event-overview-section"
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="px-1 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg border-2 border-gray-800 h-full">
              <div className="flex items-center px-2 py-2 flex-auto">
                <div className="w-1/4 flex justify-center">
                  <div className="text-white p-2 text-center inline-flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 mb-3 sm:mb-5 shadow-lg rounded-full bg-red-400">
                    <CalendarToday />
                  </div>
                </div>
                <div className="w-3/4 text-left">
                  <h6 className="text-base sm:text-xl font-semibold">
                    Date & Time
                  </h6>
                  <p className="mt-1 mb-2 text-sm sm:text-base text-gray-600">
                    {eventOverview.date} <br /> {eventOverview.time}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-1 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg border-2 border-gray-800 h-full">
              <div className="flex items-center px-2 py-2 flex-auto">
                <div className="w-1/4 flex justify-center">
                  <div className="text-white p-2 text-center inline-flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 mb-3 sm:mb-5 shadow-lg rounded-full bg-blue-400">
                    <LocationOn />
                  </div>
                </div>
                <div className="w-3/4 text-left">
                  <h6 className="text-base sm:text-xl font-semibold">
                    Location
                  </h6>
                  <p className="mt-1 mb-2 text-sm sm:text-base text-gray-600">
                    <span>{eventOverview.location}</span>{' '}
                    <span className="text-gray-500">
                      {eventOverview.address}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-1 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg border-2 border-gray-800 h-full">
              <div className="flex items-center px-2 py-2 flex-auto">
                <div className="w-1/4 flex justify-center">
                  <div className="text-white p-2 text-center inline-flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 mb-3 sm:mb-5 shadow-lg rounded-full bg-green-400">
                    <ConfirmationNumber />
                  </div>
                </div>
                <div className="w-3/4 text-left">
                  <h6 className="text-base sm:text-xl font-semibold">
                    参加方法
                  </h6>
                  <p className="mt-1 mb-2 text-sm sm:text-base text-gray-600">
                    外部イベントページ (connpass.com)
                    から参加登録をお願いします。
                  </p>
                  <RegistrationButton
                    href={eventOverview.registrationUrl}
                    className="text-sm px-3 py-1"
                  >
                    参加登録
                  </RegistrationButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventOverview
