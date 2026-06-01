import { CHARACTERS, EXPRESSION_LABELS } from '../data/characters';
import type { CharacterId, ExpressionId } from '../engine/types';

interface SpriteFallbackProps {
  characterId: CharacterId;
  expression: ExpressionId;
}

/** Improved SVG silhouette when image asset fails to load */
export function SpriteFallback({ characterId, expression }: SpriteFallbackProps) {
  const char = CHARACTERS[characterId];
  const exprLabel = EXPRESSION_LABELS[expression];

  return (
    <div className="sprite-fallback-wrap">
      {exprLabel && <span className="sprite-expression">{exprLabel}</span>}
      <svg viewBox="0 0 200 300" className="sprite-svg" aria-hidden>
        <ellipse cx="100" cy="290" rx="50" ry="8" fill="rgba(0,0,0,0.2)" />
        <path
          d="M70 130 L130 130 L128 280 L72 280 Z"
          fill={char.accentColor}
          opacity="0.85"
        />
        <ellipse cx="100" cy="105" rx="35" ry="40" fill={char.color} opacity="0.9" />
        <ellipse cx="100" cy="55" rx="40" ry="45" fill={char.accentColor} />
      </svg>
    </div>
  );
}
