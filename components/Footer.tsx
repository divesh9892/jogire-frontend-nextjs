import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    // Premium SVG Icons
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "https://threads.net",
    icon: (
      // FIX 3: Replaced with a mathematically perfect, crisp vector path of the Threads logo. No distortion.
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.072 13.916c-.76.54-1.684.823-2.671.823-2.316 0-4.048-1.554-4.048-3.953 0-2.41 1.76-3.953 4.095-3.953 1.256 0 2.378.502 3.12 1.385l1.625-1.328c-1.184-1.354-2.85-2.072-4.745-2.072-3.418 0-6.223 2.365-6.223 5.968 0 3.593 2.766 5.968 6.176 5.968 1.583 0 3.013-.532 4.086-1.464 1.137-.985 1.754-2.392 1.754-3.988V10.15h-2.083v1.144c-.75-.853-1.854-1.366-3.08-1.366-2.296 0-4.047 1.536-4.047 3.864 0 2.348 1.76 3.864 4.085 3.864.99 0 1.913-.284 2.671-.823v1.083zM12.067 11.75c1.237 0 2.185.835 2.185 2.04 0 1.216-.948 2.05-2.185 2.05-1.228 0-2.176-.834-2.176-2.05 0-1.205.948-2.04 2.176-2.04z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const navigation = {
  explore: [
    { name: "Our Programs", href: "/#programs" },
    { name: "The Team", href: "/#team" },
    { name: "Success Stories", href: "/#testimonials" },
    { name: "FAQ", href: "/#faq" },
  ],
  support: [
    { name: "Book a Session", href: "/#book-session" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 py-16 px-6 md:px-12 border-t border-[#1f2937]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 border-b border-[#1f2937] pb-16">
          
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-6">
              JogiRe
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
              Moving beyond superficial wellness. We blend ancient yogic wisdom with modern science to guide you toward conscious living, balanced nutrition, and inner awareness.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-3">Join the Community</h3>
            <p className="text-gray-400 mb-6 font-light">
              Subscribe to get holistic health tips, diet advice, and exclusive retreat invites directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-[#1f2937] border border-gray-700 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-studio-primary focus:border-transparent transition-all placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-studio-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-studio-accent focus:bg-studio-accent active:scale-95 transition-all duration-300 shadow-md whitespace-nowrap outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Linking & Connecting */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Explore */}
          <div>
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Explore</h3>
            <ul className="space-y-4">
              {navigation.explore.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="inline-block text-gray-400 hover:text-studio-primary focus:text-studio-primary active:text-studio-primary transition-all duration-300 group outline-none active:translate-x-1"
                  >
                    <span className="flex items-center">
                      <span className="w-0 h-0.5 bg-studio-primary mr-0 group-hover:w-3 group-focus:w-3 group-hover:mr-2 group-focus:mr-2 transition-all duration-300"></span>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Support & Legal</h3>
            <ul className="space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="inline-block text-gray-400 hover:text-studio-primary focus:text-studio-primary active:text-studio-primary transition-all duration-300 group outline-none active:translate-x-1"
                  >
                    <span className="flex items-center">
                      <span className="w-0 h-0.5 bg-studio-primary mr-0 group-hover:w-3 group-focus:w-3 group-hover:mr-2 group-focus:mr-2 transition-all duration-300"></span>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect With Us */}
          <div>
            <h3 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Connect With Us</h3>
            
            {/* Social Links Grid */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1f2937] hover:bg-studio-primary focus:bg-studio-primary w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-white focus:text-white transition-all duration-300 transform hover:-translate-y-1 focus:-translate-y-1 active:scale-90 shadow-sm outline-none"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Integrated & Properly Styled Contact Info */}
            <ul className="space-y-4 mb-10 text-base">
              <li>
                {/* FIX 2: Fixed hover color. Links now turn orange shaded (studio-primary), not generic white shaded. */}
                <a href="tel:+919876543210" className="inline-block text-gray-400 hover:text-studio-primary focus:text-studio-primary active:scale-95 transition-all duration-300 outline-none">
                  <span className="font-bold text-gray-300 mr-2">Phone:</span> +91 70238 31569
                </a>
              </li>
              <li>
                {/* FIX 2: Fixed hover color. */}
                <a href="mailto:support@jogire.com" className="inline-block text-gray-400 hover:text-studio-primary focus:text-studio-primary active:scale-95 transition-all duration-300 outline-none">
                  <span className="font-bold text-gray-300 mr-2">Email:</span> support@jogire.com
                </a>
              </li>
            </ul>

            {/* FIX 1: Location info moved below new contact block, but remaining within Column 3. */}
            <div className="mt-8 text-sm text-gray-500 font-light pt-8 border-t border-[#1f2937]">
              <p>Based in India.</p>
              <p>Practicing globally.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1f2937] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-light">
          <p>
            &copy; {new Date().getFullYear()} Jogire. All rights reserved.
          </p>
          <p>
            Designed with mindfulness.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;