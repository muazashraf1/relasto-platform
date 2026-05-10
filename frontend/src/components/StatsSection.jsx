import { FaDollarSign, FaUserTie, FaFire, FaSmile } from "react-icons/fa";

export default function StatsSection() {
  return (
    <div className="w-full flex items-center justify-center bg-[#f3f0ee] p-9 ">
      
      <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        
        {/* ITEM 1 */}
        <div>
          <div className="w-[42px] h-[42px] mx-auto rounded-full bg-white shadow-sm flex items-center justify-center text-[#ff6b1a]">
            ⓢ
          </div>

          <h2 className="text-[34px] font-bold text-[#171717] mt-5">$15.4M</h2>

          <p className="text-[#3e6882] text-[14px] mt-3">
            Owned from<br />Properties transactions
          </p>
        </div>

        {/* ITEM 2 */}
        <div>
          <div className="w-[42px] h-[42px] mx-auto rounded-full bg-white shadow-sm flex items-center justify-center text-[#ff6b1a]">
            ⌘
          </div>

          <h2 className="text-[34px] font-bold text-[#171717] mt-5">25K+</h2>

          <p className="text-[#3e6882] text-[14px] mt-3">
            Properties for Buy & sell<br />Successfully
          </p>
        </div>

        {/* ITEM 3 */}
        <div>
          <div className="w-[42px] h-[42px] mx-auto rounded-full bg-white shadow-sm flex items-center justify-center text-[#ff6b1a]">
            ♨
          </div>

          <h2 className="text-[34px] font-bold text-[#171717] mt-5">500</h2>

          <p className="text-[#3e6882] text-[14px] mt-3">
            Daily completed<br />transactions
          </p>
        </div>

        {/* ITEM 4 */}
        <div>
          <div className="w-[42px] h-[42px] mx-auto rounded-full bg-white shadow-sm flex items-center justify-center text-[#ff6b1a]">
            ☺
          </div>

          <h2 className="text-[34px] font-bold text-[#171717] mt-5">600+</h2>

          <p className="text-[#3e6882] text-[14px] mt-3">
            Reagular Clients
          </p>
        </div>

      </div>
    </div>
  );
}