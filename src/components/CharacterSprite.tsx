import { useEffect, useState, type CSSProperties } from 'react';
import { CHARACTERS, EXPRESSION_LABELS } from '../data/characters';
import { getSpritePath, SPRITE_CHARACTERS } from '../data/assets';
import type { CharacterId, ExpressionId } from '../engine/types';

interface CharacterSpriteProps {
  characterId: CharacterId;
  expression: ExpressionId;
  position: 'left' | 'center' | 'right';
  visible: boolean;
}

function SpriteFallback({ characterId, expression }: { characterId: CharacterId; expression: ExpressionId }) {
  const char = CHARACTERS[characterId];
  const label = EXPRESSION_LABELS[expression];

  return (
    <div className="sprite-fallback" style={{ '--sprite-color': char.color, '--sprite-accent': char.accentColor } as CSSProperties}>
      <div className="fallback-head">
        <span className="fallback-face">{label || '·'}</span>
      </div>
      <div className="fallback-body" />
      <div className="fallback-name">{char.name}</div>
    </div>
  );
}

export function CharacterSprite({ characterId, expression, position, visible }: CharacterSpriteProps) {
  const [failed, setFailed] = useState(false);
  const char = CHARACTERS[characterId];
  const hasSprite = SPRITE_CHARACTERS.includes(characterId);
  const src = hasSprite ? getSpritePath(characterId, expression) : '';

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!visible) return null;

  return (
    <div className={`character-sprite pos-${position} entering expression-${expression}`}>
      <div className="sprite-aura" />
      {hasSprite && !failed ? (
        <img
          key={src}
          className="sprite-img"
          src={src}
          alt={`${char.name} ${expression}`}
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <SpriteFallback characterId={characterId} expression={expression} />
      )}
      <div className="sprite-nameplate">{char.name}</div>
    </div>
  );
}
