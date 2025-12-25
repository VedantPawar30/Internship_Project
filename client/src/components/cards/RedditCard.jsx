import React from 'react'
import { HiChevronUp } from "react-icons/hi";

function RedditCard({data}) {
    if (!data) {
        return null
    }
  return (
    <a 
      href={data.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-orange-300 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center min-w-12 bg-orange-50 rounded-lg p-1.5 text-orange-600">
          <HiChevronUp className="w-4 h-4 mb-0.5" />
          <span className="text-xs font-bold">{data.score}</span>
        </div>

        <div>
          <h4 className="font-medium text-slate-800 text-sm leading-snug hover:text-orange-600 transition-colors">
            {data.title}
          </h4>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">r/</span>
            Reddit Community
          </p>
        </div>
      </div>
    </a>
  )
}

export default RedditCard