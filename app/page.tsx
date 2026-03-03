"use client"
import Image from "next/image";
import { json } from "stream/consumers";

export default function Home() {
  return (
    <div>
      <form>
        <input
          type="text"
          onChange={async (e) => {
            const res = await fetch(`/SearchBar/api/autocomplete?q=${encodeURIComponent(e.target.value)}`)
            const value = await res.json()
            console.log(value);
          }}
          required
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "8px",
          }}
        />
      </form>
    </div>
  )
}
