"use client"
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function NewsCard({ item }) {
  item = JSON.parse(item)
  const [isExpanded, setIsExpanded] = useState(false);

  const time = Timestamp.fromMillis(item.Time._seconds * 1000).toDate()

  let date = time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-start justify-start rounded-md max-sm:gap-y-3 gap-x-4 border border-gray-200 shadow-sm">
        <div className="image rounded-md overflow-hidden w-full min-w-[300px] aspect-[2/1]" style={{ background: `url(${item.thumbnail})`, backgroundPosition: "center top", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></div>
        <div className="news-content flex flex-col items-start justify-between h-max min-h-fit  gap-y-3 p-3">
          <div className="w-fit text-sm text-neutral-500  font-semibold">{date}</div>
          <div className="content">
            <h2 className="text-xl font-bold">{item.Title}</h2>
            {/* <div dangerouslySetInnerHTML={{ __html: item.Description.slice(0, 200) }}></div> */}
            
          </div>
        </div>
        <div className=" flex gap-4 mt-auto p-3 w-full justify-start items-center">
        {item.Description.length > 100 && (
              <Drawer>
                <DrawerTrigger className="text-primary"><Button variant="secondary" className="rounded-full">Read More..</Button></DrawerTrigger>
                <DrawerContent >
                  <DrawerHeader>
                    <DrawerTitle>{item.Title}</DrawerTitle>
                    <DrawerDescription>{date}</DrawerDescription>
                  </DrawerHeader>
                  <div className="w-full whitespace-normal p-6 max-h-[calc(100vh-200px)] overflow-y-auto" dangerouslySetInnerHTML={{ __html: item.Description }}></div>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
            {
              item?.URL !== "" &&
              <a href={item.URL}>
                <div className="continue  w-fit text-neutral-700 px-4 py-1 rounded-full font-medium cursor-pointer">Read full article</div>
              </a>
            }
        </div>

      </div>

      {/* <div className="separator w-full flex gap-x-1  overflow-hidden">
        {
          Array(400).fill().map((_, i) => (
            <div className="w-[2px] h-1 bg-gray-400 shrink-0" key={i}></div>
          ))
        }
      </div> */}
    </div>
  )
}
