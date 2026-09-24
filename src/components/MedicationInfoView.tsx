import React, { useState, useMemo } from 'react';
import { 
  MEDICATIONS_DATABASE, 
  ALL_THERAPEUTIC_CATEGORIES, 
  type MedicationEntry 
} from '../data/medicationDatabase';
import { useTranslation } from '../context/LanguageContext';
import { 
  Pill, 
  Search, 
  Filter, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  MapPin
} from 'lucide-react';

interface MedicationInfoViewProps {
  onFindPharmacyForMedication?: (medName: string) => void;
}

const ITEMS_PER_PAGE = 12;

export const MedicationInfoView: React.FC<MedicationInfoViewProps> = ({
  onFindPharmacyForMedication
}) => {
  const { language } = useTranslation();
  
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'OTC' | 'Prescription'>('All');
  const [sortBy, setSortBy] = useState<'A-Z' | 'Category'>('A-Z');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMed, setSelectedMed] = useState<MedicationEntry | null>(null);

  // Search & Filter Logic
  const filteredMeds = useMemo(() => {
    return MEDICATIONS_DATABASE.filter((med) => {
      // 1. Category Filter
      if (selectedCategory !== 'All' && med.category !== selectedCategory) {
        return false;
      }

      // 2. Prescription Status Filter
      if (selectedStatus !== 'All') {
        if (selectedStatus === 'OTC' && med.prescriptionStatus !== 'OTC') return false;
        if (selectedStatus === 'Prescription' && med.prescriptionStatus === 'OTC') return false;
      }

      // 3. Search Query Filter (Generic name, brand name, active ingredient DCI, category)
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesBrand = med.brandNames.some(b => b.toLowerCase().includes(q));
        const activeIng = (med.activeIngredients[language] || med.activeIngredients.FR || '').toLowerCase();
        const genericName = (med.genericName[language] || med.genericName.FR || '').toLowerCase();
        const cat = med.category.toLowerCase();

        if (!matchesBrand && !activeIng.includes(q) && !genericName.includes(q) && !cat.includes(q)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'A-Z') {
        const nameA = a.brandNames[0] || a.genericName.FR;
        const nameB = b.brandNames[0] || b.genericName.FR;
        return nameA.localeCompare(nameB);
      } else {
        return a.category.localeCompare(b.category);
      }
    });
  }, [query, selectedCategory, selectedStatus, sortBy, language]);

  // Reset pagination on filter change
  const totalPages = Math.ceil(filteredMeds.length / ITEMS_PER_PAGE) || 1;
  const paginatedMeds = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMeds.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMeds, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Pill className="w-3.5 h-3.5" />
            <span>Medication Reference • ANAM Morocco / WHO (100+ Entries)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Morocco Medication Reference Database
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            Explore 100+ verified therapeutic entries, DCI active ingredients, brand names in Morocco, precautions, warnings, and storage rules.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search medicine, DCI ingredient or brand (e.g., Paracétamol, Doliprane, Augmentin, Spasfon)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Safety & Educational Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-slate-900 dark:text-white mb-0.5">Educational Purpose Notice</span>
          <span>This information is provided for educational purposes only. It does not replace advice, diagnosis, or prescription from a pharmacist or healthcare professional.</span>
        </div>
      </div>

      {/* Main Layout: Sidebar Categories + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filters (Desktop) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm space-y-6">
          
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Therapeutic Categories</span>
            </h3>

            <div className="space-y-1 max-h-72 overflow-y-auto pr-1 text-xs font-semibold scrollbar-thin">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${
                  selectedCategory === 'All'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] opacity-75">{MEDICATIONS_DATABASE.length}</span>
              </button>

              {ALL_THERAPEUTIC_CATEGORIES.map((cat) => {
                const count = MEDICATIONS_DATABASE.filter(m => m.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className="text-[10px] opacity-75">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 uppercase tracking-wider">
              Prescription Status
            </h4>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              {(['All', 'OTC', 'Prescription'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setSelectedStatus(st);
                    setCurrentPage(1);
                  }}
                  className={`flex-1 py-1.5 rounded-lg transition ${
                    selectedStatus === st
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2 uppercase tracking-wider">
              Sort Results
            </h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="A-Z">Name (A-Z)</option>
              <option value="Category">Category</option>
            </select>
          </div>

        </div>

        {/* Right Content Grid */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Top Bar Summary */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
            <span>
              Showing <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{filteredMeds.length}</span> medications
            </span>
            <span>Page {currentPage} of {totalPages}</span>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedMeds.map((med) => {
              const activeIng = med.activeIngredients[language] || med.activeIngredients.FR;
              const purpose = med.description[language] || med.description.FR;

              return (
                <div
                  key={med.id}
                  onClick={() => setSelectedMed(med)}
                  className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                        {med.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        med.prescriptionStatus === 'OTC'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {med.prescriptionStatus}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
                      {med.brandNames.join(' / ')}
                    </h3>

                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      DCI: {activeIng}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {purpose}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span>View Monograph</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Medication Monograph Modal */}
      {selectedMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {selectedMed.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {selectedMed.prescriptionStatus}
                  </span>
                </div>
                <h2 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {selectedMed.brandNames.join(' / ')}
                </h2>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Active DCI: {selectedMed.activeIngredients[language] || selectedMed.activeIngredients.FR}
                </p>
              </div>
              <button
                onClick={() => setSelectedMed(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pr-2">
              
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Description</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  {selectedMed.description[language] || selectedMed.description.FR}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">General Therapeutic Uses</h4>
                <ul className="space-y-1 text-xs">
                  {(selectedMed.generalUses[language] || selectedMed.generalUses.FR).map((u, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">Available Dosage Forms</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedMed.forms[language] || selectedMed.forms.FR).map((f, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">Precautions & Administration</h4>
                <ul className="space-y-1 text-xs">
                  {(selectedMed.precautions[language] || selectedMed.precautions.FR).map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-300 text-xs">
                <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Important Warnings & Contraindications</span>
                </h4>
                <ul className="space-y-1">
                  {(selectedMed.warnings[language] || selectedMed.warnings.FR).map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Storage: {selectedMed.storage[language] || selectedMed.storage.FR}</span>
                <span>Source: {selectedMed.sources}</span>
              </div>

            </div>

            {/* Contextual Pharmacy Finder CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Looking for a pharmacy stocking this medication?
              </span>
              <button
                onClick={() => {
                  const brand = selectedMed.brandNames[0] || selectedMed.genericName.FR;
                  setSelectedMed(null);
                  if (onFindPharmacyForMedication) onFindPharmacyForMedication(brand);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Find Pharmacy</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
