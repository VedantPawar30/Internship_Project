import React from 'react'

function ProductCard({data}) {
    if(!data){
        return null
    }
  return (
    <a 
      href={data.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
    
        <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
            {data.image ? (
            <img 
                src={data.image} 
                alt={data.title} 
                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
            ) : (
            <div className="text-gray-400 text-sm">No Image</div>
            )}
        
            <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {data.price}
            </div>
        </div>

     
        <div className="p-4 flex flex-col grow">
            <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                {data.title}
            </h3>
            
            <div className="mt-auto pt-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide bg-slate-100 px-2 py-1 rounded">
                    View Deal
                </span>
            </div>
        </div>
    </a>
  )
}

export default ProductCard