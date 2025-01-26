"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NewsTabs({ activeTab, setActiveTab }) {
  return (
    <Tabs 
      defaultValue={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 bg-gray-100">
        <TabsTrigger 
          value="latest" 
          className="data-[state=active]:bg-[#03BFA6] data-[state=active]:text-white"
        >
          Latest
        </TabsTrigger>
        <TabsTrigger 
          value="trending" 
          className="data-[state=active]:bg-[#03BFA6] data-[state=active]:text-white"
        >
          Trending
        </TabsTrigger>
        <TabsTrigger 
          value="most-read" 
          className="data-[state=active]:bg-[#03BFA6] data-[state=active]:text-white"
        >
          Most Read
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}