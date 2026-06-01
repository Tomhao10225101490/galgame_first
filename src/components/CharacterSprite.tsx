import { useEffect, useState } from 'react';
import { CHARACTERS } from '../data/characters';
import { getSpriteUrlWithFallback } from '../data/assets';
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
  const [useNeutralFallback, setUseNeutralFallback] = useState(false);
  const [displayedExpr, setDisplayedExpr] = useState(expression);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (expression === displayedExpr) return;
    setOpacity(0);
    const t = window.setTimeout(() => {
      setDisplayedExpr(expression);
      setUseNeutralFallback(false);
      setImgOk(true);
      requestAnimationFrame(() => setOpacity(1));
    }, 180);
    return () => clearTimeout(t);
  }, [expression, displayedExpr]);

  useEffect(() => {
    setUseNeutralFallback(false);
    setImgOk(true);
  }, [characterId, displayedExpr]);

  if (!visible) return null;

  const char = CHARACTERS[characterId];
  const displayUrl = getSpriteUrlWithFallback(characterId, displayedExpr, useNeutralFallback);

  const handleImgError = () => {
    if (!useNeutralFallback && displayedExpr !== 'neutral') {
      setUseNeutralFallback(true);
      return;
    }
    setImgOk(false);
  };

  return (
    <div className={`character-sprite pos-${position} entering`}>
      {imgOk ? (
        <img
          src={displayUrl}
          alt={char.name}
          className="sprite-img"
          style={{ opacity }}
          onError={handleImgError}
          draggable={false}
        />
      ) : (
        <SpriteFallback characterId={characterId} expression={displayedExpr} />
      )}
    </div>
  );
}
