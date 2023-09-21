import { Link } from "react-router-dom";

const Terms = () => {

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
            <h2 className="text-2xl md:text-3xl font-bold text-center">利用規約</h2>
            <div className="mt-8">
              <div className="py-5">
                <p className="leading-8">この利用規約（以下、「本規約」といいます。）は、時間管理君（以下、「当方」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー様」といいます。）には、本規約に従って、本サービスをご利用いただきます。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第1条（適用）</h3>
                <p className="leading-8 mt-3">本規約は，ユーザー様と当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第2条（利用登録）</h3>
                <p className="leading-8 mt-3">登録希望者が当方の定める方法によって利用登録を申請し，当方がこれを承認することによって，利用登録が完了するものとします。</p>
                <p className="leading-8 mt-3">当方は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。</p>
                <ul className="mt-3 ml-6 list-decimal leading-8">
                  <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                  <li>本規約に違反したことがある者からの申請である場合</li>
                  <li>その他，当方が利用登録を相当でないと判断した場合</li>
                </ul>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第3条（ユーザーIDおよびパスワードの管理）</h3>
                <p className="leading-8 mt-3">ユーザー様は，自己の責任において，本サービスのユーザーIDおよびパスワードを管理するものとします。</p>
                <p className="leading-8 mt-3">ユーザー様は，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与することはできません。ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー様自身による利用とみなします。当方は，パスワードやメールアドレスを第三者に公開することはありません。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第4条（禁止事項）</h3>
                <p className="leading-8 mt-3">ユーザー様は，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
                <ul className="mt-3 ml-6 list-decimal leading-8">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>当方，ほかのユーザー様，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
                  <li>当方のサービスの運営を妨害するおそれのある行為</li>
                  <li>不正アクセスをし，またはこれを試みる行為</li>
                  <li>他のユーザー様に関する個人情報等を収集または蓄積する行為</li>
                  <li>不正な目的を持って本サービスを利用する行為</li>
                  <li>他のユーザー様に成りすます行為</li>
                  <li>本サービスの他のユーザー様またはその他の第三者に不利益，損害，不快感を与える行為</li>
                  <li>当方が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為</li>
                  <li>当方のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
                  <li>その他，当方が不適切と判断する行為</li>
                </ul>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第5条（本サービスの提供の停止等）</h3>
                <p className="leading-8 mt-3">当方は，以下のいずれかの事由があると判断した場合，ユーザー様に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
                <ul className="mt-3 ml-6 list-decimal leading-8">
                  <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                  <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                  <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                  <li>その他，当方が本サービスの提供が困難と判断した場合</li>
                </ul>
                <p className="leading-8 mt-3">当方は，本サービスの提供の停止または中断により，ユーザー様または第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第6条（利用制限および登録抹消）</h3>
                <p className="leading-8 mt-3">当方は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。</p>
                <ul className="mt-3 ml-6 list-decimal leading-8">
                  <li>本規約のいずれかの条項に違反した場合</li>
                  <li>登録事項に虚偽の事実があることが判明した場合</li>
                  <li>当方からの連絡に対し，一定期間返答がない場合</li>
                  <li>その他，当方が本サービスの利用を適当でないと判断した場合</li>
                </ul>
                <p className="leading-8 mt-3">当方は，本条に基づき当方が行った行為によりユーザーに生じた損害について，一切の責任を負いません。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第7条（免責事項）</h3>
                <p className="leading-8 mt-3">当方の債務不履行責任は，当方の故意または重過失によらない場合には免責されるものとします。</p>
                <p className="leading-8 mt-3">当方は，本サービスに関して，ユーザー様と他のユーザー様または第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第8条（退会）</h3>
                <p className="leading-8 mt-3">ユーザー様は，当方の定める退会手続により，本サービスから退会できるものとします。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第9条（保証の否認）</h3>
                <p className="leading-8 mt-3">当方は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</p>
                <p className="leading-8 mt-3">当方は，本サービスに起因してユーザー様に生じたあらゆる損害について、当方の故意又は重過失による場合を除き、一切の責任を負いません。ただし，本サービスに関する当方とユーザー様との間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。</p>
                <p className="leading-8 mt-3">前項ただし書に定める場合であっても，当方は，当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザー様に生じた損害のうち特別な事情から生じた損害（当方またはユーザー様が損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザー様に生じた損害の賠償は，ユーザー様から当該損害が発生した月に受領した利用料の額を上限とします。</p>
                <p className="leading-8 mt-3">当方は，本サービスに関して，ユーザー様と他のユーザー様または第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第10条（サービス内容の変更等）</h3>
                <p className="leading-8 mt-3">当方は，ユーザー様への事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザー様はこれを承諾するものとします。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第11条（利用規約の変更）</h3>
                <p className="leading-8 mt-3">当方は，必要と判断した場合には，ユーザー様に通知することなくいつでも本規約を変更することができるものとします。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第12条（個人情報の取扱い）</h3>
                <p className="leading-8 mt-3">当方は，本サービスの利用によって取得する個人情報については，当方「プライバシーポリシー」に従い適切に取り扱うものとします。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第13条（通知または連絡）</h3>
                <p className="leading-8 mt-3">ユーザー様と当方との間の通知または連絡は，当方の定める方法によって行うものとします。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第14条（権利義務の譲渡の禁止）</h3>
                <p className="leading-8 mt-3">ユーザー様は，当方の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。</p>
              </div>
              <div className="py-5">
                <h3 className="text-xl font-bold leading-8">第15条（準拠法・裁判管轄）</h3>
                <p className="leading-8 mt-3">本規約の解釈にあたっては，日本法を準拠法とします。</p>
                <p className="leading-8 mt-3">本サービスに関して紛争が生じた場合には，当方の本店所在地を管轄する裁判所を専属的合意管轄とします。</p>
              </div>
            </div>
            <p className="mt-4">以上</p>
            <p className="mt-4">2023年9月21日 制定</p>
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

export default Terms;
