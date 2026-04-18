/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  Brain, 
  Dna, 
  Layers, 
  MessageSquare, 
  Share2, 
  Users, 
  ChevronRight, 
  Activity, 
  Box, 
  PenTool, 
  Zap,
  CheckCircle2,
  Menu,
  X,
  Search,
  ArrowRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini (AI Studio injects the key)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-medical-accent selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5 border-b border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-medical-accent rounded-sm flex items-center justify-center text-black shadow-lg shadow-cyan-500/20">
              <Brain size={24} />
            </div>
            <span className="text-2xl font-serif italic tracking-tight text-white">Med<span className="font-sans font-bold not-italic text-medical-accent">Mind</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[2px] font-medium text-medical-text-dim">
            <a href="#features" className="hover:text-medical-accent transition-colors">Platform</a>
            <a href="#use-cases" className="hover:text-medical-accent transition-colors">Clinical Use</a>
            <a href="#ai-consultant" className="hover:text-medical-accent transition-colors">Collaboration</a>
            <button className="bg-medical-accent text-black px-6 py-2.5 rounded-sm hover:bg-cyan-400 transition-all font-bold shadow-md active:scale-95">
              Request Demo
            </button>
          </div>

          <button className="md:hidden text-medical-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} /> }
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-medium">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#use-cases" onClick={() => setMobileMenuOpen(false)}>Use Cases</a>
              <a href="#ai-consultant" onClick={() => setMobileMenuOpen(false)}>AI Assistant</a>
              <button className="w-full bg-medical-blue text-white py-4 rounded-2xl">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 medical-grid overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-medical-accent/10 text-medical-accent text-[11px] font-bold uppercase tracking-[3px] mb-6">
                  <Activity size={14} />
                  Surgical Intelligence Platform
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-light leading-[1.1] mb-8 text-white">
                  Precision Anatomy <br /><span className="text-medical-accent italic">Beyond the Slice.</span>
                </h1>
                <p className="text-lg text-medical-text-dim mb-10 leading-relaxed max-w-xl">
                  MedMind bridges the gap between 2D diagnostic imaging and 3D spatial reality. 
                  By converting standard medical scans into interactive anatomical models, we provide surgical teams and educators with the depth needed for flawless planning.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-medical-accent text-black rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 active:scale-95">
                    Experience 3D Model <ChevronRight size={18} />
                  </button>
                  <button className="px-8 py-4 bg-transparent text-white border border-medical-border rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all active:scale-95">
                    Technical Specs
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="aspect-square visual-section-gradient rounded-lg border border-medical-border overflow-hidden relative group">
                  {/* Mock 3D Anatomy Simulation */}
                  <div className="absolute inset-0 flex items-center justify-center scale-110">
                    <AnatomySimulation />
                  </div>

                  {/* UI Overlays */}
                  <div className="absolute top-6 right-6">
                    <div className="glass-panel p-4 rounded-sm border-medical-accent/50 text-[10px] font-mono whitespace-nowrap text-medical-accent">
                      RENDER_ID: MM_V8.4<br />
                      VOXEL_DENSITY: 0.02mm<br />
                      STATUS: INTERACTIVE_READY
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 p-4 bg-black/80 text-medical-accent rounded-sm border border-medical-border flex flex-col gap-1 backdrop-blur-md">
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Spatial Resolution</span>
                    <span className="text-lg font-mono">0.24mm ISO</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features" className="py-24 bg-medical-bg relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-medical-accent text-[11px] font-bold uppercase tracking-[3px] mb-4 block">Capabilities</span>
              <h2 className="text-4xl font-serif font-light mb-6 tracking-tight text-white">Precision tools for high-stakes outcomes.</h2>
              <p className="text-lg text-medical-text-dim">Every feature is engineered to enhance the fidelity of medical understanding and clinical communication.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureItem 
                icon={<Layers className="text-medical-accent" size={28} />}
                title="AI Synthesis"
                benefit="Advanced volumetric rendering algorithms automate the synthesis of complex radiological data. This eliminates hours of manual reconstruction, providing a definitive spatial perspective that 2D slices simply cannot convey."
              />
              <FeatureItem 
                icon={<PenTool className="text-medical-accent" size={28} />}
                title="Dynamic Annotation"
                benefit="Facilitate nuanced dialogues with digital marking tools. Whether it's pre-operative territory mapping or identifying rare variations, MedMind enables precise, persistent annotations on the 3D geometry."
              />
              <FeatureItem 
                icon={<Share2 className="text-medical-accent" size={28} />}
                title="Cloud Collaboration"
                benefit="Synchronous surgical planning redefined. Share live 3D sessions across institutions to enable interdisciplinary teamwork, allowing global experts to deliberate on a single high-fidelity model simultaneously."
              />
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-24 bg-medical-surface relative border-y border-medical-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <span className="text-medical-accent font-bold tracking-[3px] uppercase text-[11px]">Applications</span>
                <h2 className="text-4xl font-serif font-light text-white mt-2">Critical Impact Scenarios.</h2>
              </div>
              <p className="text-medical-text-dim max-w-sm">
                From the lecture hall to the operating theater, MedMind is the standard for anatomical clarity.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <UseCaseCard 
                title="Surgical Planning"
                scenario="Collaborative planning for a complex pediatric neurosurgery. The team interacts with the 3D model to simulate approach angles, identifying micro-vascular risks before the first incision is ever made."
                tag="Tactical Planning"
              />
              <UseCaseCard 
                title="Education"
                scenario="A professor leverages annotated models to teach medical students about rare anatomical variations. Students explore the geometry from any angle, grounding theoretical knowledge in tangible spatial reality."
                tag="Academic Faculty"
              />
              <UseCaseCard 
                title="Resident Study"
                scenario="A resident uses MedMind for deep-dive self-study. By dissecting virtual layers of a specific clinical case, they build the procedural confidence required for upcoming rotations and board exams."
                tag="Advanced Self-Study"
              />
            </div>
          </div>
        </section>

        {/* AI Consultant Section */}
        <section id="ai-consultant" className="py-24 bg-medical-bg text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-accent/5 rounded-full blur-[100px] -mr-10 -mt-10" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-medical-accent font-bold tracking-[3px] uppercase text-[11px] mb-4 block">Intelligent Engine</span>
                <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 leading-tight">
                  Enhanced Analysis <br /><span className="text-medical-accent italic">via Neural Insights.</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center">
                      <Zap className="text-medical-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-1 text-white">Instant Insights</h4>
                      <p className="text-medical-text-dim text-sm leading-relaxed">Gemini identifies key anatomical landmarks or suggests relevant medical literature based on the 3D structure.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center">
                      <Search className="text-medical-accent" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-1 text-white">Research Grounded</h4>
                      <p className="text-medical-text-dim text-sm leading-relaxed">Direct connection to medical journals ensuring your analysis is grounded in the latest evidence-based research.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-2 rounded-lg border-white/5">
                <AIConsultantChat />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-medical-bg text-center border-t border-medical-border">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 tracking-tight text-white">Elevate clinical standards.</h2>
            <p className="text-xl text-medical-text-dim mb-12">Join institutions integrating MedMind for precision, collaboration, and education.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-medical-accent text-black rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/10 active:scale-95">
                Experience 3D Viewer
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border border-medical-border rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all active:scale-95">
                Request Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-medical-bg py-20 border-t border-medical-border">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-medical-accent rounded-sm flex items-center justify-center text-black">
                <Brain size={18} />
              </div>
              <span className="text-xl font-serif italic tracking-tight text-white">Med<span className="font-sans font-bold not-italic text-medical-accent">Mind</span></span>
            </div>
            <p className="text-medical-text-dim max-w-sm mb-8 leading-relaxed">
              Leading the digital transformation of anatomy for the modern clinician. Precision beyond the slice.
            </p>
          </div>
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[2px] mb-8 text-white">Platform</h5>
            <ul className="space-y-5 text-sm text-medical-text-dim">
              <li><a href="#" className="hover:text-medical-accent transition-colors">Digital Viewer</a></li>
              <li><a href="#" className="hover:text-medical-accent transition-colors">Collaboration Hub</a></li>
              <li><a href="#" className="hover:text-medical-accent transition-colors">Annotation API</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-[2px] mb-8 text-white">Organization</h5>
            <ul className="space-y-5 text-sm text-medical-text-dim">
              <li><a href="#" className="hover:text-medical-accent transition-colors">Research Results</a></li>
              <li><a href="#" className="hover:text-medical-accent transition-colors">Data Security</a></li>
              <li><a href="#" className="hover:text-medical-accent transition-colors">Institutional Access</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between text-[11px] text-medical-text-dim uppercase tracking-widest gap-4">
          <p>© 2026 MedMind Technologies Inc. Clinical validation required.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AnatomySimulation() {
  return (
    <div className="w-full h-full p-12 flex items-center justify-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Layered Neural Simulation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-[1px] border-medical-accent/20 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[15%] border-[1px] border-medical-accent/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[30%] border-[1px] border-medical-accent/30 rounded-full"
        />
        
        {/* Brain Silhouette Representation */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotateY: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-48 h-48 text-medical-accent/30 flex items-center justify-center">
            <Brain size={160} strokeWidth={0.5} className="filter drop-shadow-[0_0_20px_rgba(0,209,255,0.4)]" />
            
            {/* Pulsing Dots/Synapses */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-medical-accent rounded-full animate-ping" />
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-ping [animation-delay:1s]" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping [animation-delay:2s]" />
          </div>
        </motion.div>

        {/* Annotation Markers */}
        <div className="absolute top-1/4 left-0">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 p-2 bg-black/80 rounded-sm shadow-sm text-[10px] font-bold border border-medical-accent/40 text-medical-accent"
          >
            <PenTool size={12} className="text-medical-accent" />
            PATHWAY_SIG_A7
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, benefit }: { icon: ReactNode, title: string, benefit: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-sm bg-medical-surface border border-medical-border hover:border-medical-accent transition-all hover:bg-medical-accent/5"
    >
      <div className="mb-6 text-medical-accent">{icon}</div>
      <h3 className="text-sm uppercase tracking-widest font-bold mb-4 text-medical-accent">{title}</h3>
      <p className="text-medical-text-dim leading-relaxed text-sm">{benefit}</p>
    </motion.div>
  );
}

interface UseCaseProps {
  title: string;
  scenario: string;
  tag: string;
}

function UseCaseCard({ title, scenario, tag }: UseCaseProps) {
  return (
    <div className="p-8 bg-medical-bg rounded-sm border border-medical-border hover:border-medical-accent transition-all group flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-medical-accent/10 border border-medical-accent flex items-center justify-center font-bold text-medical-accent rounded-sm">
        <Dna size={18} />
      </div>
      <div>
        <div className="text-medical-accent text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">
          {tag}
        </div>
        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-medical-accent transition-colors">{title}</h3>
        <p className="text-medical-text-dim leading-relaxed text-[12px]">{scenario}</p>
      </div>
    </div>
  );
}

function AIConsultantChat() {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Neural simulation ready. Diagnostics on scan MRI_092 active. How can I facilitate your surgical analysis?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({ 
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: "You are MedMind AI, a high-fidelity surgical intelligence consultant. Your tone is clinical, precise, and detached but helpful. You provide specific anatomical insights based on 3D geometry data. Always remind users this is a supportive analytical tool and the primary surgeon maintains final clinical authority. You search medical repositories to ensure state-of-the-art accuracy.",
          tools: [{ googleSearch: {} }]
        }
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "Diagnostic failed. Please retry." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "System interrupt. Diagnostic link severed." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-medical-bg rounded-sm border border-white/5 overflow-hidden flex flex-col h-[500px]">
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-medical-accent flex items-center justify-center">
            <Zap size={14} className="text-black" />
          </div>
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest">Neural Link v4.2</h5>
            <span className="text-[10px] text-medical-accent flex items-center gap-1 uppercase tracking-tighter">
              <div className="w-1 h-1 rounded-full bg-medical-accent" /> Synchronized
            </span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-sm text-xs ${
              m.role === 'user' 
                ? 'bg-medical-accent text-black font-bold border border-medical-accent' 
                : 'bg-white/5 text-medical-text-main border border-white/10'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-sm flex gap-1 border border-white/10">
              <div className="w-1.5 h-1.5 bg-medical-accent rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-medical-accent rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-medical-accent rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-black/80 border-t border-white/10">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query anatomical data_092..."
            className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-medical-accent transition-colors font-mono"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="p-3 bg-medical-accent text-black rounded-sm hover:bg-cyan-400 transition-all disabled:opacity-50"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
