import DifficultyBadge from './DifficultyBadge';
import LinkIcons from './LinkIcons';

export default function ProblemRow({ problem, index, isCompleted, onToggle }) {
  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${isCompleted ? 'bg-green-50/40' : ''}`}>
      {/* Checkbox */}
      <td className="px-4 py-3 w-10">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(problem._id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </td>

      {/* Index */}
      <td className="px-2 py-3 text-sm text-gray-400 w-8">{index}</td>

      {/* Problem title */}
      <td className="px-4 py-3">
        <span className={`text-sm font-medium ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {problem.title}
        </span>
      </td>

      {/* Difficulty */}
      <td className="px-4 py-3 hidden sm:table-cell">
        <DifficultyBadge difficulty={problem.difficulty} />
      </td>

      {/* Links */}
      <td className="px-4 py-3">
        <LinkIcons
          youtubeLink={problem.youtubeLink}
          practiceLink={problem.practiceLink}
          articleLink={problem.articleLink}
        />
      </td>
    </tr>
  );
}
