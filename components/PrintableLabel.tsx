
import React from 'react';
import { BagType, LabelData, LabelMode } from '../types';

interface PrintableLabelProps {
  data: LabelData;
}

const PrintableLabel: React.FC<PrintableLabelProps> = ({ data }) => {
  // ===== FLAGS DE CONTEXTO =====
  // Variáveis booleanas para determinar o layout e estilo da etiqueta
  const isCold = data.type === BagType.GELADA;      // É um volume gelado?
  const isIFood = data.mode === LabelMode.IFOOD;    // É uma etiqueta de iFood?
  const isPlaca = data.mode === LabelMode.PLACA;    // É uma placa de aviso?

// ===== DIMENSÕES =====
  /**
   * Dimensões de Segurança (Safe Zones):
   * 
   * PLACAS (A4 Landscape):
   *   - Impressão: 270mm x 185mm
   *   - Preview: Largura total + altura proporção
   *   - Margem de segurança: 10mm de borda
   * 
   * ETIQUETAS (Postek 100x50mm):
   *   - Impressão: 100mm x 50mm (térmica contínua)
   *   - Preview: 400px x 200px (2:1 escalado para visualização)
   *   - Sem margem em impressão (rolo contínuo)
   */
  const containerClasses = isPlaca 
    ? "print:w-[270mm] print:h-[185mm] print:border-[10px] print:m-0 min-h-[500px] w-full border-[8px]"
    : "print:w-[100mm] print:h-[50mm] print:m-0 print:border-0 w-[400px] h-[200px] border-[2px]";

  return (
    <div className={`label-card relative ${containerClasses} border-black print:p-1 p-4 md:p-8 rounded-none flex flex-col justify-between bg-white mb-4 print:mb-0 overflow-hidden select-none box-border mx-auto`}>
      
      {/* ===== MARCA D'ÁGUA ===== */}
      {/* Texto de fundo da marca (sem interação, muito transparente) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0 overflow-hidden">
        <span className={`text-black font-black whitespace-nowrap -rotate-[25deg] uppercase tracking-[0.2em] leading-none ${isPlaca ? 'text-[140px]' : 'text-9xl'}`}>
          SEMAR ENTREGA
        </span>
      </div>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {isPlaca ? (
          /* ========== MODO PLACA ========== 
             Layout: Cabeçalho (título grande) | Meio (nome) | Rodapé (branding)
             Proporção: A4 Landscape (270mm x 185mm)
          */
          <div className="flex flex-col h-full items-center justify-between">
            <header className="w-full border-b-[6px] border-black pb-4 text-center">
              <span className="text-4xl md:text-6xl print:text-[60px] font-black text-black uppercase tracking-tight leading-none">
                {data.title}
              </span>
            </header>
            
            <main className="flex-grow flex items-center justify-center w-full px-6 text-center my-2 overflow-hidden">
              <span className={`font-black text-black uppercase break-words leading-[1.0] max-w-full ${
                (data.clientName?.length || 0) > 20 
                  ? 'text-4xl md:text-6xl print:text-[70px]' 
                  : 'text-5xl md:text-8xl print:text-[100px]'
              }`}>
                {data.clientName || '---'}
              </span>
            </main>

            <footer className="w-full border-t-[6px] border-black pt-4 text-center">
              <span className="text-2xl md:text-4xl print:text-[40px] font-bold text-black uppercase tracking-[0.4em]">
                SEMAR ENTREGA
              </span>
            </footer>
          </div>
        ) : (
          /* ========== MODO ETIQUETA (iFood e Compra) ========== 
             Proporção: 100mm x 50mm (formato Postek)
             Layout: Cabeçalho | Meio | Rodapé
          */
          <>
            {/* --- CABEÇALHO --- */}
            {/* Exibe tipo de pedido/compra, número e tipo de volume */}
            <header className="flex justify-between items-start border-b-4 border-black pb-2">
              <div className="flex flex-col flex-1 overflow-hidden">
                  <span className={`${isIFood ? 'text-sm print:text-[10px]' : 'text-sm print:text-[10px]'} font-bold text-black uppercase tracking-tighter`}>
                    {isIFood ? 'PEDIDO IFOOD' : `COMPRA: #${data.title}`}
                  </span>
                  <span className={`${isIFood ? 'text-2xl print:text-[28px]' : 'text-xl print:text-[20px]'} font-black text-black leading-tight mt-1 tracking-tighter uppercase truncate`}>
                    {isIFood ? `#${data.title}` : (data.clientName || 'AVULSO')}
                  </span>
              </div>
              
              {/* Badge: indica se é SECA ou GELADA */}
              <div className={`ml-4 px-3 py-2 border-4 border-black shrink-0 ${isCold ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <span className="font-black text-lg print:text-[18px] uppercase italic tracking-widest">
                  {data.type}
                </span>
              </div>
            </header>

            {/* --- CONTEÚDO CENTRAL --- */}
            {/* Informações de volume (sequência), total de volumes e resumo (secos/gelados) */}
              <main className="flex-col items-center justify-center flex-grow py-2 text-center flex">
                <div className="text-sm print:text-[10px] font-bold text-black uppercase tracking-[0.2em] mb-1">
                  VOLUME {data.currentVolume} DE {data.totalVolumes}
                </div>
              
                <div className="border-[3px] border-black px-4 py-2 bg-white/70 flex flex-col items-center w-full max-w-full">
                  <div className="text-2xl print:text-[22px] font-black text-black leading-none uppercase mb-1">
                    {data.totalVolumes} VOLUMES
                  </div>
                  <div className="text-sm print:text-[12px] font-bold text-black uppercase tracking-tight">
                    {data.dryTotal} SECOS • {data.coldTotal} GELADOS
                  </div>
                </div>
              </main>

            {/* --- RODAPÉ --- */}
            {/* Informações complementares e copyright */}
            <footer className="flex flex-col">
              <div className="border-t-4 border-black pt-2 flex justify-between items-center font-bold uppercase italic text-xs print:text-[10px]">
                 <span>{isIFood ? 'RESPONSÁVEL: __________' : 'DATA: __/__/__'}</span>
                 <span className="tracking-widest font-black text-[10px]">
                   {isIFood ? 'IFOOD' : ''}
                 </span>
              </div>
              <div className="flex justify-end pt-1">
                 <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">
                   © Todos os direitos reservados a JM
                 </span>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default PrintableLabel;
