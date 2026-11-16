import React, { useState } from 'react';
import { MURLI_LIBRARY } from '../../data/murliContent';
import { BookOpen, CheckCircle, Search, Sparkles } from 'lucide-react';

interface MurliLibraryProps {
  onMarkRead?: (id: string) => void;
}

export const MurliLibrary: React.FC<MurliLibraryProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'सभी (All)' },
    { id: 'स्वराज्य और स्वराज्य अधिकारी', label: 'स्वराज्य' },
    { id: 'आत्मा और स्वमान', label: 'स्वमान' },
    { id: 'कर्म और कर्मातीत अवस्था', label: 'साक्षीपन' },
    { id: 'मन-बुद्धि-संस्कार', label: 'बीती को बिन्दी' },
    { id: 'ज्वालामुखी योग', label: 'ज्वालामुखी योग' },
    { id: 'फरिश्ता स्वरूप', label: 'फरिश्ता स्वरूप' }
  ];

  const filteredItems = MURLI_LIBRARY.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originalExcerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="bg-white rounded-2xl p-5 border border-gold-200/90 shadow-royal space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-serif uppercase tracking-widest text-gold-700 font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-maroon-700" />
            <span>Screen B • मुरली धारणा पुस्तकालय</span>
          </span>
          <h3 className="text-lg font-bold font-hindi text-maroon-800">
            ज्ञान को जीवन में उतारें
          </h3>
          <p className="text-xs text-spiritual-muted font-hindi">
            प्रमाणित मुरली महावाक्य एवं व्यावहारिक जीवन अनुप्रयोग।
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-spiritual-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="मुरली शीर्षक या विषय खोजें..."
          className="w-full pl-9 pr-3 py-2 text-xs border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-700 font-hindi bg-ivory-50/50"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all font-hindi border ${
              selectedCategory === cat.id
                ? 'bg-maroon-700 text-gold-100 border-maroon-700 font-bold shadow-xs'
                : 'bg-ivory-100 text-spiritual-dark border-gold-200 hover:bg-gold-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Murli List */}
      <div className="space-y-3.5 pt-1">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-gold-200/90 bg-ivory-50/40 hover:bg-ivory-50 transition-all space-y-2.5 shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] bg-gold-100 text-gold-800 px-2 py-0.5 rounded font-serif font-bold uppercase">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold font-hindi text-maroon-900 mt-1 leading-snug">
                  {item.title}
                </h4>
                <div className="text-[10px] text-spiritual-muted font-serif">
                  {item.murliDate} • {item.sourceReference}
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>प्रमाणित</span>
              </div>
            </div>

            {/* Excerpt */}
            <div className="p-3 bg-white rounded-lg border-l-2 border-maroon-700 text-xs text-spiritual-dark font-hindi italic leading-relaxed">
              "{item.originalExcerpt}"
            </div>

            <div className="space-y-1 text-xs font-hindi">
              <div>
                <strong className="text-maroon-800">सरल व्याख्या: </strong>
                <span className="text-spiritual-dark">{item.explanation}</span>
              </div>
              <div>
                <strong className="text-gold-700">व्यावहारिक प्रयोग: </strong>
                <span className="text-spiritual-dark">{item.practicalApplication}</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-gold-100 flex items-center justify-between text-[11px] font-hindi">
              <span className="flex items-center gap-1 text-maroon-700 font-semibold">
                <Sparkles className="w-3 h-3 text-gold-500" />
                <span>अभ्यास: {item.todayChallenge}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
