import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; 
import { MagnifyingGlass } from 'react-loader-spinner';
import api from './services/api';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await api.get(`/api/search/${query}`);
      setData(response.data.data);
    } catch (err) {
      console.error("Search Error:", err);
      setError("Failed to fetch data. Please try again or check your server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      

      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <main className="py-10 min-h-[80vh]">
        
        {loading && (
          <div className="flex flex-col items-center justify-center mt-20 space-y-4">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#2563eb" 
            />
            <p className="text-slate-500 font-medium animate-pulse">
              Searching the internet...
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mt-10 p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-600">
            <p>{error}</p>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="flex flex-col items-center justify-center mt-20 opacity-50">
            <FaSearch className="text-6xl text-slate-300 mb-4" />
            <p className="text-xl text-slate-400 font-medium">
              Search for a topic to get started
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Try "iPhone 15", "Bitcoin", or "Climate Change"
            </p>
          </div>
        )}

        {!loading && data && (
          <Dashboard data={data} />
        )}

      </main>

      <footer className="text-center py-6 text-slate-400 text-sm border-t border-slate-200">
        <p>Keyword-Search Project • Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;