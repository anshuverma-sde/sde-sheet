const STYLES = {
  Easy:   'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-orange-100 text-orange-700 border-orange-200',
  Tough:  'bg-red-100 text-red-700 border-red-200',
};

export default function DifficultyBadge({ difficulty }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${
        STYLES[difficulty] ?? 'bg-gray-100 text-gray-600 border-gray-200'
      }`}
    >
      {difficulty}
    </span>
  );
}
