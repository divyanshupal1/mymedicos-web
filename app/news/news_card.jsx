"use client"
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

export function NewsCard({item}){
    item = JSON.parse(item)
    const [isExpanded, setIsExpanded] = useState(false);
    
    const time = Timestamp.fromMillis(item.Time._seconds*1000).toDate()
    
    let date = time.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    const description = isExpanded ? item.Description : item.Description.slice(0, 500);
  
    return (
      <div className="w-full ">
          <div className="w-full flex justify-between py-5 rounded-md max-sm:flex-col-reverse max-sm:gap-y-3 gap-x-4">
            <div className="news-content flex flex-col gap-y-3">
              <div className="w-fit border-2 px-3 py-1 rounded-full font-semibold">{date}</div>
              <div className="content">
                <h2 className="text-xl font-bold">{item.Title}</h2>
                <div dangerouslySetInnerHTML={{__html: description}}></div>
                {item.Description.length > 500 && (
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="text-primary hover:underline"
                  >
                    {isExpanded ? "Show Less" : "More"}
                  </button>
                )}
              </div>
              <div className=" flex gap-6">
                {
                    item?.URL!=="" &&
                    <a href={item.URL}>
                        <div className="continue  w-fit bg-secondary px-4 py-1 rounded-full font-semibold cursor-pointer"> View</div>
                    </a>
                }
              </div>
            </div>
            <div className="image rounded-md overflow-hidden w-full md:w-1/4 max-sm:h-[calc(100vh/4)] max-sm:min-h-[150px] drop-shadow-md  min-w-[300px]" style={{background:`url(${item.thumbnail})`,backgroundPosition:"center top",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}></div>
          </div>
  
          <div className="separator w-full flex gap-x-1  overflow-hidden">
            {
              Array(400).fill().map((_,i)=>(
                <div className="w-[2px] h-1 bg-gray-400 shrink-0" key={i}></div>
              ))
            }
          </div>
      </div>
    )
  }
  