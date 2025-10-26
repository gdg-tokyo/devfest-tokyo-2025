'use client'

export function Welcome() {
  return (
    <section className="container mx-auto px-4 lg:px-8 max-w-screen-md lg:max-w-screen-xl p-8 text-center">
      <div className="mx-full p-6 rounded-lg border-2 border-gray-800 shadow-lg bg-white text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 google-sans">
          GDG DevFest Tokyo 2025 へようこそ！
        </h2>
        <p>
          DevFest は、Google Developer Group (GDG)
          コミュニティによって世界各地で開かれるデベロッパー向けイベントです。
          東京では、Android、Google Cloud 、Web、Firebase、Machine Learning
          (ML)、Flutter、Goといった様々な技術の最新情報や現場でのノウハウを一日で学べるコミュニティイベントとして開催しています。
        </p>
        <p className="mt-4">
          今年は 11月22日 (土)
          にベルサール渋谷ファーストにて、10回目の開催になります。豪華な
          30名以上のスピーカーの皆様と一緒に、各技術の最新情報をアップデートするとともに、いつもと違う「視点」から自分のスキルを見つめ直してみませんか？
        </p>
      </div>
    </section>
  )
}
