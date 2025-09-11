import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Link href="/setting">تنظیمات شخصی</Link>
    </div>
  );
}
