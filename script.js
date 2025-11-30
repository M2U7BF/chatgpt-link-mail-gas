// util -----------------------------------
var getChatgptUrl = function (/** @type {any} */ prompt) {
  const chatgpt_url = `https://chatgpt.com/?mode=default&prompt=${encodeURI(prompt)}`
  return chatgpt_url;
};

var getChatgptButtonElement = function (/** @type {string} */ prompt) {
  return `
  <div class="button-block">
    <div class="button-title">${prompt}</div>
    <div class="btn-wrap">
      <a class="btn" href="${getChatgptUrl(prompt)}" target="_blank">
        ChatGPTで検索する
      </a>
    </div>
  </div>
  `;
};

// ----------------------------------------

const mail_content_everyday = function () {
  return `
  ${getChatgptButtonElement(`昨日の日本、中国、フランス、ロシア、英国、米国の株式市場について、分析して。また各国の注目株5選を紹介して。以上の結果をわかりやすくまとめて。`)}
  `;
}

const mail_content_week = function () {
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  switch (day) {
    case 'Thursday':
      return `
      ${getChatgptButtonElement(`直近一週間、海外メディアが日本の経済と政治を報じた内容をわかりやすくまとめて。必要であれば過去の経緯を足して。`)}
      ${getChatgptButtonElement(`セキュリティ関連の事件（ハッキング、障害）`)}
      `;
    default:
      return ``;
  }
}

const button_list = function () {
  return `
    ${mail_content_everyday()}
    ${mail_content_week()}
  `};

const mail_layout = function () {
  return `
  <!DOCTYPE html>
  <html>
  
  <head>
    <title></title>
    <meta charset="UTF-8">
    <style>
    body {
      font-family: "Hiragino Sans", "Noto Sans JP", sans-serif;
      background: #f7f9fc;
      margin: 0;
      padding: 0;
      color: #1e366a;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      padding: 2rem;
      /* border-radius: 12px; */
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .title {
      font-size: 1.6rem;
      font-weight: bold;
      color: #1e366a;
      margin-bottom: 1rem;
      border-left: 6px solid #1e366a;
      padding-left: 0.8rem;
    }

    .description {
      margin-bottom: 1.5rem;
      line-height: 1.8;
      font-size: 1.05rem;
    }

    ul {
      color: #1e366a;
      border-top: solid #1e366a 1px;
      border-bottom: solid #1e366a 1px;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
    }

    ul li {
      line-height: 1.7;
      padding: 0.5rem 0;
    }

    /* ボタンカード */
    .button-block {
      background: #f0f4fb;
      padding: 1.3rem;
      margin-bottom: 1.5rem;
      border-left: 6px solid #1e366a;
    }

    .button-title {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0.8rem;
      color: #1e366a;
    }

    .btn-wrap {
      text-align: left;
    }

    a.btn {
      display: inline-block;
      padding: 0.8rem 2rem;
      text-decoration: none;
      text-align: center;
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
      background: #41a4fd;
      border-radius: 100vh;
      transition: 0.4s;
    }

    a.btn:hover {
      background: #3c97e6;
      text-shadow: 0px 0px 10px #ffffff;
    }
  </style>
  </head>
  
  <body>
    <div class="container">
      <!-- <div class="description">
        以下のボタンから ChatGPT に移動できます。
      </div> -->
      ${button_list()}
    </div>
  </body>
  
  </html>`
};

return { html : `${mail_layout()}` };
