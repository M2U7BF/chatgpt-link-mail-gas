// config ---------------------------------

// 毎日送信するプロンプト
const dailyPrompts = [
  '人間の生活を変えたり業界変革を起こすような技術、スタートアップの情報を直近3ヶ月に絞って調べて、5つ選んでまとめて。'
];

// 各曜日のみ送信するプロンプト
const mondayPrompts = [];
const tuesdayPrompts = [
  '直近一週間の日本、中国、フランス、ロシア、英国、米国の株式市場について、分析して。また各国で注目すべき個別銘柄5選をランダムに選んで紹介して。',
  '直近一週間の日本国内と海外でのセキュリティ関連の事件（ハッキング、障害）についてまとめて。'
];
const wednesdayPrompts = [];
const thursdayPrompts = [
  '直近一週間の海外メディアが日本の経済と政治を報じた内容をわかりやすくまとめて。必要であれば過去の経緯を足して。',
  '癒やされる旅行先を5つ、直近一週間のSNSの投稿を参考にして選んで紹介して。総予算が5万円以内で行けるもので。'
];
const fridayPrompts = [];
const saturdayPrompts = [];
const sundayPrompts = [];

// util -----------------------------------
var getChatgptUrl = function (/** @type {any} */ prompt) {
  const chatgptUrl = `https://chatgpt.com/?mode=default&prompt=${encodeURI(prompt)}`
  return chatgptUrl;
};

var createChatgptButtonElement = function (/** @type {string} */ prompt) {
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

var promptsToButtonElements = function (/** @type {string[]} */ prompts) {
  var html = '';
  prompts.forEach(function (prompt) {
    html += createChatgptButtonElement(prompt);
  });
  return html;
}

const createMailDailyContent = function () {
  return promptsToButtonElements(dailyPrompts);
}

const createMailWeeklyContent = function () {
  let prompts = [];
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  switch (day) {
    case 'Monday':
      prompts = mondayPrompts
      break;
    case 'Tuesday':
      prompts = tuesdayPrompts;
      break;
    case 'Wednesday':
      prompts = wednesdayPrompts;
      break;
    case 'Thursday':
      prompts = thursdayPrompts;
      break;
    case 'Friday':
      prompts = fridayPrompts;
      break;
    case 'Saturday':
      prompts = saturdayPrompts;
      break;
    case 'Sunday':
      prompts = sundayPrompts;
      break;
  }

  return promptsToButtonElements(prompts);
}

const createButtonList = function () {
  return createMailDailyContent() + createMailWeeklyContent();
};

const getMailBody = function () {
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
      ${createButtonList()}
    </div>
  </body>
  
  </html>`
};


// main -----------------------------------
/**
 * メール送信メイン関数
 */
function sendMail() {
  const props = PropertiesService.getScriptProperties();

  const to      = props.getProperty("MAIL_TO");
  const subject = "毎日ChatGPTメール";

  const bodyHtml = getMailBody();

  GmailApp.sendEmail(to, subject, "", {
    htmlBody: bodyHtml
  });
}
