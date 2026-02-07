export default function Loading({ text = "Loading..." }) {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}
