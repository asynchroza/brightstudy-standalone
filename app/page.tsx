import { getStyledComponentObject } from "@/utils/colorSystem";

export default function HomePage({}) {
  const style = getStyledComponentObject("GalleryComponent");

  return (
    <div style={{ backgroundColor: String(style?.backgroundColor) }}>
      <h1>TEST</h1>
    </div>
  );
}
