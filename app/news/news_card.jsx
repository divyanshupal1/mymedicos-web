// components/NewsCard.jsx
"use client"
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { 
  Filter, 
  Search, 
  ChevronFirst, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export function NewsCard({ item }) {
  item = JSON.parse(item);
  const time = Timestamp.fromMillis(item.Time._seconds * 1000).toDate();

  const date = time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div 
        className="aspect-video w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `url(${item.thumbnail})`,
        }}
      />
      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-500 flex items-center justify-between">
          <span>{date}</span>
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            {item.category || 'News'}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{item.Title}</h2>
        <div className="flex justify-between items-center mt-4">
          {item.Description.length > 100 && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  Read More
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{item.Title}</DrawerTitle>
                  <DrawerDescription>{date}</DrawerDescription>
                </DrawerHeader>
                <div 
                  className="p-6 max-h-[70vh] overflow-y-auto prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: item.Description }}
                />
                <div className="p-4">
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          )}
          {item?.URL && (
            <a 
              href={item.URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              Full Article <ChevronRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}