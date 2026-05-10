import React from "react";

const NewsConsultSection = () => {
  const cards = [
    {
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      title: "9 Easy-to-Ambitious DIY Projects to Improve Your Home",
    },
    {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      title: "Serie Shophouse Launch In July, Opportunity For Investors",
    },
    {
      img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
      title: "Looking for a New Place? Use This Time to Create Your Wishlist",
    },
  ];

  return (
    <section className="w-full bg-[#111] py-20">
      {/* FIX: horizontal spacing added */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-white text-3xl font-bold">
            News & Consult
          </h2>

          <button className="text-orange-500 text-sm flex items-center gap-2">
            Explore All <span>→</span>
          </button>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item, i) => (
            <div key={i} className="space-y-4">
              
              {/* FIX: image height reduced + better fit */}
              <img
                src={item.img}
                className="w-full h-[200px] object-cover rounded-md"
                alt=""
              />

              <h3 className="text-white text-xl leading-7 font-medium">
                {item.title}
              </h3>

              <button className="text-orange-500 text-sm flex items-center gap-2">
                Read the Article <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* SUBSCRIBE */}
        <div className="mt-16 bg-[#d6d6d6] rounded-md py-14 px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            
            <h3 className="text-3xl font-bold text-black">
              For Recent Update, News.
            </h3>

            <p className="text-gray-700 text-sm">
              We help businesses customize, automate and scale up production.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full bg-white sm:w-[300px] px-4 py-3 rounded-md outline-none"
              />

              <button className="bg-black text-white px-6 py-3 rounded-md">
                Subscribe
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsConsultSection;