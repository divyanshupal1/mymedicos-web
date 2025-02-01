"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { NewsCard } from "./news_card";
import { NewsPagination } from "./news_pagination";
import { SearchBar } from "./news_search";
import { NewsTabs } from "./news_tabs";
import { NewsFilter } from "./news_filter";
import { ChevronRight, Flame, TrendingUp } from "lucide-react";

const TrendingTopicsCarousel = () => {
  const trendingTopics = [
    { id: 1, title: "AI in Healthcare", link: "#" },
    { id: 2, title: "COVID-19 Updates", link: "#" },
    { id: 3, title: "Mental Health Research", link: "#" },
    { id: 4, title: "Breakthrough Cancer Treatment", link: "#" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4">
        <TrendingUp className="mr-2 text-[#03BFA6]" />
        <h3 className="text-lg font-semibold text-gray-800">Trending Topics</h3>
      </div>
      <div className="space-y-3">
        {trendingTopics.map((topic) => (
          <a
            key={topic.id}
            href={topic.link}
            className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-md transition"
          >
            <span className="text-sm text-gray-700">{topic.title}</span>
            <ChevronRight className="text-gray-400" size={16} />
          </a>
        ))}
      </div>
    </div>
  );
};

const GoogleAdMobPlaceholder = () => {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-[250px] flex items-center justify-center">
        <div className="text-center">
          {/* Google AdSense/AdMob Script */}
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "300px", height: "250px" }}
            data-ad-client="ca-pub-XXXXXXXXXX" // Replace with your AdSense/AdMob publisher ID
            data-ad-slot="1234567890" // Replace with your Ad slot ID
          ></ins>
          <script>
            {`
              (adsbygoogle = window.adsbygoogle || []).push({});
            `}
          </script>
        </div>
      </div>
    );
  };
  
export function InteractiveNews({ news, totalPages, currentPage }) {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("latest");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSearch = (query) => {
    // setLoading(true);
    // setSearchQuery(query);
    router.push(`/news?page=1&query=${encodeURIComponent(query)}`)
      // .finally(() => setLoading(false)); // Reset loading after navigation
  };  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 relative">
      {/* Main Content Column */}
      <div>
        <div className="sticky top-0 z-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
            {/* <SearchBar onSearch={handleSearch} />
            <NewsFilter filters={filters} setFilters={setFilters} /> */}
            <NewsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-6">
          {news.map((item) => (
            <NewsCard key={item.id} item={JSON.stringify(item)} />
          ))}
        </div>

        <NewsPagination totalPages={totalPages} currentPage={currentPage} />
      </div>

      <div className="hidden lg:block sticky top-12 self-start space-y-6">
        <TrendingTopicsCarousel />
        <GoogleAdMobPlaceholder />
      </div>
    </div>
  );
}

export default InteractiveNews;

