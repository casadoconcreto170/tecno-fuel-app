import React, { useState, useEffect } from 'react';
import { 
  Fuel, 
  History, 
  Package, 
  Users, 
  LogOut, 
  Plus, 
  Minus, 
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  LayoutDashboard,
  Settings
} from 'lucide-react';

// --- CONFIGURAÇÃO ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEinurvieXbEB45oiW0eQd5p_QEiasoLeR9uC8b1wjCSh0kJULtbM3EmwzUfA_DT42Kg/exec";

export default function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [inventory, setInventory] = useState({
    Distrito: { diesel: 0, arla: 0 },
    Cabedelo: { diesel: 0, arla: 0 }
  });

  // --- FUNÇÕES DE SINCRONIZAÇÃO ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sheet-data');
      const data = await res.json();
      if (data.inventory) setInventory(data.inventory);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  // --- TELA DE LOGIN ---
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-emerald-100 p-4 rounded-2xl mb-4">
              <Fuel className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Tecno Concreto</h1>
            <p className="text-gray-500 text-sm">Controle de Combustível</p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            setUser({ name: 'Gestor', role: 'gestor' });
            setView('dashboard');
          }}>
            <input 
              type="text" 
              placeholder="Usuário" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 transition-all"
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 transition-all"
            />
            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
              Entrar no Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD PRINCIPAL ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-6 rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-emerald-100 text-sm">Bem-vindo,</p>
            <h2 className="text-xl font-bold">Gestor Tecno</h2>
          </div>
          <button onClick={() => setView('login')} className="bg-white/20 p-2 rounded-full">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Cards de Estoque Rápido */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs uppercase tracking-wider opacity-80">Diesel (Distrito)</p>
            <p className="text-2xl font-bold">{inventory.Distrito.diesel}L</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs uppercase tracking-wider opacity-80">Diesel (Cabedelo)</p>
            <p className="text-2xl font-bold">{inventory.Cabedelo.diesel}L</p>
          </div>
        </div>
      </div>

      {/* Menu de Ações */}
      <div className="p-6 grid grid-cols-1 gap-4">
        <button className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm border border-gray-100 group active:scale-95 transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
              <Plus className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">Novo Abastecimento</h3>
              <p className="text-xs text-gray-500">Registrar saída de combustível</p>
            </div>
          </div>
          <ChevronRight className="text-gray-300" />
        </button>

        <button className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm border border-gray-100 active:scale-95 transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
              <Package className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">Entrada de Estoque</h3>
              <p className="text-xs text-gray-500">Registrar chegada de caminhão</p>
            </div>
          </div>
          <ChevronRight className="text-gray-300" />
        </button>

        <button onClick={fetchData} className="flex items-center justify-center gap-2 p-4 text-emerald-600 font-medium">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Sincronizando...' : 'Sincronizar com Planilha'}
        </button>
      </div>

      {/* Navegação Inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex justify-around items-center">
        <button className="text-emerald-600 flex flex-col items-center gap-1">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Início</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center gap-1">
          <History className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Histórico</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center gap-1">
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Equipe</span>
        </button>
      </div>
    </div>
  );
}