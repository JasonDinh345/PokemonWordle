'use client';
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link href="/">Home</Link> | <Link href="/game">About</Link>
    </nav>
  );
}