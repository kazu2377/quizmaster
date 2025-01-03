'use client'

import { useState } from 'react'

export default function ClientSideComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="mt-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(count + 1)}
      >
        クリック数: {count}
      </button>
    </div>
  )
}

