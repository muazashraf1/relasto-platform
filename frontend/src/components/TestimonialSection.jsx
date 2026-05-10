import React from "react";

const TestimonialSection = () => {
  return (
    <section className="w-full bg-white py-[70px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-[80px]">
        
        {/* LEFT IMAGE */}
        <div className="flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
            alt="woman"
            className="w-[390px] h-[350px] rounded-[4px] object-cover object-top"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative max-w-[500px]">
          
          {/* QUOTE */}
          <span className="absolute top-[-10px] right-0 text-[95px] leading-none text-[#f4a172] font-light">
            ”
          </span>

          {/* NAME */}
          <h2 className="text-[22px] font-[700] text-[#1d1d1d]">
            Taylor Wilson
          </h2>

          {/* ROLE */}
          <p className="text-[15px] text-[#3d3d3d] mt-[6px]">
            Product Manager - Static Mania
          </p>

          {/* TEXT */}
          <p className="mt-[38px] text-[20px] leading-[50px] text-[#555] font-[400]">
            Eget eu massa et consectetur. Mauris donec. Leo a, id sed duis
            proin sodales. Turpis viverra diam porttitor mattis morbi ac amet.
            Euismod commodo. We get you customer relationships that last.
          </p>

          {/* BOTTOM BUTTONS */}
          <div className="flex items-center justify-between mt-[45px]">
            
            {/* PREVIOUS */}
            <button className="flex items-center gap-2 text-[#7b7b7b] text-[16px]">
              <span className="text-[20px]">←</span>
              Previews
            </button>

            {/* NEXT */}
            <button className="flex items-center gap-2 text-[#ff6b00] text-[16px] font-medium">
              Next
              <span className="text-[20px]">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;