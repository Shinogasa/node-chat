#alpineのnode
FROM node:10.11.0-alpine

# ディレクトリ移動
WORKDIR /app

ADD ./app/server.js /app/server.js

ADD ./app/package.json /app/package.json

#パッケージインストール
RUN npm install -g

# ポート3000番開放
EXPOSE 3000

CMD ["node", "server.js"]