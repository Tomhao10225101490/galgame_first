import { useEffect, useState } from 'react';
import { CHARACTERS } from '../data/characters';
import { getSpriteUrl } from '../data/assets';
import type { CharacterId, ExpressionId } from '../engine/types';
import { SpriteFallback } from './SpriteFallback';

interface CharacterSpriteProps {
  characterId: CharacterId;
  expression: ExpressionId;
  position: 'left' | 'center' | 'right';
  visible: boolean;
}

export function CharacterSprite({ characterId, expression, position, visible }: CharacterSpriteProps) {
  const [imgOk, setImgOk] = useState(true);
  const [displayedExpr, setDisplayedExpr] = useState(expression);
  const [opacity, setOpacity] = useState(1);
  const url = getSpriteUrl(characterId, expression);

  useEffect(() => {
    if (expression === displayedExpr) return;
    setOpacity(0);
    const t = window.setTimeout(() => {
      setDisplayedExpr(expression);
      setImgOk(true);
      requestAnimationFrame(() => setOpacity(1));
    }, 180);
    return () => clearTimeout(t);
  }, [expression, displayedExpr]);

  useEffect(() => {
    setImgOk(true);
  }, [url]);

  if (!visible) return null;

  const char = CHARACTERS[characterId];
  const displayUrl = getSpriteUrl(characterId, displayedExpr);

  return (
    <div className={`character-sprite pos-${position} entering`}>
      {imgOk ? (
        <img
          src={displayUrl}
          alt={char.name}
          className="sprite-img"
          style={{ opacity }}
          onError={() => setImgOk(false)}
          draggable={false}
        />
      ) : (
        <SpriteFallback characterId={characterId} expression={displayedExpr} />
      )}
    </div>
  );
}
