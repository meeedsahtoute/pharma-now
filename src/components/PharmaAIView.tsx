import React, { useState, useRef, useEffect } from 'react';
import { sendHealthAiQuery, type StructuredAiResponse, type ChatMessage } from '../services/aiHealthAssistant';
import { useTranslation } from '../context/LanguageContext';
import type { MedicationEntry } from '../data/medicationDatabase';
import { 
  Sparkles, 
  Send, 
  AlertTriangle, 
  MapPin, 
  Pill, 
  Stethoscope, 
  Phone, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  X,
  ChevronRight,
  RefreshCw,
  User,
  Bot,
  ShieldAlert,
  Info
} from 'lucide-react';

interface FullChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  data?: StructuredAiResponse;
  timestamp: Date;
}

interface PharmaAIViewProps {
  currentCity: string;
  countryCode: string;
  onGoToPharmacySearch: (query: string) => void;
}

export const PharmaAIView: React.FC<PharmaAIViewProps> = ({
  currentCity,
  countryCode,
  onGoToPharmacySearch
}) => {
  const { isRTL } = useTranslation();
  const [inputQuery, setInputQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<FullChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [selectedMedModal, setSelectedMedModal] = useState<MedicationEntry | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: 'راسي كيضرني', query: 'راسي كيضرني' },
    { label: 'I have a headache', query: 'I have a headache' },
    { label: 'J\'ai mal à la tête', query: 'J\'ai mal à la tête' },
    { label: 'عندي السخانة', query: 'عندي السخانة' },
    { label: 'I have stomach pain', query: 'I have stomach pain' },
    { label: 'I have chest pain', query: 'I have chest pain' },
    { label: 'I can\'t breathe', query: 'I can\'t breathe' },
    { label: 'Pharmacy in Nador', query: 'pharmacie de garde Nador' }
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isAnalyzing]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isAnalyzing) return;

    setErrorState(null);
    setInputQuery('');

    const userMessage: FullChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date()
    };

    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    setIsAnalyzing(true);

    try {
      const apiMessages: ChatMessage[] = newHistory.map(m => ({
        role: m.role,
        content: m.content
      }));

      const responseData = await sendHealthAiQuery(apiMessages, currentCity, countryCode);

      const assistantMessage: FullChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseData.summary,
        data: responseData,
        timestamp: new Date()
      };

      setChatHistory([...newHistory, assistantMessage]);
    } catch (err) {
      console.error('Failed to get AI response:', err);
      setErrorState('PHARMA AI is temporarily unavailable. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetryLast = () => {
    const lastUserIndex = [...chatHistory].reverse().findIndex(m => m.role === 'user');
    if (lastUserIndex !== -1) {
      const realIndex = chatHistory.length - 1 - lastUserIndex;
      const lastText = chatHistory[realIndex].content;
      handleSendMessage(lastText);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col min-h-[calc(100vh-140px)]">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl mb-6 relative overflow-hidden shrink-0">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PHARMA AI • Clinical Triage & Evidence Assistant</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
            PHARMA AI
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Describe how you're feeling and get safe, evidence-based health guidance connected to verified medications and local Moroccan pharmacies.
          </p>

          {/* Quick Starter Prompts */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-semibold">
            <span className="text-slate-400 font-medium text-[11px]">Quick Prompts:</span>
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                disabled={isAnalyzing}
                onClick={() => handleSendMessage(p.query)}
                className="px-2.5 py-1 rounded-xl bg-slate-800/90 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-200 transition text-[11px] disabled:opacity-50 active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Stream Container */}
      <div className="flex-1 space-y-6 mb-6">
        
        {/* Empty State */}
        {chatHistory.length === 0 && (
          <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">
              How are you feeling today?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Type your symptoms or select a quick prompt above. PHARMA AI will evaluate emergency red flags, ask relevant questions, and guide you safely.
            </p>
          </div>
        )}

        {/* Chat Stream Messages */}
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
          >
            {/* User Message Bubble */}
            {msg.role === 'user' && (
              <div className="flex items-start gap-2.5 max-w-xl">
                <div className="p-4 rounded-3xl bg-emerald-600 text-white shadow-md text-sm font-semibold rounded-tr-none">
                  {msg.content}
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <User className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* AI Assistant Message Card */}
            {msg.role === 'assistant' && msg.data && (
              <div className="flex items-start gap-3 w-full max-w-3xl">
                <div className="w-9 h-9 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>

                <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-md space-y-6 text-slate-800 dark:text-slate-200">
                  
                  {/* TRIAGE STATUS BADGE */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Evaluation Status:</span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                        msg.data.triageCategory === 'URGENT MEDICAL ATTENTION'
                          ? 'bg-rose-500 text-white animate-pulse'
                          : msg.data.triageCategory === 'NEEDS DOCTOR'
                          ? 'bg-blue-600 text-white'
                          : msg.data.triageCategory === 'NEEDS PHARMACIST'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {msg.data.triageCategory === 'URGENT MEDICAL ATTENTION' && <ShieldAlert className="w-3 h-3" />}
                        {msg.data.triageCategory === 'NEEDS DOCTOR' && <Stethoscope className="w-3 h-3" />}
                        {msg.data.triageCategory === 'NEEDS PHARMACIST' && <Pill className="w-3 h-3" />}
                        {msg.data.triageCategory === 'LOW CONCERN' && <Info className="w-3 h-3" />}
                        <span>{msg.data.triageCategory}</span>
                      </span>
                    </div>
                  </div>

                  {/* URGENT EMERGENCY BANNER */}
                  {msg.data.triageCategory === 'URGENT MEDICAL ATTENTION' && msg.data.emergencyContacts && (
                    <div className="p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-900 dark:text-rose-200">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-base mb-2">
                        <AlertTriangle className="w-5 h-5 animate-pulse" />
                        <span>URGENT MEDICAL ATTENTION REQUIRED</span>
                      </div>
                      <p className="text-xs font-semibold mb-4 leading-relaxed">
                        The reported symptoms indicate a potential medical emergency. Do not delay evaluation. Contact emergency medical services immediately.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {msg.data.emergencyContacts.contacts.map((c) => (
                          <a
                            key={c.id}
                            href={`tel:${c.number}`}
                            className="p-3 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center justify-between shadow-md hover:bg-rose-500 transition"
                          >
                            <span>{c.number} — Call {c.id}</span>
                            <Phone className="w-4 h-4 fill-white" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUMMARY & WHAT YOU DESCRIBED */}
                  <div>
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>WHAT YOU DESCRIBED</span>
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                      {msg.data.summary}
                    </p>
                  </div>

                  {/* FOLLOW-UP QUESTIONS & QUICK OPTION BUTTONS */}
                  {msg.data.follow_up_questions && msg.data.follow_up_questions.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-emerald-500" />
                        <span>Helpful follow-up questions for better context:</span>
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {msg.data.follow_up_questions.map((q, idx) => (
                          <li key={idx}>• {q}</li>
                        ))}
                      </ul>

                      {/* Interactive Quick Answer Buttons */}
                      {msg.data.quick_options && msg.data.quick_options.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                          <span className="text-[10px] font-bold text-slate-400 block mb-2">Tap a quick answer option:</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {msg.data.quick_options.map((opt, i) => (
                              <button
                                key={i}
                                disabled={isAnalyzing}
                                onClick={() => handleSendMessage(opt)}
                                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-emerald-600 hover:text-white border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-bold text-xs transition active:scale-95 shadow-sm"
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* POSSIBLE GENERAL EXPLANATIONS */}
                  {msg.data.possible_general_causes.length > 0 && (
                    <div>
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span>POSSIBLE GENERAL EXPLANATIONS</span>
                      </h3>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {msg.data.possible_general_causes.map((cause, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* WHAT YOU CAN DO NOW (SELF CARE) */}
                  {msg.data.self_care.length > 0 && (
                    <div>
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        <span>WHAT YOU CAN DO NOW</span>
                      </h3>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {msg.data.self_care.map((care, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                            <span>{care}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* VERIFIED MEDICATION INFORMATION */}
                  {msg.data.relevantMedications && msg.data.relevantMedications.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Pill className="w-4 h-4 text-emerald-500" />
                        <span>VERIFIED MEDICATION INFORMATION</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        These medicines are commonly referenced for pain or symptom management in the verified database. Click to review precautions before taking any medication.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {msg.data.relevantMedications.map((med) => (
                          <div
                            key={med.id}
                            onClick={() => setSelectedMedModal(med)}
                            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition cursor-pointer flex flex-col justify-between gap-2 shadow-sm"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="font-bold text-xs text-slate-900 dark:text-white">
                                  {med.brandNames.join(' / ')}
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                  {med.prescriptionStatus}
                                </span>
                              </div>
                              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                DCI: {med.activeIngredients.FR}
                              </p>
                            </div>
                            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800">
                              <span>Learn about this medicine</span>
                              <ChevronRight className="w-3 h-3 text-emerald-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WHEN TO SEEK PROFESSIONAL HELP */}
                  {msg.data.seek_professional_help && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {msg.data.seek_professional_help.consult_pharmacist.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                            <Pill className="w-3.5 h-3.5" />
                            <span>When to Contact Pharmacist</span>
                          </h4>
                          <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                            {msg.data.seek_professional_help.consult_pharmacist.map((p, idx) => (
                              <li key={idx}>• {p}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {msg.data.seek_professional_help.consult_doctor.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5 flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5" />
                            <span>When to Contact Doctor</span>
                          </h4>
                          <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                            {msg.data.seek_professional_help.consult_doctor.map((d, idx) => (
                              <li key={idx}>• {d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* NEARBY PHARMACY CONNECTION */}
                  <div className="p-4 rounded-2xl bg-emerald-600 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm">Need a pharmacist in {currentCity}?</h4>
                      <p className="text-[11px] opacity-90">Find open and on-duty emergency pharmacies nearby in {currentCity}.</p>
                    </div>
                    <button
                      onClick={() => onGoToPharmacySearch(msg.content)}
                      className="px-4 py-2 rounded-xl bg-white text-emerald-950 font-extrabold text-xs hover:bg-slate-100 transition active:scale-95 shrink-0 flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pharmacies near {currentCity}</span>
                    </button>
                  </div>

                  {/* SOURCES & TRANSPARENCY */}
                  <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>Sources: {msg.data.sources.join(' • ')}</span>
                    <span>Evidence-based clinical protocol</span>
                  </div>

                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isAnalyzing && (
          <div className="flex items-start gap-3 w-full max-w-xl animate-pulse">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-emerald-400 border border-slate-800 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 shadow-sm">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
              <span>PHARMA AI is evaluating symptoms...</span>
            </div>
          </div>
        )}

        {/* Error State Banner */}
        {errorState && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorState}</span>
            </div>
            <button
              onClick={handleRetryLast}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition shrink-0"
            >
              Try again
            </button>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Fixed Input Form */}
      <div className="sticky bottom-4 mt-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputQuery);
          }}
          className="relative flex items-center shadow-xl rounded-2xl"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isAnalyzing}
            dir={isRTL ? 'rtl' : 'ltr'}
            placeholder="Describe your symptoms (e.g., راسي كيضرني, I have a headache, J'ai mal à la tête)..."
            className="w-full pl-5 pr-28 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500 transition shadow-inner disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isAnalyzing || !inputQuery.trim()}
            className="absolute right-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md active:scale-95"
          >
            {isAnalyzing ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <span>Analyze</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 text-center">
          PHARMA AI provides general health information for educational purposes and does not replace a doctor, pharmacist, diagnosis, or emergency medical care.
        </p>
      </div>

      {/* Medication Monograph Modal */}
      {selectedMedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 inline-block">
                  {selectedMedModal.category}
                </span>
                <h2 className="font-extrabold text-xl text-slate-900 dark:text-white">
                  {selectedMedModal.brandNames.join(' / ')}
                </h2>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  DCI: {selectedMedModal.activeIngredients.FR}
                </p>
              </div>
              <button
                onClick={() => setSelectedMedModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">General Uses</h4>
                <p>{selectedMedModal.description.FR}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-300">
                <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-1">Precautions & Warnings</h4>
                <ul className="space-y-1">
                  {selectedMedModal.warnings.FR.map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSelectedMedModal(null)}
              className="mt-4 w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs transition"
            >
              Close Monograph
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
