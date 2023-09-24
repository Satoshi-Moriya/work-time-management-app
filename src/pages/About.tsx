import { Link } from "react-router-dom";

const About = () => {

  return (
    <>
      <main className="px-7 mt-40 sm:mt-12">
        <div className="mx-auto max-w-[1280px] w-full">
          <section className="py-10 md:py-16">
            <div className="flex items-center flex-col sm:flex-row">
              <div className="sm:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold">全ての時間管理をひとまとめに！！</h2>
                <p className="mt-8 leading-8">「時間管理君」は、日々の活動を効果的に追跡し、登録したタスクやアクティビティを一日の中で具体的な時間帯と時間秒単位で記録・管理する便利なツールです。</p>
                <p className="leading-8">これにより、自身の時間の使い方を可視化し、日常のタスクやプロジェクトにどれだけの時間を費やしているかを的確に把握することができます。</p>
              </div>
              <div className="sm:w-1/2">
                <img src="/images/top-mv.png" alt="時間管理をする女性" />
              </div>
            </div>
          </section>
          <section className="py-10 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">使用例</h2>
            <div className="flex sm:justify-around items-center flex-col sm:flex-row mt-8">
              <div className="max-w-sm rounded overflow-hidden shadow-lg sm:w-[45%]">
                <img className="w-full" src="/images/top-usecase1.png" alt="勤怠管理" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">勤怠管理</div>
                  <p className="text-gray-700 text-base leading-8">日々の仕事やプロジェクトにかかる時間を正確に記録し、効率的な業務遂行をサポートします。出勤時間、退勤時間などを記録し、勤怠データを整理して給与計算や業務分析に役立てましょう。タスクごとの作業時間を把握し、プロジェクトの進捗状況を可視化することも可能です。</p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg sm:w-[45%] mt-6 sm:mt-0">
                <img className="w-full" src="/images/top-usecase2.png" alt="練習時間管理" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">勉強時間管理</div>
                  <p className="text-gray-700 text-base leading-8">学習やスキルの向上を追求する方に最適です。登録した勉強内容や学習プロジェクトごとに、費やした時間を記録します。勉強時間のトラッキングを通じて、目標達成度を評価し、学習の進捗をモニタリングします。自己啓発やスキル向上に集中し、学習成果を最大化しましょう。</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <section className="pt-10 md:pt-16">
        <div className="bg-thin-gray py-10 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center">ぜひお試しください</h2>
          <div className="flex justify-around mt-8">
          <div className="mt-8">
              <Link
                to="../signup"
                relative="path"
                className="bg-orange-400 border-orange-400 hover:bg-orange-700 focus:bg-orange-700 rounded-lg text-white font-bold px-3 py-2 w-full"
              >
                会員登録はこちらから
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
