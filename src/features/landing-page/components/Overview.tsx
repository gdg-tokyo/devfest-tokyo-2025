'use client'

import React from 'react'

export function Overview() {
  return (
    <section className="p-8 text-center">
      <div className="max-w-2xl mx-auto p-6 rounded-lg border-2 border-gray-800 shadow-lg bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">概要 (Overview)</h2>
        <div className="text-left">
          <p className="mb-2">
            <strong>日時 (Date/Time):</strong> 2025年11月22日(土) 12:30 - 18:00
            (暫定)
          </p>
          <p className="mb-2">
            <strong>場所 (Location):</strong> ベルサール渋谷ファースト
            (東京都渋谷区東1-2-20 住友不動産渋谷ファーストタワー2F)
          </p>
          <p className="mb-2">
            <strong>参加方法 (How to participate):</strong> 会場参加
            (無料)。受付方法の詳細は後日案内されます。
          </p>
        </div>
      </div>
    </section>
  )
}
