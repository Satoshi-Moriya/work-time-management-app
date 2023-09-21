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
                <p className="mt-8 leading-8">「時間管理君」は、登録した項目を1日のうちのどの時間帯にどのくらいの時間かけたのかを記録・管理をすることができます。</p>
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
                  <p className="text-gray-700 text-base">1日の勤怠時間を記録することで、月の合計の勤怠時間も管理できます。</p>
                </div>
              </div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg sm:w-[45%] mt-6 sm:mt-0">
                <img className="w-full" src="/images/top-usecase2.png" alt="練習時間管理" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">勉強時間管理</div>
                  <p className="text-gray-700 text-base">毎日の勉強時間を記録して、努力量を可視化し、モチベーションアップ繋がります。</p>
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
