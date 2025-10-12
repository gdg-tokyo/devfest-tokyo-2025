import Image from 'next/image';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

export function Hero() {
  return (
    <div
      className="relative flex flex-col items-center justify-center p-8 overflow-hidden rounded-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-google-blue-500 to-google-yellow-500 opacity-30"></div>
      <div className="absolute inset-0 z-0">
        {/* Random circles for autumn theme */}
        <div
          className="absolute w-12 h-12 bg-google-red-500 rounded-full opacity-20 top-1/4 left-1/4 animate-pulse"
        ></div>
        <div
          className="absolute w-8 h-8 bg-google-green-500 rounded-full opacity-20 top-1/2 right-1/4 animate-pulse delay-100"
        ></div>
        <div
          className="absolute w-16 h-16 bg-google-yellow-500 rounded-full opacity-20 bottom-1/4 left-1/3 animate-pulse delay-200"
        ></div>
        <div
          className="absolute w-10 h-10 bg-google-blue-500 rounded-full opacity-20 top-1/3 right-1/3 animate-pulse delay-300"
        ></div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/images/devfest-tokyo-2025-logo.png"
          alt="DevFest Tokyo 2025 Logo"
          width={500}
          height={250}
        />
        <p className="text-2xl md:text-3xl mb-2">Find your new \"eyes\"</p>
        <p className="text-lg subhead">~ 3つの新たな視点に出会える一日 ~</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8"> {/* Container for buttons */}
          <a href="https://gdg-tokyo.connpass.com/event/369416/" target="_blank" rel="noopener noreferrer">
            <button className="bg-google-red-500 hover:bg-google-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center gap-2"> {/* Updated button style and added flex for icon */}
              <LaunchIcon className="w-5 h-5" />
              Register Now
            </button>
          </a>
          <Link href="/timetable">
            <button className="bg-google-blue-500 hover:bg-google-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
              View Event Timetable
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


