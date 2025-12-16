import Logo from "./Logo";
import { FaPhoneAlt } from "react-icons/fa";

import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] shadow-xl  text-gray-300">
      
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        
        {/* BRAND */}
        <div>
          <Logo />
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Modern blog platform built with React & Appwrite.
            Clean UI, fast performance, scalable backend.
          </p>
        </div>

        {/* ADDRESS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm leading-relaxed">
            Purushottam kapsikar<br/>
            At Post Kapsi Bk<br />
            Tq Loha, Dist Nanded<br />
            Maharashtra – 431602
          </p>
  <p className="mt-2 text-sm flex items-center gap-2">
       <FaPhoneAlt className="text-white text-sm" />
       <span className="text-gray-200">+91 91681 50241</span>
  </p>

        </div>

     


        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <div className="flex gap-4">
            
            <a
              href="#"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <FaInstagram className="text-xl" />
            </a>

            <a
              href="#"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <FaLinkedin className="text-xl" />
            </a>

            <a
              href="#"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <FaGithub className="text-xl" />
            </a>

            <a
              href="#"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <FaEnvelope className="text-xl" />
            </a>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-600 font-medium">
          MyBlog
        </span>{" "}
        — All rights reserved
      </div>

    </footer>
  );
}
