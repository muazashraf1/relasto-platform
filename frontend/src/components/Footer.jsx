// Footer.jsx

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { IoHome } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[6%] pt-[85px] pb-[70px]">
        <div className="flex flex-col xl:flex-row justify-between gap-[70px]">
          
          {/* LEFT SIDE */}
          <div className="w-full xl:max-w-[260px] shrink-0">
            {/* LOGO */}
            <div className="flex items-center gap-2 text-[#ff6b00] mb-7">
              <IoHome className="text-[24px]" />
              <h2 className="text-[24px] font-bold">Relasto</h2>
            </div>

            {/* ADDRESS */}
            <p className="text-[14px] leading-[28px] text-[#222] mb-3">
              59 Beverly Hill Ave, Brooklyn Town,
              <br />
              New York, NY 5630, CA, US
            </p>

            <p className="text-[14px] text-[#222] mb-3">
              +(123) 456-7890
            </p>

            <p className="text-[14px] text-[#222]">
              info@mail.com
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-6 text-[#ff6b00]">
              <a
                href="#"
                className="hover:-translate-y-1 duration-300"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="hover:-translate-y-1 duration-300"
              >
                <FaTwitter size={14} />
              </a>

              <a
                href="#"
                className="hover:-translate-y-1 duration-300"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="#"
                className="hover:-translate-y-1 duration-300"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="#"
                className="hover:-translate-y-1 duration-300"
              >
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-12">
            
            {/* COLUMN 1 */}
            <div>
              <h3 className="text-[17px] font-semibold text-[#111] mb-6">
                Features
              </h3>

              <div className="flex flex-col gap-4">
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Home v1</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Home v2</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">About</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Contact</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Search</a>
              </div>
            </div>

            {/* COLUMN 2 */}
            <div>
              <h3 className="text-[17px] font-semibold text-[#111] mb-6">
                Information
              </h3>

              <div className="flex flex-col gap-4">
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Listing v1</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Listing v2</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Property Details</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Agent List</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Agent Profile</a>
              </div>
            </div>

            {/* COLUMN 3 */}
            <div>
              <h3 className="text-[17px] font-semibold text-[#111] mb-6">
                Documentation
              </h3>

              <div className="flex flex-col gap-4">
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Blog</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">FAQ</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Privacy Policy</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">License</a>
              </div>
            </div>

            {/* COLUMN 4 */}
            <div>
              <h3 className="text-[17px] font-semibold text-[#111] mb-6">
                Others
              </h3>

              <div className="flex flex-col gap-4">
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Log in</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Enter OTP</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">New Password</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Reset Password</a>
                <a href="#" className="text-[14px] text-[#222] hover:text-[#ff6b00] duration-300">Create Account</a>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-[80px] text-[14px] text-[#222]">
          © 2022. All rights reserved.
        </div>
      </div>
    </footer>
  );
}