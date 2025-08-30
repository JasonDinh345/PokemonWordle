'use client';
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }} className="flex flex-row font-bold">
      <Link href="/" >Home</Link> | <Link href="/game" >Play!</Link>
    </nav>
  );
}