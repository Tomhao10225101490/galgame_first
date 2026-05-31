interface TextBoxProps {
  speakerName: string;
  text: string;
  displayedText: string;
  isNarration: boolean;
  onClick: () => void;
  onSkipTypewriter: () => void;
}

export function TextBox({
  speakerName,
  text,
  displayedText,
  isNarration,
  onClick,
  onSkipTypewriter,
}: TextBoxProps) {
  const isTyping = displayedText.length < text.length;

  const handleClick = () => {
    if (isTyping) {
      onSkipTypewriter();
    } else {
      onClick();
    }
  };

  return (
    <div className="text-box" onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), handleClick())}>
      {!isNarration && speakerName && (
        <div className="text-box-name">{speakerName}</div>
      )}
      {isNarration && (
        <div className="text-box-name narration-label">——</div>
      )}
      <div className={`text-box-content ${isNarration ? 'narration' : ''}`}>
        {displayedText}
        {isTyping && <span className="text-cursor">▌</span>}
      </div>
      {!isTyping && <div className="text-box-indicator">▼</div>}
    </div>
  );
}
