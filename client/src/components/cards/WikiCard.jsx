import { HiArrowRight } from "react-icons/hi";

function WikiCard({data}){
    if (!data) {
        return null
    }

  return (
    <div className="bg-white rounded-xl shadow-sm border-l-4 border-blue-500 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
      
      <div className="grow">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span>📖</span> {data.title}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-3 line-clamp-3 md:line-clamp-none">
          {data.summary}
        </p>
        <a 
          href={data.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          Read full article on Wikipedia 
          <HiArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}

export default WikiCard