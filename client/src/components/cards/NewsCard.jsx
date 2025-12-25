import React from 'react'

function NewsCard({data}) {
    if (!data) {
        return null
    }
  return (
    <a href={data.link} target="_blank" rel="noopener noreferrer" className="flex gap-4 bg-white p-3 rounded-xl shadow-sm border border-transparent hover:border-slate-200 hover:shadow-md transition-all group">
      {data.image && (
        <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={data.image} 
            alt="news thumbnail" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
        <div className="flex flex-col justify-center">
            <h4 className="font-semibold text-slate-800 text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                {data.title}
            </h4>
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {data.source}
                </span>
            </div>
        </div>
    </a>
  );
}

export default NewsCard