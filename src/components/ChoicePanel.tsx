interface ChoicePanelProps {
  choices: { text: string; index: number }[];
  onSelect: (index: number) => void;
}

export function ChoicePanel({ choices, onSelect }: ChoicePanelProps) {
  return (
    <div className="choice-panel">
      {choices.map((choice) => (
        <button
          key={choice.index}
          className="choice-btn"
          onClick={() => onSelect(choice.index)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
