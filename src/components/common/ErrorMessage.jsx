export default function ErrorMessage({ message = "Something went wrong", onRetry }) {
  return (
    <div style={{ padding: "1rem", border: "1px solid #f5c2c7", borderRadius: 8 }}>
      <p style={{ marginBottom: "0.75rem" }}>{message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
