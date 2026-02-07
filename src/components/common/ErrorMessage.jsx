export default function ErrorMessage({ message = "Something went wrong", onRetry }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="mb-3 text-sm text-red-900">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}
