import { Result } from "../GameComponent";

type ResultColumnProps = {
  label: string;
  score: number;
  results: Result[];
  extraClass?: string;
};

export default function ResultColumn({
  label,
  score,
  results,
  extraClass = "",
}: ResultColumnProps) {
  const scoreColor = label === "Player" ? "rgb(1, 207, 1)" : "red";

  return (
    <div className={`result-column ${extraClass}`}>
      <div>
        <span aria-label={`${label} label`}>{label}:</span>
        <span
          className="score"
          style={{ color: scoreColor }}
          aria-label={`${label} score`}
        >
          {score}
        </span>
      </div>
      {results.map((result, index) => (
        <div
          key={index}
          className={`result ${result.isWinner ? "winner" : ""}`}
          data-testid={
            index === 0
              ? `${label.toLowerCase()}-latest-result`
              : `${label.toLowerCase()}-result-${index}`
          }
        >
          {result.symbol}
        </div>
      ))}
    </div>
  );
}
