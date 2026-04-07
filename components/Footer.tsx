import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    // Premium SVG Icons
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Threads",
    href: "https://threads.net",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
        <path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          clipRule="evenodd"
        />
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
    { name: "Book a Session", href: "/book" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-[#1f2937] bg-[#111827] px-6 py-16 text-gray-300 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-16 grid grid-cols-1 gap-12 border-b border-[#1f2937] pb-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white">JogiRe</h2>
            <p className="max-w-md text-lg leading-relaxed font-light text-gray-400">
              Moving beyond superficial wellness. We blend ancient yogic wisdom with modern science
              to guide you toward conscious living, balanced nutrition, and inner awareness.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="mb-3 text-xl font-bold text-white">Join the Community</h3>
            <p className="mb-6 font-light text-gray-400">
              Subscribe to get holistic health tips, diet advice, and exclusive retreat invites
              directly to your inbox.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="focus:ring-studio-primary flex-grow rounded-xl border border-gray-700 bg-[#1f2937] px-5 py-3.5 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-studio-primary hover:bg-studio-accent focus:bg-studio-accent rounded-xl px-8 py-3.5 font-bold whitespace-nowrap text-white shadow-md transition-all duration-300 outline-none active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Linking & Connecting */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Column 1: Explore */}
          <div>
            <h3 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">Explore</h3>
            <ul className="space-y-4">
              {navigation.explore.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-studio-primary focus:text-studio-primary active:text-studio-primary group inline-block text-gray-400 transition-all duration-300 outline-none active:translate-x-1"
                  >
                    <span className="flex items-center">
                      <span className="bg-studio-primary mr-0 h-0.5 w-0 transition-all duration-300 group-hover:mr-2 group-hover:w-3 group-focus:mr-2 group-focus:w-3"></span>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h3 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              Support & Legal
            </h3>
            <ul className="space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-studio-primary focus:text-studio-primary active:text-studio-primary group inline-block text-gray-400 transition-all duration-300 outline-none active:translate-x-1"
                  >
                    <span className="flex items-center">
                      <span className="bg-studio-primary mr-0 h-0.5 w-0 transition-all duration-300 group-hover:mr-2 group-hover:w-3 group-focus:mr-2 group-focus:w-3"></span>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect With Us */}
          <div>
            <h3 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              Connect With Us
            </h3>

            {/* Social Links Grid */}
            <div className="mb-10 grid grid-cols-3 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-studio-primary focus:bg-studio-primary flex h-12 w-12 transform items-center justify-center rounded-xl bg-[#1f2937] text-gray-400 shadow-sm transition-all duration-300 outline-none hover:-translate-y-1 hover:text-white focus:-translate-y-1 focus:text-white active:scale-90"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Integrated & Properly Styled Contact Info */}
            <ul className="mb-10 space-y-4 text-base">
              <li>
                {/* FIX 2: Fixed hover color. Links now turn orange shaded (studio-primary), not generic white shaded. */}
                <a
                  href="tel:+919876543210"
                  className="hover:text-studio-primary focus:text-studio-primary inline-block text-gray-400 transition-all duration-300 outline-none active:scale-95"
                >
                  <span className="mr-2 font-bold text-gray-300">Phone:</span> +91 70238 31569
                </a>
              </li>
              <li>
                {/* FIX 2: Fixed hover color. */}
                <a
                  href="mailto:namaste@jogire.com"
                  className="hover:text-studio-primary focus:text-studio-primary inline-block text-gray-400 transition-all duration-300 outline-none active:scale-95"
                >
                  <span className="mr-2 font-bold text-gray-300">Email:</span> namaste@jogire.com
                </a>
              </li>
            </ul>

            {/* FIX 1: Location info moved below new contact block, but remaining within Column 3. */}
            <div className="mt-8 border-t border-[#1f2937] pt-8 text-sm font-light text-gray-500">
              <p>Based in India.</p>
              <p>Practicing globally.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#1f2937] pt-8 text-sm font-light text-gray-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Jogire. All rights reserved.</p>
          <p>Designed with mindfulness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
