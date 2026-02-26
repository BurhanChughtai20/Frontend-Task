import { BRAND_DATA } from "./navbar/nav-data";

export default function BrandLogo() {
  const brand = BRAND_DATA[0];
  return (
    <div className="flex items-center gap-3 font-semibold text-gray-900 text-[15px] tracking-tight select-none">
      <div className="flex items-end gap-1">
        {brand.logoBars.map((bar, index) => (
          <span key={index} className={bar.barClass} />
        ))}
      </div>
      <span>{brand.logoText}</span>
    </div>
  );
}