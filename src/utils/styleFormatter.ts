import { MusicalStyle } from '../types';

export const MAX_LYRICS_LENGTH = 4500;
export const MAX_STYLE_LENGTH = 950;

/**
 * Retorna as etiquetas formatadas como texto simples
 */
export function formatTagsText(style: MusicalStyle | string): string {
  if (!style) return '';
  if (typeof style === 'string') return '';
  if (Array.isArray(style.tags) && style.tags.length > 0) {
    return style.tags.join(', ');
  }
  return '';
}

/**
 * Retorna os parâmetros de fidelidade acústica formatados como texto simples
 */
export function formatParametersText(style: MusicalStyle | string): string {
  if (!style || typeof style === 'string') return '';
  const details: string[] = [];
  details.push(`duração alvo: mínimo 5:00`);
  if (style.bpm) details.push(`BPM: ${style.bpm}`);
  if (style.compasso) details.push(`Compasso: ${style.compasso}`);
  if (style.tom) details.push(`Tom: ${style.tom}`);
  if (style.genero) details.push(`Género: ${style.genero}`);
  if (style.swingGroove) details.push(`Groove: ${style.swingGroove}`);
  if (style.padraoBateria) details.push(`Bateria: ${style.padraoBateria}`);
  if (style.linhaBaixo) details.push(`Baixo: ${style.linhaBaixo}`);
  if (style.emocao) details.push(`Emoção: ${style.emocao}`);
  if (style.tipoVoz) details.push(`Voz: ${style.tipoVoz}`);
  if (style.atmosfera) details.push(`Atmosfera: ${style.atmosfera}`);
  if (style.producao) details.push(`Produção: ${style.producao}`);
  if (style.estruturaBatida) details.push(`Estrutura: ${style.estruturaBatida}`);
  if (style.instrumentos && Array.isArray(style.instrumentos) && style.instrumentos.length > 0) {
    details.push(`Instrumentos: ${style.instrumentos.join(', ')}`);
  }
  return details.join(' · ');
}

/**
 * Retorna a descrição fiel do som original
 */
export function formatDescriptionText(style: MusicalStyle | string): string {
  if (!style) return '';
  if (typeof style === 'string') return style.trim();
  return (style.descricao || '').trim();
}

/**
 * Retorna a representação de texto unificada do estilo musical com:
 * 1. ETIQUETAS DE RECRIAÇÃO DE SOM
 * 2. PARÂMETROS DE FIDELIDADE ACÚSTICA
 * 3. DESCRIÇÃO FIEL DO SOM ORIGINAL
 *
 * Tudo junto pronto para copiar e com garantia estrita de não ultrapassar 950 caracteres.
 */
export function formatStyleText(style: MusicalStyle | string): string {
  if (!style) return '';
  if (typeof style === 'string') {
    return style.trim().slice(0, MAX_STYLE_LENGTH);
  }

  // 1. ETIQUETAS DE RECRIAÇÃO DE SOM
  const tagsStr = formatTagsText(style);
  const section1 = `ETIQUETAS DE RECRIAÇÃO DE SOM\n${tagsStr || 'N/A'}`;

  // 2. PARÂMETROS DE FIDELIDADE ACÚSTICA
  const paramsStr = formatParametersText(style);
  const section2 = `PARÂMETROS DE FIDELIDADE ACÚSTICA\n${paramsStr || 'N/A'}`;

  // 3. DESCRIÇÃO FIEL DO SOM ORIGINAL
  const descStr = formatDescriptionText(style);
  const section3Header = `DESCRIÇÃO FIEL DO SOM ORIGINAL`;

  // Montar o bloco completo unificado
  let fullText = `${section1}\n\n${section2}\n\n${section3Header}\n${descStr || 'N/A'}`.trim();

  // Limite estrito de 950 caracteres:
  if (fullText.length > MAX_STYLE_LENGTH) {
    const prefix = `${section1}\n\n${section2}\n\n${section3Header}\n`;
    const availableForDesc = MAX_STYLE_LENGTH - prefix.length - 3; // 3 para '...'

    if (availableForDesc > 40) {
      const trimmedDesc = descStr.slice(0, availableForDesc).trim() + '...';
      fullText = `${prefix}${trimmedDesc}`.trim();
    } else {
      fullText = fullText.slice(0, MAX_STYLE_LENGTH).trim();
    }
  }

  return fullText;
}
