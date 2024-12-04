# ベースイメージ
FROM node:21-alpine

# 環境変数と作業ディレクトリ
ENV APP /app
WORKDIR $APP

# package.json と package-lock.json のみを最初にコピー
COPY package*.json $APP/

# パッケージのインストール
RUN npm install

# 残りのアプリケーションコードをコピー
COPY . $APP

# ビルドプロセス
RUN npm run build

# ポートを公開
EXPOSE 5173

# サーバーを起動
CMD ["npm", "run", "dev"]