import React, { useState } from 'react';
import {
  Copy,
  Check,
  Radio,
  Gauge,
  KeyRound,
  Heart,
  Layers,
  Mic,
  Sliders,
  Sparkles,
  Cpu,
  Bookmark,
  FileText,
  LayoutGrid,
} from 'lucide-react';
import { MusicalStyle } from '../types';
import {
  formatStyleText,
  formatTagsText,
  formatParametersText,
  formatDescriptionText,
  MAX_STYLE_LENGTH,
} from '../utils/styleFormatter';

interface StyleCardProps {
  styleData: MusicalStyle | string;
}

export const StyleCard: React.FC<StyleCardProps> = ({ styleData }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedParams, setCopiedParams] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [activeTab, setActiveTab] = useState<'unified' | 'detailed'>('unified');

  // Normalize data whether it's an object or a string
  const isObject = typeof styleData === 'object' && styleData !== null;
  const description = isObject ? styleData.descricao : styleData;
  const tags = isObject && Array.isArray(styleData.tags) ? styleData.tags : [];
  const musicalStyle = isObject ? (styleData as MusicalStyle) : null;

  // Texto completo unificado (ETIQUETAS + PARÂMETROS + DESCRIÇÃO) limitado a <= 950 carateres
  const styleText = formatStyleText(styleData);
  const charCount = styleText.length;
  const isOverLimit = charCount > MAX_STYLE_LENGTH;

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(styleText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar estilo:', err);
    }
  };

  const handleCopyTags = async () => {
    try {
      const text = formatTagsText(styleData);
      if (text) {
        await navigator.clipboard.writeText(text);
        setCopiedTags(true);
        setTimeout(() => setCopiedTags(false), 2000);
      }
    } catch (err) {
      console.error('Falha ao copiar etiquetas:', err);
    }
  };

  const handleCopyParams = async () => {
    try {
      const text = formatParametersText(styleData);
      if (text) {
        await navigator.clipboard.writeText(text);
        setCopiedParams(true);
        setTimeout(() => setCopiedParams(false), 2000);
      }
    } catch (err) {
      console.error('Falha ao copiar parâmetros:', err);
    }
  };

  const handleCopyDesc = async () => {
    try {
      const text = formatDescriptionText(styleData);
      if (text) {
        await navigator.clipboard.writeText(text);
        setCopiedDesc(true);
        setTimeout(() => setCopiedDesc(false), 2000);
      }
    } catch (err) {
      console.error('Falha ao copiar descrição:', err);
    }
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 hover:border-purple-500/30 rounded-2xl p-5 sm:p-6 shadow-xl shadow-purple-950/10 flex flex-col h-full transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Radio className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-zinc-100 text-base sm:text-lg">
              Estilo musical
            </h3>
            <p className="text-xs text-zinc-400 truncate">
              Etiquetas, parâmetros e descrição (máx. 950 carateres)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Contador de carateres */}
          <span
            className={`text-xs font-mono font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
              isOverLimit
                ? 'text-red-400 bg-red-950/70 border-red-500/70 font-bold animate-pulse'
                : 'text-zinc-300 bg-zinc-950/60 border-zinc-800'
            }`}
            title={`Limite: ${charCount} / ${MAX_STYLE_LENGTH} carateres`}
          >
            {charCount} / {MAX_STYLE_LENGTH}
          </span>

          {/* Botão de cópia rápida de tudo junto */}
          <button
            onClick={handleCopyAll}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              copiedAll
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-purple-600 hover:bg-purple-500 text-white border border-purple-500/40 shadow-sm shadow-purple-950/30'
            }`}
            aria-label="Copiar tudo junto"
            title="Copiar etiquetas, parâmetros e descrição tudo junto pronto para colar"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar tudo junto</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Seletor de Modo de Visualização */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800/60">
        <div className="flex items-center p-0.5 bg-zinc-950/70 border border-zinc-800/80 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('unified')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'unified'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tudo junto (Pronto para copiar)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('detailed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeTab === 'detailed'
                ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Vista detalhada</span>
          </button>
        </div>

        <span className="text-[11px] text-zinc-500 hidden sm:inline">
          Formato otimizado para Suno / Udio
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto max-h-[520px] pr-1 custom-scroll">
        {activeTab === 'unified' ? (
          /* MODO UNIFICADO: ETIQUETAS, PARÂMETROS E DESCRIÇÃO TUDO JUNTO */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
              <span className="font-medium text-purple-300">
                Bloco completo pronto a copiar
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                {charCount} / {MAX_STYLE_LENGTH} carateres
              </span>
            </div>

            <div className="relative group">
              <pre className="text-xs sm:text-sm text-zinc-200 font-mono leading-relaxed bg-zinc-950/80 p-4 sm:p-5 rounded-xl border border-zinc-800/90 whitespace-pre-wrap select-all overflow-x-auto shadow-inner">
                {styleText}
              </pre>

              <button
                type="button"
                onClick={handleCopyAll}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/80 shadow-md transition-all cursor-pointer"
                title="Copiar este bloco"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-purple-300" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-300/90 flex items-center justify-between gap-3">
              <span>
                Reúne as etiquetas de som, parâmetros de fidelidade e descrição fiel num bloco único pronto para colar.
              </span>
              <button
                type="button"
                onClick={handleCopyAll}
                className="shrink-0 px-2.5 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 font-medium transition-colors cursor-pointer"
              >
                {copiedAll ? 'Copiado!' : 'Copiar agora'}
              </button>
            </div>
          </div>
        ) : (
          /* MODO DETALHADO POR SECÇÕES: 1º ETIQUETAS, 2º PARÂMETROS, 3º DESCRIÇÃO */
          <div className="space-y-5">
            {/* 1. ETIQUETAS DE RECRIAÇÃO DE SOM */}
            {tags.length > 0 && (
              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
                <div className="flex items-center justify-between mb-2.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400/90">
                    Etiquetas de recriação de som
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopyTags}
                    className="text-[11px] text-zinc-400 hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedTags ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiadas</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar só etiquetas</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-purple-200 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 px-2.5 py-1 rounded-lg transition-colors font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 2. PARÂMETROS DE FIDELIDADE ACÚSTICA */}
            {musicalStyle && (
              <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400/90">
                    Parâmetros de fidelidade acústica
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopyParams}
                    className="text-[11px] text-zinc-400 hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedParams ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiados</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar só parâmetros</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-2">
                    <Gauge className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400 block text-[11px]">Duração Alvo</span>
                      <span className="font-semibold text-zinc-100">mínimo 5:00</span>
                    </div>
                  </div>

                  {musicalStyle.bpm && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-2">
                      <Gauge className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">BPM / Tempo</span>
                        <span className="font-semibold text-zinc-100">{musicalStyle.bpm}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.tom && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-2">
                      <KeyRound className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Tom & Escala</span>
                        <span className="font-semibold text-zinc-100">{musicalStyle.tom}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.genero && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-2">
                      <Layers className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Género</span>
                        <span className="font-semibold text-zinc-100">{musicalStyle.genero}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.emocao && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-2">
                      <Heart className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Emoção & Vibração</span>
                        <span className="font-semibold text-zinc-100">{musicalStyle.emocao}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.compasso && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-2">
                      <Gauge className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Compasso</span>
                        <span className="font-semibold text-zinc-100">{musicalStyle.compasso}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.tipoVoz && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 col-span-2 flex items-start gap-2">
                      <Mic className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Tipo de voz & Colocação</span>
                        <span className="font-medium text-zinc-200">{musicalStyle.tipoVoz}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.atmosfera && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 col-span-2 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Atmosfera & Espacialidade</span>
                        <span className="font-medium text-zinc-200">{musicalStyle.atmosfera}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.producao && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 col-span-2 flex items-start gap-2">
                      <Cpu className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Produção, Mistura & Efeitos</span>
                        <span className="font-medium text-zinc-200">{musicalStyle.producao}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.instrumentos && musicalStyle.instrumentos.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 col-span-2 flex items-start gap-2">
                      <Sliders className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Instrumentação identificada</span>
                        <span className="font-medium text-zinc-200">
                          {musicalStyle.instrumentos.join(' · ')}
                        </span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.swingGroove && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Swing / Groove</span>
                        <span className="font-semibold text-zinc-100">{musicalStyle.swingGroove}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.padraoBateria && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 col-span-2 flex items-start gap-2">
                      <Sliders className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Padrão de Bateria</span>
                        <span className="font-medium text-zinc-200">{musicalStyle.padraoBateria}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.linhaBaixo && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 col-span-2 flex items-start gap-2">
                      <Sliders className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Linha de Baixo / Sub</span>
                        <span className="font-medium text-zinc-200">{musicalStyle.linhaBaixo}</span>
                      </div>
                    </div>
                  )}

                  {musicalStyle.estruturaBatida && (
                    <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 col-span-2 flex items-start gap-2">
                      <Bookmark className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-zinc-400 block text-[11px]">Estrutura da Batida</span>
                        <span className="font-medium text-zinc-200">{musicalStyle.estruturaBatida}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. DESCRIÇÃO FIEL DO SOM ORIGINAL */}
            <div className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400/90">
                  Descrição fiel do som original
                </h4>
                <button
                  type="button"
                  onClick={handleCopyDesc}
                  className="text-[11px] text-zinc-400 hover:text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedDesc ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar só descrição</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal bg-zinc-900/70 p-4 rounded-xl border border-zinc-800/80">
                {description || 'N/A'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
