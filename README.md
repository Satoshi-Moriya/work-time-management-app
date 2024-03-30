# 時間管理君

日々の活動を効果的に追跡し、登録したタスクやアクティビティを一日の中で具体的な時間帯と時間秒単位で記録・管理する便利なWebアプリケーションです。<br>
自身の時間の使い方を可視化し、日常のタスクやプロジェクトにどれだけの時間を費やしているかを把握することができます。<br>
レスポンシブ対応をしているのでスマホからもご確認いただけます。

![jikan-kanrikun-pc1](https://github.com/Satoshi-Moriya/work-time-management-app-front/assets/52366227/6c3b2f8f-5c53-4744-ab35-cac751acd223)

![jikan-kanrikun-pc2](https://github.com/Satoshi-Moriya/work-time-management-app-front/assets/52366227/c1677115-b8ca-4962-86eb-51c8e9823c48)

![jikan-kanrikun-pc3](https://github.com/Satoshi-Moriya/work-time-management-app-front/assets/52366227/deeb7972-2c83-44a1-891a-88f63e2cd298)

<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/Satoshi-Moriya/work-time-management-app-front/assets/52366227/d644b05c-bcef-4f5c-81bc-65ed2dcf200f" width="45%"/>
    <img src="https://github.com/Satoshi-Moriya/work-time-management-app-front/assets/52366227/da2ee37d-a0c3-4071-9514-c7e6e5eca2c1" width="45%" />
</div>
<br>

# URL
~~<https://www.jikan-kanri-kun.com/about>~~<br>
※現在はアクセスできません  
メールアドレス : `moriyas@example.com`<br>
パスワード : test1234<br>
でログイン可能です。
（新規にユーザー登録も可能です。）

サーバサイドのリポジトリ<br>
https://github.com/Satoshi-Moriya/work-time-management-app-back

# 使用技術（サーバー側も含む）
- React 18.2.0
- TypeScript 4.9.5
- Tailwind CSS 3.3.2
- Node.js 16.18.34
- Jest
- React Testing Library
- Mock Service Worker
- Kotlin 1.8.20
- Spring Boot 3.1.1
- openjdk 17.0.8.1
- JUnit
- Mockito
- MockMVC
- AWS
  - Route53
  - CloudFront
  - S3
  - ACM
  - VPC
  - EC2
  - RDS
- Apache
- MySQL 8.0.33
- Docker/Docker-compose（開発環境）
- GitHub Actions（CI/CD）

# インフラ構成図
![app-diagram](https://github.com/Satoshi-Moriya/work-time-management-app-front/assets/52366227/c37821aa-aa57-4ef3-8c8e-0536b69d56f3)

# 機能一覧
- ユーザー登録機能
- ログイン機能
- 時間管理をする項目の機能
  - 登録機能
  - 削除機能
- 時間記録機能
  - 登録機能
  - 削除機能
- メールアドレス変更機能（メールアドレスは登録時に必要）
- パスワード変更機能（パスワードは登録時に必要）
- 退会機能

# テスト
- クライアント
  - 単体テスト（Jest、React Testing Library）
  - 結合テスト（Jest、React Testing Library、Mock Service Worker）
- サーバー
  - 単体テスト（JUnit、Mockito、MockMVC）

# サービスをより良くすために、ポートファリオを充実させるために、今後挑戦していきたいこと
- api通信の無駄が発生している箇所があるので、React.memoやuseCallbackなどを使って最適化する
- ログイン前にパスワード変更ができる機能を追加する（パスワードを忘れた方へ的な）
- サーバサイドもGithub Actionsを使って、CI/CDの環境を作成する
- ECS Fargateを使ったサーバーレスにする
- Terraformを使ってクラウドインフラをコードで管理できるようにする
- テストをもう少し充実させる（E2Eテスト？）
- GitHub Actionsを利用してのECSのBlue/Greenデプロイ
