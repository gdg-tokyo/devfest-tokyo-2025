export function Footer() {
  return (
    <footer className="bg-black-02 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h5 className="mb-4 text-google-yellow-500">About GDG Tokyo</h5>
            <p className="text-sm text-gray-300 leading-relaxed">
              Google Developers Group (GDG) Tokyo is a group of people who are
              interested in Google technology mainly and share information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="mb-4 text-google-yellow-500">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://gdg-tokyo.connpass.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-google-blue-500 transition-colors"
                >
                  Register on Connpass
                </a>
              </li>
              <li>
                <a
                  href="#timetable"
                  className="text-gray-300 hover:text-google-blue-500 transition-colors"
                >
                  View Timetable
                </a>
              </li>
              <li>
                <a
                  href="#search"
                  className="text-gray-300 hover:text-google-blue-500 transition-colors"
                >
                  Search Sessions
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 className="mb-4 text-google-yellow-500">Connect</h5>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">Google Developer Groups Tokyo</p>
              <div className="flex gap-3 mt-4">
                <div className="w-10 h-10 bg-[#4285f4] rounded-full"></div>
                <div className="w-10 h-10 bg-[#ea4335] rounded-full"></div>
                <div className="w-10 h-10 bg-[#fbbc04] rounded-full"></div>
                <div className="w-10 h-10 bg-[#34a853] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 GDG DevFest Tokyo. Organized by GDG Tokyo.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#4285f4] rounded"></div>
              <div className="w-6 h-6 bg-[#ea4335] rounded"></div>
              <div className="w-6 h-6 bg-[#fbbc04] rounded"></div>
              <div className="w-6 h-6 bg-[#34a853] rounded"></div>
            </div>
            <span className="text-sm text-gray-400 subhead">
              Google Developer Groups
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
