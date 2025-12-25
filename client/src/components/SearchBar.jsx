import {useState} from 'react'
import { FcSearch } from "react-icons/fc";
function SearchBar({onSearch}) {
    const [query,setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.trim() === '') return;
        onSearch(query);
    }

  return (
    <div className=' w-full max-w-2xl mx-auto mb-10'>
        <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-8 tracking-tight">
            Keyword<span className="text-blue-600">Search</span>
        </h1>

        <form onSubmit={handleSubmit} className=' relative group'>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          
                <FcSearch size={24} />
            </div>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your interest..."
                className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 transition-colors duration-200">
                Search
            </button>
        </form>

    </div>
  )
}

export default SearchBar