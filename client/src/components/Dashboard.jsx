import React from 'react';
import { MdLightbulb, MdShoppingCart, MdArticle } from 'react-icons/md'
import { FaReddit } from 'react-icons/fa'
import WikiCard from './cards/WikiCard'
import ProductCard from './cards/ProductCard'
import NewsCard from './cards/NewsCard'
import RedditCard from './cards/RedditCard'

function Dashboard({ data }){
  if (!data) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 space-y-12">
     
      {data.wikiData && (
        <section>
          <div className="mb-4 flex items-center gap-2 text-slate-800">
            <MdLightbulb className="text-2xl text-blue-600" />
            <h2 className="text-xl font-bold">Quick Summary</h2>
          </div>
          <WikiCard data={data.wikiData} />
        </section>
      )}

    
      {data.productData?.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800">
              <MdShoppingCart className="text-2xl text-emerald-600" />
              <h2 className="text-xl font-bold">Market Trends</h2>
            </div>
            <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
              {data.productData.length} Items Found
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.productData.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        </section>
      )}

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <MdArticle className="text-2xl text-purple-600" />
            <h2 className="text-xl font-bold">Latest Headlines</h2>
          </div>
          <div className="space-y-4">
            {data.newsData?.length > 0 ? (
              data.newsData.map((news, index) => (
                <NewsCard key={index} data={news} />
              ))
            ) : (
              <p className="text-slate-400 italic">No news articles found.</p>
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <FaReddit className="text-2xl text-orange-600" />
            <h2 className="text-xl font-bold">Community Chatter</h2>
          </div>
          <div className="space-y-3">
             {data.redditData?.length > 0 ? (
               data.redditData.map((post, index) => (
                 <RedditCard key={index} data={post} />
               ))
             ) : (
               <p className="text-slate-400 italic">No community discussions found.</p>
             )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;