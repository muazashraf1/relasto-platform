import React from "react";

const PropertyLanding = () => {
    return (
        <div className="bg-[#f6f3f1] min-h-screen py-16 px-6 md:px-14">
            <div className="max-w-6xl mx-auto flex flex-col gap-28">

                {/* TOP SECTION */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT TEXT */}
                    <div className="max-w-md">
                        <h1 className="text-[42px] leading-[52px] font-bold text-[#111]">
                            Simple & easy way to find your dream Apartment
                        </h1>

                        <p className="text-[#8b8b8b] text-[14px] leading-7 mt-6">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. In a free hour, when our power of choice is
                            untrammelled and when nothing prevents our being able to do what
                            we like best, every pleasure is to be welcomed.
                        </p>

                        <button className="mt-7 bg-black text-white text-sm px-5 py-3 rounded-md hover:bg-[#222] transition">
                            Get Started
                        </button>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="flex gap-4 justify-center">

                        {/* BIG IMAGE */}
                        <img
                            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop"
                            alt=""
                            className="w-[250px] h-[290px] object-cover rounded-[10px]"
                        />

                        {/* SMALL IMAGES */}
                        <div className="flex flex-col gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                                alt=""
                                className="w-[170px] h-[135px] object-cover rounded-[10px]"
                            />

                            <img
                                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop"
                                alt=""
                                className="w-[170px] h-[135px] object-cover rounded-[10px]"
                            />
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT IMAGE */}
                    <div className="relative w-fit">

                        {/* ORANGE BG */}
                        <div className="absolute bottom-[-15px] left-[-15px] w-full h-full bg-[#ff6b00] rounded-[6px]"></div>

                        <img
                            src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1000&auto=format&fit=crop"
                            alt=""
                            className="relative z-10 w-[380px] h-[300px] object-cover rounded-[6px]"
                        />
                    </div>

                    {/* RIGHT TEXT */}
                    <div className="max-w-md">
                        <h2 className="text-[38px] leading-[48px] font-bold text-[#111]">
                            Best rated host on popular rental sites
                        </h2>

                        <p className="text-[#8b8b8b] text-[14px] leading-7 mt-5">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. In a free hour, when our power of choice is
                            untrammelled.
                        </p>

                        {/* FEATURES */}
                        <div className="mt-7 flex flex-col gap-4">

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[11px]">
                                    ✓
                                </div>
                                <p className="text-[14px] text-[#444]">
                                    Find excellent deals
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[11px]">
                                    ✓
                                </div>
                                <p className="text-[14px] text-[#444]">
                                    Friendly host & fast support
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[11px]">
                                    ✓
                                </div>
                                <p className="text-[14px] text-[#444]">
                                    Secure payment system
                                </p>
                            </div>
                        </div>

                        <button className="mt-8 bg-black text-white text-sm px-5 py-3 rounded-md hover:bg-[#222] transition">
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyLanding;