import { Link } from "react-router-dom";

const PrivacyPolicy = () => {

  return (
    <div>
      <header className="sm:h-12 bg-thin-gray p-4 sm:py-0 fixed z-10 top-0 right-0 left-0 w-full">
        <div className="mx-auto max-w-[1280px] w-full h-full flex flex-col sm:flex-row items-center sm:justify-between">
          <h1 className="text-2xl font-bold">
            <Link to="/about">時間管理君</Link>
          </h1>
          <nav className="mt-4 sm:mt-0">
            <ul className="flex flex-wrap">
              <li className="w-1/2 sm:w-auto text-center"><Link className="p-2 text-sm sm:text-base" to="../login" relative="path">ログイン</Link></li>
              <li className="w-1/2 sm:w-auto text-center"><Link className="p-2 text-sm sm:text-base" to="../terms" relative="path">利用規約</Link></li>
              <li className="w-1/2 sm:w-auto text-center mt-4 sm:mt-0"><Link className="p-2 text-sm sm:text-base" to="../privacypolicy" relative="path">プライバシーポリシー</Link></li>
              <li className="w-1/2 sm:w-auto text-center mt-4 sm:mt-0"><Link className="p-2 text-sm sm:text-base" to="https://docs.google.com/forms/d/1VkZ6plbTQlcDHEBJ2ND-KEiRKaq6KZKHuu3mWAPqSnI/edit" target="_blank">お問い合わせ</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="px-7 mt-40 sm:mt-12">
        <div className="mx-auto max-w-[960px] w-full">
          <section className="py-10 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center">プライバシーポリシー（個人情報保護方針）</h2>
            <div className="mt-8">
              <div className="py-5">
                <p className="leading-8">時間管理君（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）におけるユーザー様の個人情報について以下のとおりプライバシーポリシー（以下、「本ポリシー」という。）を定めます。本ポリシーは、本サービスがどのような個人情報を取得し、どのように利用・共有するか、ユーザー様がどのようにご自身の個人情報を管理できるかをご説明するものです。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">１．事業者情報</h3>
                <p className="leading-8 mt-3">森屋 敏</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">２．個人情報の取得方法</h3>
                <p className="leading-8 mt-3">当方はユーザー様が利用登録をするとき、メールアドレスの情報を取得させていただきます。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">３．個人情報の利用目的</h3>
                <p className="leading-8 mt-3">当方は、お客様から取得した情報を、以下の目的のために利用します。</p>
                <ul className="mt-3 ml-6 list-disc leading-8">
                  <li>本サービスに関するアカウント登録、お客様の本人確認、認証のため</li>
                  <li>当方の規約や法令に違反する行為に対応するため</li>
                  <li>本サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
                  <li>当方規約の変更等を通知するため</li>
                  <li>以上の他、本サービスの提供、維持、保護及び改善のため</li>
                </ul>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">４．個人データを安全に管理するための措置</h3>
                <p className="leading-8 mt-3">当方は個人情報を、不正なアクセス・改ざん・漏えい・滅失及び毀損から保護するため、システムの導入を行っています。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">５．個人データの第三者提供について</h3>
                <p className="leading-8 mt-3">当方は法令及びガイドラインに別段の定めがある場合を除き、同意を得ないで第三者に個人情報を提供することは致しません。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">６．個人情報の開示、訂正、削除等の手続について</h3>
                <p className="leading-8 mt-3">当方は個人情報の保護に関する法律に基づき、当社が保有する個人情報に関して、お客さまご本人から開示、訂正等のお申し出があった場合には、その内容を確認し必要に応じて対応を行います。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">７．SSL（Secure Socket Layer）について</h3>
                <p className="leading-8 mt-3">当方のWebサービスはSSLに対応しており、WebブラウザとWebサーバーとの通信を暗号化しています。ユーザー様が入力する個人情報は自動的に暗号化されます。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">８．プライバシーポリシーの制定日及び改定日</h3>
                <p className="leading-8 mt-3">制定：2023年9月21日</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">９．プライバシーポリシーの変更について</h3>
                <p className="leading-8 mt-3">当方は、プライバシーポリシーの全部または一部を改定することがあります。</p>
                <p className="leading-8 mt-3">プライバシーポリシーの内容は、法令その他プライバシーポリシーに別段の定めのある事項を除いて、通知することなく変更することができるものとします。</p>
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
      <footer className="p-3 text-center">
        <small>© 2023 時間管理君</small>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
