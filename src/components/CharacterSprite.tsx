import { CHARACTERS, EXPRESSION_LABELS } from '../data/characters';
import type { CharacterId, ExpressionId } from '../engine/types';

interface CharacterSpriteProps {
  characterId: CharacterId;
  expression: ExpressionId;
  position: 'left' | 'center' | 'right';
  visible: boolean;
}

function HairShape({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'long_side':
      return (
        <>
          <ellipse cx="100" cy="55" rx="45" ry="50" fill={color} />
          <path d="M55 60 Q40 120 50 180 L70 170 Q60 120 65 70 Z" fill={color} />
          <path d="M145 60 Q160 120 150 180 L130 170 Q140 120 135 70 Z" fill={color} />
        </>
      );
    case 'ponytail':
      return (
        <>
          <ellipse cx="100" cy="55" rx="42" ry="48" fill={color} />
          <ellipse cx="130" cy="80" rx="12" ry="35" fill={color} transform="rotate(20 130 80)" />
        </>
      );
    case 'hood':
      return (
        <>
          <path d="M50 80 Q100 10 150 80 L155 100 Q100 40 45 100 Z" fill={color} opacity="0.9" />
          <ellipse cx="100" cy="60" rx="40" ry="45" fill={color} />
          <path d="M60 55 Q55 30 70 25" stroke={color} strokeWidth="3" fill="none" />
        </>
      );
    case 'messy':
      return (
        <>
          <ellipse cx="100" cy="55" rx="44" ry="50" fill={color} />
          <path d="M60 40 Q50 20 70 30 M80 35 Q75 15 90 25 M110 30 Q115 10 125 25" stroke={color} strokeWidth="4" fill="none" />
        </>
      );
    case 'bob':
      return <ellipse cx="100" cy="58" rx="40" ry="46" fill={color} />;
    default:
      return <ellipse cx="100" cy="55" rx="40" ry="45" fill={color} />;
  }
}

function OutfitShape({ outfit, color, accent }: { outfit: string; color: string; accent: string }) {
  switch (outfit) {
    case 'apron':
      return (
        <>
          <path d="M70 130 L130 130 L125 280 L75 280 Z" fill={accent} opacity="0.7" />
          <rect x="85" y="130" width="30" height="80" fill="#f0e8d8" opacity="0.5" rx="2" />
        </>
      );
    case 'hoodie':
      return (
        <path d="M65 130 Q100 120 135 130 L140 280 L60 280 Z" fill={accent} opacity="0.8" />
      );
    case 'sport':
      return (
        <path d="M68 130 L132 130 L135 280 L65 280 Z" fill={accent} opacity="0.7" />
      );
    case 'casual':
      return (
        <path d="M72 130 L128 130 L130 280 L70 280 Z" fill={accent} opacity="0.6" />
      );
    default:
      return (
        <>
          <path d="M70 130 L130 130 L128 280 L72 280 Z" fill={color} opacity="0.5" />
          <path d="M85 130 L85 200 M115 130 L115 200" stroke={accent} strokeWidth="2" opacity="0.4" />
        </>
      );
  }
}

function FaceDetails({ expression }: { expression: ExpressionId }) {
  const mouth =
    expression === 'smile' || expression === 'gentle'
      ? 'M84 122 Q100 134 116 122'
      : expression === 'sad'
        ? 'M86 128 Q100 118 114 128'
        : expression === 'surprised'
          ? ''
          : expression === 'serious'
            ? 'M88 124 L112 124'
            : 'M90 124 Q100 128 110 124';
  const browLeft =
    expression === 'serious'
      ? 'M78 96 L94 92'
      : expression === 'sad'
        ? 'M78 94 Q86 91 94 96'
        : 'M78 94 Q86 91 94 94';
  const browRight =
    expression === 'serious'
      ? 'M106 92 L122 96'
      : expression === 'sad'
        ? 'M106 96 Q114 91 122 94'
        : 'M106 94 Q114 91 122 94';

  return (
    <>
      <path d={browLeft} stroke="rgba(24, 18, 24, 0.42)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d={browRight} stroke="rgba(24, 18, 24, 0.42)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <ellipse cx="86" cy="106" rx={expression === 'surprised' ? 4.6 : 5.4} ry={expression === 'serious' ? 3.6 : 5.6} fill="#18151d" />
      <ellipse cx="114" cy="106" rx={expression === 'surprised' ? 4.6 : 5.4} ry={expression === 'serious' ? 3.6 : 5.6} fill="#18151d" />
      <circle cx="88" cy="104" r="1.6" fill="rgba(255,255,255,0.9)" />
      <circle cx="116" cy="104" r="1.6" fill="rgba(255,255,255,0.9)" />
      <ellipse cx="75" cy="116" rx="8" ry="3.5" fill="rgba(255, 146, 162, 0.16)" />
      <ellipse cx="125" cy="116" rx="8" ry="3.5" fill="rgba(255, 146, 162, 0.16)" />
      {expression === 'surprised' ? (
        <ellipse cx="100" cy="126" rx="5" ry="7" fill="rgba(24, 18, 24, 0.38)" />
      ) : (
        <path d={mouth} stroke="rgba(24, 18, 24, 0.38)" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}
      {expression === 'gentle' && <path d="M64 92 Q57 86 62 80" stroke="rgba(255,255,255,0.36)" strokeWidth="2" strokeLinecap="round" fill="none" />}
      {expression === 'sad' && <path d="M122 112 Q126 116 123 121" stroke="rgba(120,160,255,0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />}
    </>
  );
}

export function CharacterSprite({ characterId, expression, position, visible }: CharacterSpriteProps) {
  if (!visible) return null;

  const char = CHARACTERS[characterId];
  const exprLabel = EXPRESSION_LABELS[expression];

  return (
    <div className={`character-sprite pos-${position} entering expression-${expression}`}>
      <div className="sprite-aura" />
      {exprLabel && <span className="sprite-expression">{exprLabel}</span>}
      <svg viewBox="0 0 200 300" className="sprite-svg" aria-label={char.name}>
        <defs>
          <linearGradient id={`grad-${characterId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={char.color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={char.accentColor} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`cloth-${characterId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={char.accentColor} stopOpacity="0.98" />
            <stop offset="100%" stopColor={char.color} stopOpacity="0.75" />
          </linearGradient>
          <filter id={`soft-shadow-${characterId}`} x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#000000" floodOpacity="0.34" />
          </filter>
        </defs>
        <ellipse cx="100" cy="290" rx="50" ry="8" fill="rgba(0,0,0,0.2)" />
        <g filter={`url(#soft-shadow-${characterId})`}>
          <path d="M62 136 Q100 118 138 136 L148 284 L52 284 Z" fill={`url(#cloth-${characterId})`} opacity="0.24" />
          <OutfitShape outfit={char.outfit} color={char.color} accent={char.accentColor} />
          <ellipse cx="100" cy="105" rx="35" ry="40" fill={`url(#grad-${characterId})`} />
          <path d="M75 82 Q100 68 125 82" stroke="rgba(255,255,255,0.26)" strokeWidth="5" strokeLinecap="round" fill="none" />
          <HairShape style={char.hairStyle} color={char.accentColor} />
        </g>
        {char.hairStyle === 'ponytail' && (
          <rect x="82" y="95" width="36" height="8" rx="3" fill="rgba(255,255,255,0.15)" />
        )}
        <FaceDetails expression={expression} />
      </svg>
      <div className="sprite-nameplate">{char.name}</div>
    </div>
  );
}
