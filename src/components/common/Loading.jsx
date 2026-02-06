export default function Loading({ text = "Loading..." }) {
  return (
    <div style={{ padding: "1rem" }}>
      <p>{text}</p>
    </div>
  );
}