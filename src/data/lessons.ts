export interface Lesson {
  id: string;
  title: string;
  category: 'modern-js' | 'react-basic';
  description: string;
  task: string;
  initialCode: string;
  solutionCode: string;
  hints: string[];
  validate: (code: string, logs: string[], previewEl: HTMLElement | null) => { success: boolean; message?: string };
}

export const lessons: Lesson[] = [
  {
    id: 'const-let',
    title: '1. const と let（変数宣言）',
    category: 'modern-js',
    description: `JavaScriptで変数を作るには、かつては \`var\` を使っていましたが、モダンJSでは **\`const\`** と **\`let\`** を使います。

### なぜ var を使わないの？
\`var\` にはスコープ（変数が見える範囲）の問題があり、意図しないバグが生まれやすいです。\`const\` と \`let\` はブロックスコープ（\`{}\` の中だけで有効）なので安全です。

### const と let の使い分け:
\`\`\`javascript
const name = "太郎";  // 再代入できない（定数）
let age = 20;         // 再代入できる（変数）

age = 21;    // OK！ let は再代入できる
name = "花子"; // エラー！ const は再代入できない
\`\`\`

### 基本ルール:
- **まず \`const\` を使う**（値が変わらないなら const）
- **再代入が必要な場合だけ \`let\`** を使う
- **\`var\` は使わない**（レガシーコード以外では非推奨）

Reactでは、コンポーネントや関数の定義には \`const\`、ループカウンタなど値が変わるものには \`let\` を使います。`,
    task: `下のコードの \`var\` を、適切に **\`const\`** または **\`let\`** に書き換えてください。
- 値が再代入されている変数は \`let\`
- それ以外は \`const\` を使ってください。`,
    initialCode: `// 課題: すべての var を const または let に書き換えてください。
// 再代入される変数は let、されない変数は const を使います。

var name = "太郎";
var age = 20;
var greeting = "こんにちは";

age = 21; // 誕生日！
greeting = name + "さん、" + age + "歳おめでとう！";

console.log(greeting);
`,
    solutionCode: `const name = "太郎";
let age = 20;
let greeting = "こんにちは";

age = 21;
greeting = name + "さん、" + age + "歳おめでとう！";

console.log(greeting);
`,
    hints: [
      '`name` は一度も再代入されていないので `const` です。',
      '`age` と `greeting` は後から別の値が代入されているので `let` を使います。'
    ],
    validate: (code, logs) => {
      const hasVar = /\bvar\s+/.test(code);
      const hasConst = /\bconst\s+name\b/.test(code);
      const hasLet = /\blet\s+(age|greeting)\b/.test(code);
      const outputCorrect = logs.some(log => log.includes('太郎さん、21歳おめでとう！'));

      if (hasVar) {
        return { success: false, message: 'コード内にまだ `var` が残っています。すべて `const` または `let` に書き換えてください。' };
      }
      if (!hasConst) {
        return { success: false, message: '`name` は再代入されていないので `const` で宣言してください。' };
      }
      if (!hasLet) {
        return { success: false, message: '再代入される変数（`age` や `greeting`）は `let` で宣言してください。' };
      }
      if (!outputCorrect) {
        return { success: false, message: 'コンソールに「太郎さん、21歳おめでとう！」が出力されていません。' };
      }
      return { success: true };
    }
  },
  {
    id: 'arrow-functions',
    title: '2. アロー関数 (Arrow Functions)',
    category: 'modern-js',
    description: `Reactでは関数の定義に「**アロー関数**」が非常によく使われます。アロー関数は、従来の \`function\` キーワードを省略し、代わりに矢印 \`=>\` を使ってコンパクトに書く方法です。

### 基本的な書き方:
\`\`\`javascript
// 従来の関数
function sayHello(name) {
  return "こんにちは、" + name + "さん";
}

// アロー関数
const sayHello = (name) => {
  return "こんにちは、" + name + "さん";
};

// 処理が1行だけの場合、{} と return も省略可能！
const sayHelloShort = (name) => "こんにちは、" + name + "さん";
\`\`\`

### なぜReactで使われるの？
Reactの関数コンポーネントや、イベントハンドラー（クリックされた時の処理など）、配列の処理をする際に、コードを圧倒的に短く読みやすく書けるため、デファクトスタンダード（標準）になっています。`,
    task: `下のエディタに用意された従来の関数 \`add\` を、**アロー関数**に書き換えてください。
- 変数名は \`add\` のままにしてください。
- 1行の省略形（\`{}\` と \`return\` を使わない形）で書いてみましょう。`,
    initialCode: `// 課題: 下記の関数をアロー関数に書き換えてください。
// 変数名は add のままにしてください。
function add(a, b) {
  return a + b;
}

// 実行して結果を確認
console.log("3 + 5 =", add(3, 5));
`,
    solutionCode: `const add = (a, b) => a + b;

console.log("3 + 5 =", add(3, 5));`,
    hints: [
      '`const add = (a, b) => { return a + b; };` も正解です。',
      'さらに短く書くなら、`const add = (a, b) => a + b;` とします。中括弧 `{}` と `return` を同時に省略できるのがポイントです。'
    ],
    validate: (code, logs) => {
      const hasArrow = code.includes('=>');
      const hasConstOrLet = code.match(/(const|let)\s+add/);
      const outputCorrect = logs.some(log => log.includes('3 + 5 = 8') || log.includes('8'));

      if (!hasArrow) {
        return { success: false, message: 'アロー演算子 `=>` がコード内に見つかりません。' };
      }
      if (!hasConstOrLet) {
        return { success: false, message: '`const add` または `let add` で関数を定義してください。' };
      }
      if (!outputCorrect) {
        return { success: false, message: 'ログに `3 + 5 = 8` が正しく出力されていません。関数の引数や戻り値が合っているか確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'destructuring',
    title: '3. 分割代入 (Destructuring)',
    category: 'modern-js',
    description: `**分割代入**は、オブジェクトや配列から特定のプロパティや要素を取り出して、直接変数に代入できる非常に便利な構文です。

### 基本的な書き方:
\`\`\`javascript
const user = { name: "太郎", age: 20 };

// 従来の書き方
const name = user.name;
const age = user.age;

// 分割代入
const { name, age } = user;
\`\`\`

これにより、何度も \`user.xxx\` と書く手間が省け、コードがすっきりします。

### なぜReactで使われるの？
Reactでは、コンポーネントに渡されるデータ（**Props**）を受け取るときや、状態管理（**useState**）を使うときに、この分割代入が極めて頻繁に使われます。`,
    task: `変数 \`user\` オブジェクトから、\`name\` と \`age\` の2つのプロパティを、**分割代入を使って1行で**取り出して変数に代入してください。
- 従来の \`user.name\` や \`user.age\` を直接変数に代入する書き方は使わないでください。`,
    initialCode: `const user = {
  name: "太郎",
  age: 20,
  city: "東京"
};

// 課題: user オブジェクトから name と age を
// 分割代入を使って1行で取り出してください。

// ここにコードを記述


// 実行して結果を確認
console.log("名前:", name);
console.log("年齢:", age);
`,
    solutionCode: `const user = {
  name: "太郎",
  age: 20,
  city: "東京"
};

const { name, age } = user;

console.log("名前:", name);
console.log("年齢:", age);`,
    hints: [
      '`const { キー名1, キー名2 } = オブジェクト名` という構文を使います。',
      '今回の場合、`const { name, age } = user;` と記述します。'
    ],
    validate: (code, logs) => {
      const hasDestructuring = /const\s*\{\s*(name|age)\s*,\s*(name|age)\s*\}\s*=\s*user/.test(code) || 
                               /let\s*\{\s*(name|age)\s*,\s*(name|age)\s*\}\s*=\s*user/.test(code);
      const hasDirectAccess = code.includes('user.name') || code.includes('user.age');
      const outputName = logs.some(log => log.includes('名前: 太郎'));
      const outputAge = logs.some(log => log.includes('年齢: 20'));

      if (!hasDestructuring) {
        return { success: false, message: '`const { name, age } = user` のような分割代入の記述が見つかりません。' };
      }
      if (hasDirectAccess) {
        return { success: false, message: '`user.name` や `user.age` を使わずに、分割代入のみで値を取り出してください。' };
      }
      if (!outputName || !outputAge) {
        return { success: false, message: '名前または年齢がコンソールに正しく出力されていません。' };
      }
      return { success: true };
    }
  },
  {
    id: 'template-literals',
    title: '4. テンプレートリテラル (Template Literals)',
    category: 'modern-js',
    description: `文字列の中に変数や数式を埋め込みたいとき、従来の \`+\` 記号での結合（\`"こんにちは" + name + "さん"\`）は、クォーテーションの管理が複雑でバグの原因になりがちでした。
これを解決するのが**テンプレートリテラル**です。

### 基本的な書き方:
- 文字列全体をシングル/ダブルクォーテーションではなく、**バッククォート** \` \` \` で囲みます。
- 変数や式を埋め込みたい部分は \`\${変数名}\` と書きます。

\`\`\`javascript
const name = "太郎";
// テンプレートリテラル
const message = \`こんにちは、\${name}さん！\`;
\`\`\`

### なぜReactで使われるの？
ReactでHTML要素のクラス名（CSSスタイル）を条件によって動的に切り替えたいとき（例：\`className={\`btn \${isActive ? 'active' : ''}\`}\`）などに大活躍します。`,
    task: `変数 \`name\` と \`age\` を使用し、テンプレートリテラルを使って **「花子さんは22歳です。」** という文字列を作成し、変数 \`message\` に代入してください。`,
    initialCode: `const name = "花子";
const age = 22;

// 課題: テンプレートリテラル(バッククォート \` \`)を使って、
// 「花子さんは22歳です。」という文字列を作成し、
// 変数 message に代入してください。

const message = ""; // ここを書き換える

console.log(message);
`,
    solutionCode: `const name = "花子";
const age = 22;

const message = \`\${name}さんは\${age}歳です。\`;

console.log(message);`,
    hints: [
      '文字列全体を `\`` (バッククォート) で囲みます。通常のシングルクォーテーション `\'` と間違えやすいので注意してください。キーボードの [Shift] + [@] もしくは [P] の右あたりで入力できます。',
      '変数名の周りを `${}` で囲んで埋め込みます。例: `${name}さんは${age}歳です。`'
    ],
    validate: (code, logs) => {
      const hasBacktick = code.includes('`');
      const hasInterpolation = code.includes('${name}') && code.includes('${age}');
      const outputCorrect = logs.some(log => log.includes('花子さんは22歳です。'));

      if (!hasBacktick) {
        return { success: false, message: 'シングルクォートやダブルクォートではなく、バッククォート \` \` を使用してください。' };
      }
      if (!hasInterpolation) {
        return { success: false, message: '変数 `name` と `age` を `${}` を使って埋め込んでください。' };
      }
      if (!outputCorrect) {
        return { success: false, message: 'コンソールに「花子さんは22歳です。」が出力されていません。文章が完全に一致しているか（句読点「。」など）を確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'ternary-operator',
    title: '5. 三項演算子 (Ternary Operator)',
    category: 'modern-js',
    description: `**三項演算子**は、\`if / else\` を1行で書ける省略記法です。Reactでは、JSX内で「条件によって表示内容を変える」ときに毎回使います。

### 基本的な書き方:
\`\`\`javascript
// if/else の場合
let message;
if (age >= 18) {
  message = "成人です";
} else {
  message = "未成年です";
}

// 三項演算子なら1行！
const message = age >= 18 ? "成人です" : "未成年です";
\`\`\`

### 構文:
\`条件 ? trueの場合の値 : falseの場合の値\`

### なぜReactで使われるの？
JSXの中では \`if\` 文が使えないため、条件分岐には必ず三項演算子（または \`&&\` 演算子）を使います。
例: \`{isLoggedIn ? <Dashboard /> : <LoginForm />}\``,
    task: `下の \`if / else\` を、**三項演算子** \`? :\` を使って1行の \`const\` 宣言に書き換えてください。
- 変数名は \`result\` のままにしてください。`,
    initialCode: `const score = 75;

// 課題: 下記の if/else を三項演算子 (? :) を使って
// 1行の const 宣言に書き換えてください。

let result;
if (score >= 60) {
  result = "合格";
} else {
  result = "不合格";
}

console.log("判定:", result);
`,
    solutionCode: `const score = 75;

const result = score >= 60 ? "合格" : "不合格";

console.log("判定:", result);`,
    hints: [
      '`条件 ? 値A : 値B` の形で書きます。条件が true なら値A、false なら値Bが返ります。',
      '`const result = score >= 60 ? "合格" : "不合格";` と記述します。'
    ],
    validate: (code, logs) => {
      const hasTernary = code.includes('?') && code.includes(':');
      const hasIf = /\bif\s*\(/.test(code);
      const outputCorrect = logs.some(log => log.includes('合格'));

      if (hasIf) {
        return { success: false, message: '`if` 文がまだ残っています。三項演算子 `? :` だけで書き換えてください。' };
      }
      if (!hasTernary) {
        return { success: false, message: '三項演算子 `? :` が見つかりません。' };
      }
      if (!outputCorrect) {
        return { success: false, message: 'コンソールに「合格」が出力されていません。' };
      }
      return { success: true };
    }
  },
  {
    id: 'spread-syntax',
    title: '6. スプレッド構文 (Spread Syntax)',
    category: 'modern-js',
    description: `**スプレッド構文**（ドット3つ \`...\`）は、配列やオブジェクトの中身を「展開」するための魔法のような構文です。
配列やオブジェクトのコピーを作ったり、他の配列と結合したりする際に欠かせません。

### 配列での例:
\`\`\`javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4] になる！
\`\`\`

### オブジェクトでの例:
\`\`\`javascript
const user = { name: "太郎" };
const updatedUser = { ...user, age: 20 }; // { name: "太郎", age: 20 }
\`\`\`

### なぜReactで使われるの？
Reactでは、State（状態）をアップデートする際に「元のデータを直接書き換えてはいけない（**イミュータビリティの保持**）」という超重要ルールがあります。
そのため、スプレッド構文を使って「元のオブジェクトや配列をコピーしながら、一部だけを変更した新しいデータ」を作るのが基本になります。`,
    task: `スプレッド構文（\`...\`）を使って、配列 \`baseNumbers\` の中身を展開し、最後に数値 \`4\` と \`5\` を追加した新しい配列 \`allNumbers\` を作成してください。`,
    initialCode: `const baseNumbers = [1, 2, 3];

// 課題: スプレッド構文(...)を使って、baseNumbers の全要素を含み、
// 最後に 4, 5 を追加した新しい配列「allNumbers」を作成してください。

// ここにコードを記述


console.log("配列:", allNumbers);
`,
    solutionCode: `const baseNumbers = [1, 2, 3];

const allNumbers = [...baseNumbers, 4, 5];

console.log("配列:", allNumbers);`,
    hints: [
      '新しい配列を角括弧 `[]` で作り、その中で `...baseNumbers` を展開します。',
      '書き方は `const allNumbers = [...baseNumbers, 4, 5];` となります。'
    ],
    validate: (code, logs) => {
      const hasSpread = code.includes('...baseNumbers');
      const outputCorrect = logs.some(log => {
        // [1, 2, 3, 4, 5] が含まれるか
        return log.includes('1,2,3,4,5') || log.includes('1, 2, 3, 4, 5');
      });

      if (!hasSpread) {
        return { success: false, message: 'スプレッド構文 `...baseNumbers` が使われていません。' };
      }
      if (!outputCorrect) {
        return { success: false, message: '`allNumbers` の中身が `[1, 2, 3, 4, 5]` になっていません。配列に 4 と 5 を正しく追加できているか確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'array-map',
    title: '7. 配列メソッド map',
    category: 'modern-js',
    description: `配列の要素すべてに同じ処理をして、「新しい配列」を作りたいときは、ループ（\`for\`文）を使わずに **\`map\` メソッド** を使います。

### 基本的な書き方:
\`\`\`javascript
const numbers = [1, 2, 3];
// 各要素を2倍にする
const doubled = numbers.map((num) => num * 2); // [2, 4, 6]
\`\`\`
\`map\` の引数には関数（アロー関数が最適！）を渡します。配列の各要素が順番に関数の引数（上記の \`num\`）に入り、returnされた値で新しい配列が構成されます。

### なぜReactで使われるの？
Reactで「データの配列」を「HTML要素（JSX）の配列」に変換して画面に一覧表示するとき、**100%この \`map\` メソッドを使います**。for文はJSXの中で使えないため、必須中の必須スキルです！`,
    task: `配列 \`prices\` に入っているそれぞれの価格を **1.1倍（消費税10%込み）** に計算した新しい配列 \`taxIncluded\` を、\`map\` メソッドを使って作成してください。
- 小数点以下の誤差を防ぐため、\`Math.round(price * 1.1)\` を使って整数にしてください。`,
    initialCode: `const prices = [100, 200, 300];

// 課題: map メソッドを使って、prices の各要素を
// 1.1倍（消費税10%込み）にした新しい配列「taxIncluded」を作成してください。
// ※ Math.round() で小数点以下を丸めてください。

// ここにコードを記述


console.log("税込価格:", taxIncluded);
`,
    solutionCode: `const prices = [100, 200, 300];

const taxIncluded = prices.map((price) => Math.round(price * 1.1));

console.log("税込価格:", taxIncluded);`,
    hints: [
      '`prices.map(...)` の形式で呼び出します。',
      'アロー関数を使って、各要素を受け取り `Math.round(price * 1.1)` にします。例: `prices.map(price => Math.round(price * 1.1))`'
    ],
    validate: (code, logs) => {
      const hasMap = code.includes('.map(');
      const outputCorrect = logs.some(log => {
        return log.includes('110') && log.includes('220') && log.includes('330');
      });

      if (!hasMap) {
        return { success: false, message: '`map` メソッドが呼び出されていません。`prices.map(...)` を使用してください。' };
      }
      if (!outputCorrect) {
        return { success: false, message: '`taxIncluded` の内容が `[110, 220, 330]` となっていません。計算式を確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'array-filter',
    title: '8. 配列メソッド filter',
    category: 'modern-js',
    description: `配列の中から、特定の条件に合う要素だけを「絞り込んで新しい配列を作る」には、**\`filter\` メソッド** を使います。

### 基本的な書き方:
\`\`\`javascript
const numbers = [1, 2, 3, 4];
// 偶数だけを絞り込む
const evens = numbers.filter((num) => num % 2 === 0); // [2, 4]
\`\`\`
\`filter\` の中身の関数は、条件を判定して **\`true\` または \`false\`** を返す必要があります。\`true\` を返した要素だけが生き残り、新しい配列に入ります。

### なぜReactで使われるの？
TODOアプリで「未完了のタスクだけを表示する」や、「特定のアイテムを削除した後のリストを表示する」など、リストの動的な絞り込み処理に非常によく使われます。`,
    task: `配列 \`ages\` の中から、**18才以上（18を含む）** の数値だけを抽出した新しい配列 \`adults\` を、\`filter\` メソッドを使って作成してください。`,
    initialCode: `const ages = [12, 18, 22, 30, 15, 25];

// 課題: filter メソッドを使って、ages の中から
// 18才以上（18を含む）の数値だけを抽出した新しい配列「adults」を作成してください。

// ここにコードを記述


console.log("成人:", adults);
`,
    solutionCode: `const ages = [12, 18, 22, 30, 15, 25];

const adults = ages.filter((age) => age >= 18);

console.log("成人:", adults);`,
    hints: [
      '`ages.filter(...)` の形式で呼び出します。',
      '18歳以上（18を含む）を判定する比較演算子は `>=` です。アロー関数で書くと、`ages.filter(age => age >= 18)` となります。'
    ],
    validate: (code, logs) => {
      const hasFilter = code.includes('.filter(');
      const outputCorrect = logs.some(log => {
        return log.includes('18,22,30,25') || log.includes('18, 22, 30, 25');
      });

      if (!hasFilter) {
        return { success: false, message: '`filter` メソッドが呼び出されていません。`ages.filter(...)` を使用してください。' };
      }
      if (!outputCorrect) {
        return { success: false, message: '`adults` の内容が `[18, 22, 30, 25]` となっていません。条件式 `age >= 18` が正しいか確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'jsx-intro',
    title: '9. はじめてのJSX (React入門)',
    category: 'react-basic',
    description: `おめでとうございます！ここからいよいよ **React (JSX)** の学習に入ります！

**JSX (JavaScript XML)** は、JavaScriptの中にHTMLのようなコードを直接書けるReact独自の便利な拡張構文です。

### JSXの最も重要な特徴:
JSXの中では、波括弧 \`{}\` を使うことで、**JavaScriptの変数や処理をそのまま埋め込む**ことができます！

\`\`\`jsx
function App() {
  const name = "アリス";
  return (
    <div>
      <h1>こんにちは、{name}さん！</h1>
      <p>1 + 1 の計算結果は {1 + 1} です。</p>
    </div>
  );
}
\`\`\`

JSXを使うことで、HTML（見た目）とJS（ロジック）を1つの「**コンポーネント**（UIパーツ）」として綺麗にまとめることができます。`,
    task: `JSX内にJavaScriptの値を埋め込んでみましょう。
1. \`<h1>\` タグの中身（現在は「タイトルプレースホルダー」）を、定義されている変数 \`title\` の値が表示されるように、\`{}\` を使って書き換えてください。
2. \`<p>\` タグの中身を、変数 \`year\` の値を使って **「現在の西暦: 2026年」** と表示されるように書き換えてください。`,
    initialCode: `// Reactコンポーネントは大文字から始まる関数です。
// JSXを return することで画面に表示されます。
function App() {
  const title = "Reactを学ぼう！";
  const year = 2026;

  // 課題:
  // 1. <h1> の中身を、変数 title の値が表示されるように {} を使って書き換えてください。
  // 2. <p> の中身を「現在の西暦: {year}年」となるように書き換えてください。
  return (
    <div style={{ padding: "20px", background: "#1e1e38", borderRadius: "8px", color: "white" }}>
      <h1>タイトルプレースホルダー</h1>
      <p>現在の西暦: 〇〇年</p>
    </div>
  );
}
`,
    solutionCode: `function App() {
  const title = "Reactを学ぼう！";
  const year = 2026;

  return (
    <div style={{ padding: "20px", background: "#1e1e38", borderRadius: "8px", color: "white" }}>
      <h1>{title}</h1>
      <p>現在の西暦: {year}年</p>
    </div>
  );
}`,
    hints: [
      'HTMLのテキスト部分に変数を入れるには、クォーテーション等を使わず、直接 `{変数名}` と書くだけでOKです。',
      'h1タグは `<h1>{title}</h1>` 、pタグは `<p>現在の西暦: {year}年</p>` と記述します。'
    ],
    validate: (_code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };
      
      const h1Text = previewEl.querySelector('h1')?.textContent || '';
      const pText = previewEl.querySelector('p')?.textContent || '';

      const h1Correct = h1Text.includes('Reactを学ぼう！');
      const pCorrect = pText.includes('現在の西暦: 2026年');

      if (!h1Correct) {
        return { success: false, message: '`<h1>` タグの中に `{title}` が正しく埋め込まれていません。' };
      }
      if (!pCorrect) {
        return { success: false, message: '`<p>` タグの中身が「現在の西暦: 2026年」になっていません。`{year}` の位置を確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'conditional-rendering',
    title: '10. 条件付きレンダリング',
    category: 'react-basic',
    description: `Reactでは、条件によって**表示する内容を切り替える**ことが非常に多いです。例えば「ログイン済みなら名前を表示、未ログインならログインボタンを表示」といった場面です。

### JSX内での条件分岐の方法:

**1. 三項演算子（第5章で学習済み！）**
\`\`\`jsx
{isLoggedIn ? <p>ようこそ！</p> : <p>ログインしてください</p>}
\`\`\`

**2. && 演算子（条件が true の場合だけ表示）**
\`\`\`jsx
{hasNotification && <span>🔔 通知あり</span>}
\`\`\`
\`&&\` の左辺が \`true\` なら右辺のJSXを表示、\`false\` なら何も表示しません。

### なぜ if 文は使えないの？
JSXの \`{}\` の中にはJavaScriptの**式（値を返すもの）**しか書けません。\`if\` は「文（ステートメント）」なので直接書けないのです。`,
    task: `三項演算子と \`&&\` 演算子を使って、条件付きレンダリングを実装してください。
- \`isLoggedIn\` が \`true\` の場合: \`<h2>\` で **「ようこそ、アリスさん！」** と表示
- \`isLoggedIn\` が \`false\` の場合: \`<p>\` で **「ログインしてください」** と表示
- \`hasNotification\` が \`true\` の場合: \`<p>\` で **「🔔 新しい通知があります」** と追加表示`,
    initialCode: `function App() {
  const isLoggedIn = true;
  const userName = "アリス";
  const hasNotification = true;

  // 課題:
  // 1. isLoggedIn の値で表示を切り替えてください（三項演算子を使用）
  //    true → <h2>ようこそ、{userName}さん！</h2>
  //    false → <p>ログインしてください</p>
  // 2. hasNotification が true の場合だけ通知を表示してください（&& 演算子を使用）
  //    <p>🔔 新しい通知があります</p>
  return (
    <div style={{ padding: "20px", background: "#1e1e38", borderRadius: "8px", color: "white" }}>
      <h1>マイページ</h1>

      {/* ここに条件付きレンダリングを記述 */}

    </div>
  );
}
`,
    solutionCode: `function App() {
  const isLoggedIn = true;
  const userName = "アリス";
  const hasNotification = true;

  return (
    <div style={{ padding: "20px", background: "#1e1e38", borderRadius: "8px", color: "white" }}>
      <h1>マイページ</h1>

      {isLoggedIn ? (
        <h2>ようこそ、{userName}さん！</h2>
      ) : (
        <p>ログインしてください</p>
      )}

      {hasNotification && <p>🔔 新しい通知があります</p>}
    </div>
  );
}`,
    hints: [
      '三項演算子は `{条件 ? <要素A /> : <要素B />}` の形でJSX内に書けます。',
      '`&&` 演算子は `{条件 && <表示したい要素 />}` と書くだけでOKです。条件がfalseなら何も表示されません。'
    ],
    validate: (_code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };

      const text = previewEl.textContent || '';
      const hasWelcome = text.includes('ようこそ、アリスさん！');
      const hasNotification = text.includes('新しい通知があります');

      if (!hasWelcome) {
        return { success: false, message: '`<h2>ようこそ、アリスさん！</h2>` が表示されていません。三項演算子を使って isLoggedIn の条件分岐を書いてください。' };
      }
      if (!hasNotification) {
        return { success: false, message: '通知メッセージが表示されていません。`&&` 演算子で hasNotification が true のときだけ表示してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'list-rendering',
    title: '11. リスト表示と key',
    category: 'react-basic',
    description: `第7章で学んだ \`map\` メソッドが、ここでReactの中で大活躍します！
データの配列を**JSX要素の配列に変換**して、リストを画面に表示するのがReactの基本パターンです。

### 基本的な書き方:
\`\`\`jsx
const items = ["りんご", "バナナ", "ぶどう"];

return (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
\`\`\`

### key とは何か？
Reactがリストの各要素を**一意に識別する**ための特別な属性です。\`key\` がないとReactは要素の追加/削除/並べ替えを正しく検出できず、パフォーマンスの低下やバグの原因になります。

### key のルール:
- 兄弟要素間で**一意な値**を使う（IDなど）
- 配列のインデックス（0, 1, 2...）は**非推奨**（並べ替えで壊れる）
- \`key\` はJSXに書くが、\`props\` としてはアクセスできない（React内部用）`,
    task: `\`fruits\` 配列を \`map\` で回して、各フルーツを \`<li>\` タグでリスト表示してください。
- 各 \`<li>\` に \`key={fruit.id}\` を必ず付けてください。
- 表示内容は **「フルーツ名 - 価格円」** の形式にしてください。`,
    initialCode: `function App() {
  const fruits = [
    { id: 1, name: "🍎 りんご", price: 150 },
    { id: 2, name: "🍌 バナナ", price: 100 },
    { id: 3, name: "🍇 ぶどう", price: 300 },
  ];

  // 課題: fruits 配列を .map() で回して、
  // 各フルーツを <li> タグでリスト表示してください。
  // 各 <li> に key={fruit.id} を必ず付けてください。
  return (
    <div style={{ padding: "20px", background: "#111827", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>🛒 フルーツ一覧</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {/* ここに map を使ったリスト表示を記述 */}
      </ul>
    </div>
  );
}
`,
    solutionCode: `function App() {
  const fruits = [
    { id: 1, name: "🍎 りんご", price: 150 },
    { id: 2, name: "🍌 バナナ", price: 100 },
    { id: 3, name: "🍇 ぶどう", price: 300 },
  ];

  return (
    <div style={{ padding: "20px", background: "#111827", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>🛒 フルーツ一覧</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {fruits.map((fruit) => (
          <li key={fruit.id} style={{ padding: "8px", borderBottom: "1px solid #1e293b" }}>
            {fruit.name} - {fruit.price}円
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    hints: [
      'JSXの `{}` 内で `fruits.map((fruit) => ( <li key={fruit.id}>...</li> ))` と書きます。',
      '`key` はReactが要素を識別するための特別な属性です。`fruit.id` のような一意な値を指定してください。'
    ],
    validate: (code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };

      const hasMap = code.includes('.map(');
      const hasKey = code.includes('key=');
      const lis = previewEl.querySelectorAll('li');

      if (!hasMap) {
        return { success: false, message: '`.map()` メソッドを使ってリストを描画してください。' };
      }
      if (!hasKey) {
        return { success: false, message: '各 `<li>` に `key` 属性を追加してください。Reactのリストレンダリングには key が必須です。' };
      }
      if (lis.length < 3) {
        return { success: false, message: 'フルーツが3つ表示されていません。map の中で正しく `<li>` を返しているか確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'components-props',
    title: '12. コンポーネントとProps',
    category: 'react-basic',
    description: `Reactの真の強みは、UIを「**コンポーネント**（独立した部品）」に分解して、何度も再利用できる点にあります。
そして、それぞれの部品に異なるデータを渡して表示を変える仕組みが **\`Props (プロップス)\`** です。

### Propsの渡し方と受け取り方:
1. **親から子へ渡す（HTMLの属性のように書く）**:
   \`\`\`jsx
   <UserProfile name="太郎" age={20} />
   \`\`\`
2. **子で受け取る（関数の引数 \`props\` にオブジェクトとして入ってくる）**:
   \`\`\`jsx
   function UserProfile(props) {
     return <p>名前は {props.name}、年齢は {props.age} です。</p>;
   }
   \`\`\`
   ※ここで第2章で学んだ「分割代入」を使って \`function UserProfile({ name, age })\` のように受け取ることも非常に一般的です！`,
    task: `\`App\` コンポーネント（親）の中から、定義されている \`UserProfile\` コンポーネント（子）を呼び出し、2つのカードを並べて表示してください。
- 1つ目のカード: \`name="アリス"\` 、 \`role="デザイナー"\`
- 2つ目のカード: \`name="ボブ"\` 、 \`role="エンジニア"\`
- コメント \`{/* ここにコードを追加してください */}\` の下に記述しましょう。`,
    initialCode: `// 子コンポーネント UserProfile
// 引数の props（オブジェクト）を受け取ります。
function UserProfile(props) {
  return (
    <div style={{ border: "1px solid #4f46e5", padding: "12px", borderRadius: "6px", margin: "8px 0" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#818cf8" }}>名前: {props.name}</h3>
      <p style={{ margin: "0", color: "#cbd5e1" }}>役割: {props.role}</p>
    </div>
  );
}

// 親コンポーネント
function App() {
  return (
    <div style={{ padding: "20px", background: "#111827", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>チームメンバー紹介</h2>
      
      {/* 課題: 
          UserProfile コンポーネントを2つ配置してください。
          1つ目: name="アリス"、role="デザイナー"
          2つ目: name="ボブ"、role="エンジニア"
       */}
      
      {/* ここにコードを追加してください */}
      
    </div>
  );
}
`,
    solutionCode: `function UserProfile(props) {
  return (
    <div style={{ border: "1px solid #4f46e5", padding: "12px", borderRadius: "6px", margin: "8px 0" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#818cf8" }}>名前: {props.name}</h3>
      <p style={{ margin: "0", color: "#cbd5e1" }}>役割: {props.role}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: "20px", background: "#111827", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>チームメンバー紹介</h2>
      
      <UserProfile name="アリス" role="デザイナー" />
      <UserProfile name="ボブ" role="エンジニア" />
      
    </div>
  );
}`,
    hints: [
      'コンポーネントは、自閉タグ形式 `<UserProfile name="..." role="..." />` で呼び出すことができます。',
      '2つのコンポーネント呼び出しを縦に並べるだけで、自動的に並んで表示されます。'
    ],
    validate: (_code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };

      const text = previewEl.textContent || '';
      const hasAlice = text.includes('名前: アリス') && text.includes('役割: デザイナー');
      const hasBob = text.includes('名前: ボブ') && text.includes('役割: エンジニア');

      if (!hasAlice) {
        return { success: false, message: 'アリスの `UserProfile` コンポーネントが正しく配置されていないか、Propsの値が間違っています。' };
      }
      if (!hasBob) {
        return { success: false, message: 'ボブの `UserProfile` コンポーネントが正しく配置されていないか、Propsの値が間違っています。' };
      }
      return { success: true };
    }
  },
  {
    id: 'component-extraction',
    title: '13. コンポーネントの抽出',
    category: 'react-basic',
    description: `前章ではすでに用意されたコンポーネントを「呼び出す」だけでしたが、本当に大切なのは**「自分で作る」**力です。

### コンポーネント抽出の考え方:
1. コードに**繰り返し**がないか探す
2. 繰り返し部分を新しい関数（コンポーネント）に切り出す
3. 異なる部分を **Props** として外から受け取る

### 分割代入でPropsを受け取る:
前章では \`props.name\` のようにアクセスしましたが、実務では**分割代入**（第3章）を使って直接受け取るのが主流です:
\`\`\`jsx
// 分割代入なし
function Card(props) {
  return <h3>{props.title}</h3>;
}

// 分割代入あり（こちらが主流！）
function Card({ title }) {
  return <h3>{title}</h3>;
}
\`\`\``,
    task: `App内にある3つの繰り返しカード部分を、**\`StatusCard\` コンポーネント**として切り出してください。
- \`StatusCard\` は Props として \`label\`, \`value\`, \`color\` を**分割代入**で受け取ってください。
- App内のカード部分を \`<StatusCard ... />\` の呼び出しに置き換えてください。`,
    initialCode: `// 課題: 下のApp内にある繰り返しのカード部分を
// 「StatusCard」コンポーネントとして切り出してください。
// StatusCard は { label, value, color } を分割代入で受け取ります。

// ここに StatusCard コンポーネントを定義してください


function App() {
  return (
    <div style={{ padding: "20px", background: "#0f172a", borderRadius: "8px", color: "white" }}>
      <h2 style={{ marginBottom: "16px" }}>ダッシュボード</h2>
      <div style={{ display: "flex", gap: "12px" }}>

        <div style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", flex: 1, borderLeft: "4px solid #3b82f6" }}>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px 0" }}>ユーザー数</p>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#3b82f6", margin: 0 }}>1,234</p>
        </div>

        <div style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", flex: 1, borderLeft: "4px solid #10b981" }}>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px 0" }}>売上</p>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", margin: 0 }}>¥56,789</p>
        </div>

        <div style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", flex: 1, borderLeft: "4px solid #f59e0b" }}>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px 0" }}>注文数</p>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#f59e0b", margin: 0 }}>89</p>
        </div>

      </div>
    </div>
  );
}
`,
    solutionCode: `function StatusCard({ label, value, color }) {
  return (
    <div style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", flex: 1, borderLeft: \`4px solid \${color}\` }}>
      <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 4px 0" }}>{label}</p>
      <p style={{ fontSize: "24px", fontWeight: "bold", color: color, margin: 0 }}>{value}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: "20px", background: "#0f172a", borderRadius: "8px", color: "white" }}>
      <h2 style={{ marginBottom: "16px" }}>ダッシュボード</h2>
      <div style={{ display: "flex", gap: "12px" }}>
        <StatusCard label="ユーザー数" value="1,234" color="#3b82f6" />
        <StatusCard label="売上" value="¥56,789" color="#10b981" />
        <StatusCard label="注文数" value="89" color="#f59e0b" />
      </div>
    </div>
  );
}`,
    hints: [
      '`function StatusCard({ label, value, color }) { ... }` のように、引数で分割代入を使ってPropsを受け取ります。',
      'Appの中の3つの `<div>` を `<StatusCard label="..." value="..." color="..." />` に置き換えます。'
    ],
    validate: (code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };

      const hasComponent = /function\s+StatusCard|const\s+StatusCard/.test(code);
      const hasDestructuring = /StatusCard\s*\(\s*\{/.test(code);
      const text = previewEl.textContent || '';

      if (!hasComponent) {
        return { success: false, message: '`StatusCard` コンポーネントが定義されていません。`function StatusCard(...)` を作成してください。' };
      }
      if (!hasDestructuring) {
        return { success: false, message: 'Props を分割代入で受け取ってください。`function StatusCard({ label, value, color })` の形にしましょう。' };
      }
      if (!text.includes('1,234') || !text.includes('56,789') || !text.includes('89')) {
        return { success: false, message: '3つのカードがすべて正しく表示されていません。StatusCard に正しいPropsを渡しているか確認してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'callback-props',
    title: '14. コールバック Props（子→親の通信）',
    category: 'react-basic',
    description: `これまでは「親→子」へデータを渡す方法（Props）を学びました。しかし実際のアプリでは、**「子で起きたイベントを親に伝える」**必要も頻繁にあります。

例：ボタンをクリックした → 親コンポーネントの状態を更新 → 画面が変わる

### 仕組み:
親から子に**関数をPropsとして渡し**、子がその関数を呼び出すだけです！

\`\`\`jsx
// 親
function App() {
  const handleClick = (value) => {
    console.log("子から受け取った値:", value);
  };
  return <ChildButton onClick={handleClick} />;
}

// 子
function ChildButton({ onClick }) {
  return <button onClick={() => onClick("こんにちは！")}>押して</button>;
}
\`\`\`

この「関数を渡して呼んでもらう」パターンを**コールバック Props** と呼びます。`,
    task: `\`ColorButton\` コンポーネントの \`<button>\` に \`onClick\` を設定してください。
- クリック時に \`props.onSelect(props.color)\` を呼び出して、選んだ色を親に伝えましょう。
- 親の \`App\` はすでに \`setSelectedColor\` を \`onSelect\` として渡しています。`,
    initialCode: `function ColorButton(props) {
  // 課題: ボタンがクリックされたときに、
  // props.onSelect を呼び出して props.color を親に伝えてください。
  return (
    <button
      style={{
        background: props.color,
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px"
      }}
    >
      {props.label}
    </button>
  );
}

function App() {
  const [selectedColor, setSelectedColor] = React.useState("まだ選ばれていません");

  return (
    <div style={{ padding: "20px", background: "#18181b", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>好きな色を選んでください</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <ColorButton color="#ef4444" label="赤" onSelect={setSelectedColor} />
        <ColorButton color="#3b82f6" label="青" onSelect={setSelectedColor} />
        <ColorButton color="#10b981" label="緑" onSelect={setSelectedColor} />
      </div>
      <p style={{ fontSize: "18px" }}>選択中: <strong>{selectedColor}</strong></p>
    </div>
  );
}
`,
    solutionCode: `function ColorButton(props) {
  return (
    <button
      onClick={() => props.onSelect(props.color)}
      style={{
        background: props.color,
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px"
      }}
    >
      {props.label}
    </button>
  );
}

function App() {
  const [selectedColor, setSelectedColor] = React.useState("まだ選ばれていません");

  return (
    <div style={{ padding: "20px", background: "#18181b", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>好きな色を選んでください</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <ColorButton color="#ef4444" label="赤" onSelect={setSelectedColor} />
        <ColorButton color="#3b82f6" label="青" onSelect={setSelectedColor} />
        <ColorButton color="#10b981" label="緑" onSelect={setSelectedColor} />
      </div>
      <p style={{ fontSize: "18px" }}>選択中: <strong>{selectedColor}</strong></p>
    </div>
  );
}`,
    hints: [
      'ボタンに `onClick={() => props.onSelect(props.color)}` を追加するだけです。',
      'アロー関数で包んで呼び出すのがポイントです。`onClick={props.onSelect(props.color)}` だとレンダリング時に即実行されてしまうので注意。'
    ],
    validate: (code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };

      const hasOnClick = /onClick\s*=\s*\{/.test(code);
      const hasOnSelect = code.includes('onSelect');
      const text = previewEl.textContent || '';

      if (!hasOnClick) {
        return { success: false, message: 'ColorButton の `<button>` に `onClick` が設定されていません。' };
      }
      if (!hasOnSelect) {
        return { success: false, message: '`props.onSelect` を呼び出して色を親に伝えてください。' };
      }
      if (!text.includes('選択中:')) {
        return { success: false, message: '画面が正しくレンダリングされていません。' };
      }
      return { success: true };
    }
  },
  {
    id: 'state-usestate',
    title: '15. State (状態) と useState',
    category: 'react-basic',
    description: `Reactで「画面をクリックしたら数字が増える」「テキストボックスに入力したら即座に表示に反映される」といった、動的に変化するデータを扱う仕組みを **\`State (状態)\`** と呼びます。

Stateを使うには、Reactが提供する **\`useState\`** という「フック」を使用します。

### 基本的な書き方:
\`\`\`javascript
const [value, setValue] = React.useState(0);
\`\`\`
- \`value\`: 現在の値（読み取り専用の変数）
- \`setValue\`: 値をアップデートするための関数（書き込み用の関数）
- \`React.useState(0)\`: 初期値を「0」としてStateを定義

### 重要ルール:
\`value = 10;\` のように**変数を直接書き換えてはいけません**。必ず \`setValue(10);\` を通して更新します。こうすることで、Reactは「あ、値が変わったから画面を再描画（レンダリング）しなきゃ！」と感知し、画面を自動的にアップデートします。`,
    task: `ボタンをクリックすると、数字が1ずつ増えるカウンターアプリを作成しましょう！
1. コンポーネントの先頭部分で、\`useState\` を使って状態 \`count\` （初期値: 0）と更新関数 \`setCount\` を定義してください。
2. JSX内の \`{/* ここに count を表示 */}\` の部分に、変数 \`count\` を埋め込んでください。
3. \`<button>\` に \`onClick\` 属性を設定し、クリックされたときに関数 \`setCount\` を使って \`count + 1\` を実行するようにアロー関数を指定してください。 (例: \`onClick={() => setCount(count + 1)}\`)`,
    initialCode: `// useState を使って状態（変化するデータ）を管理します。
// React.useState(初期値) で [現在の値, 更新用関数] が得られます。
function App() {
  // 課題:
  // 1. カウントの値を管理するState「count」を定義してください（初期値は 0）。
  // 2. ボタンをクリックしたときに count が 1 増えるように onClick を設定してください。
  
  // ここにStateを定義する
  
  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#0f172a", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>カウンターアプリ</h2>
      
      <p style={{ fontSize: "24px", fontWeight: "bold", margin: "16px 0" }}>
        現在の値: {/* ここに count を表示 */}
      </p>
      
      <button 
        style={{ 
          background: "#4f46e5", 
          color: "white", 
          border: "none", 
          padding: "10px 20px", 
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold"
        }}
        // ここに onClick を追加
      >
        カウントアップ！
      </button>
    </div>
  );
}
`,
    solutionCode: `function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#0f172a", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>カウンターアプリ</h2>
      
      <p style={{ fontSize: "24px", fontWeight: "bold", margin: "16px 0" }}>
        現在の値: {count}
      </p>
      
      <button 
        onClick={() => setCount(count + 1)}
        style={{ 
          background: "#4f46e5", 
          color: "white", 
          border: "none", 
          padding: "10px 20px", 
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        カウントアップ！
      </button>
    </div>
  );
}`,
    hints: [
      'Stateの定義は、関数 App の中の最初の一行で行います: `const [count, setCount] = React.useState(0);` です。',
      'ボタンへのクリックイベント設定は `<button onClick={() => setCount(count + 1)}>` のようにアロー関数を渡すのがポイントです。'
    ],
    validate: (code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };

      const hasState = code.includes('useState') && code.includes('count') && code.includes('setCount');
      const hasOnClick = code.includes('onClick');
      const hasSetCountCall = /setCount\s*\(\s*count\s*\+\s*1\s*\)/.test(code) || /setCount\s*\(\s*\(\s*\w+\s*\)\s*=>\s*\w+\s*\+\s*1\s*\)/.test(code) || /setCount\s*\(\s*prev\s*=>\s*prev\s*\+\s*1\s*\)/.test(code);
      const button = previewEl.querySelector('button');
      const textEl = previewEl.querySelector('p');

      if (!hasState) {
        return { success: false, message: '`React.useState` を使って `count` と `setCount` を定義してください。' };
      }
      if (!button || !textEl) {
        return { success: false, message: '画面上にボタンまたはテキストが見つかりません。' };
      }

      const initialText = textEl.textContent || '';
      if (!initialText.includes('0')) {
        return { success: false, message: '初期状態のカウント「0」が表示されていません。`{count}` が正しく埋め込まれているか確認してください。' };
      }

      if (!hasOnClick) {
        return { success: false, message: 'ボタンに `onClick` 属性が設定されていません。' };
      }

      if (!hasSetCountCall) {
        return { success: false, message: '`onClick` の中で `setCount(count + 1)` が呼び出されていません。' };
      }

      return { success: true };
    }
  },
  {
    id: 'form-controlled',
    title: '16. フォーム入力と制御コンポーネント',
    category: 'react-basic',
    description: `実際のWebアプリでは、ユーザーがテキストを入力する「フォーム」が必ず登場します。Reactでは、入力欄の値を**Stateで管理する**のが基本です。これを「制御コンポーネント」と呼びます。

### 制御コンポーネントの仕組み:
\`\`\`jsx
const [text, setText] = React.useState("");

<input
  value={text}                         // State を表示
  onChange={(e) => setText(e.target.value)}  // 入力を State に反映
/>
\`\`\`

### ポイント:
- \`value={state}\` → 入力欄の表示値をStateで制御
- \`onChange={(e) => setState(e.target.value)}\` → キー入力のたびにStateを更新
- この2つをセットで書くのが「制御コンポーネント」のパターン

### 応用: リアルタイム検索フィルタ
入力値で配列を \`filter\` すれば、リアルタイム検索が作れます。これまでに学んだ \`useState\`、\`filter\`、\`map\`、\`key\` がすべて活きる実践課題です！`,
    task: `\`<input>\` に \`value\` と \`onChange\` を設定して、検索フィルタを完成させてください。
- \`value\` には \`searchText\` を、\`onChange\` では \`setSearchText(e.target.value)\` を呼び出してください。
- \`items\` を \`searchText\` でフィルタリングして表示してください（\`.filter()\` と \`.toLowerCase()\` を使用）。`,
    initialCode: `function App() {
  const [searchText, setSearchText] = React.useState("");

  const items = ["React", "Vue", "Angular", "Svelte", "Next.js"];

  // 課題:
  // 1. <input> の value に searchText を、
  //    onChange に setSearchText(e.target.value) を設定
  // 2. items を searchText でフィルタリングして表示
  //    ヒント: item.toLowerCase().includes(searchText.toLowerCase())

  return (
    <div style={{ padding: "20px", background: "#0f172a", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>🔍 フレームワーク検索</h2>
      <input
        type="text"
        placeholder="検索..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #374151",
          background: "#1e293b",
          color: "white",
          fontSize: "14px",
          marginBottom: "16px",
          outline: "none"
        }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item} style={{ padding: "8px 12px", borderBottom: "1px solid #1e293b", fontSize: "15px" }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
`,
    solutionCode: `function App() {
  const [searchText, setSearchText] = React.useState("");

  const items = ["React", "Vue", "Angular", "Svelte", "Next.js"];
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", background: "#0f172a", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>🔍 フレームワーク検索</h2>
      <input
        type="text"
        placeholder="検索..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #374151",
          background: "#1e293b",
          color: "white",
          fontSize: "14px",
          marginBottom: "16px",
          outline: "none"
        }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredItems.map((item) => (
          <li key={item} style={{ padding: "8px 12px", borderBottom: "1px solid #1e293b", fontSize: "15px" }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`,
    hints: [
      '`<input value={searchText} onChange={(e) => setSearchText(e.target.value)} />` の形が基本です。',
      '`const filteredItems = items.filter(item => item.toLowerCase().includes(searchText.toLowerCase()));` で検索し、`filteredItems.map(...)` で表示します。'
    ],
    validate: (code, _logs, previewEl) => {
      if (!previewEl) return { success: false, message: 'プレビューがレンダリングされていません。' };

      const hasValue = /value\s*=\s*\{\s*searchText\s*\}/.test(code);
      const hasOnChange = code.includes('onChange');
      const hasFilter = code.includes('.filter(');

      if (!hasValue) {
        return { success: false, message: '`<input>` の `value` に `searchText` を設定してください。' };
      }
      if (!hasOnChange) {
        return { success: false, message: '`<input>` に `onChange` イベントハンドラが設定されていません。' };
      }
      if (!hasFilter) {
        return { success: false, message: '`.filter()` を使って items を検索テキストで絞り込んでください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'useeffect-basics',
    title: '17. 副作用フック useEffect (最終章)',
    category: 'react-basic',
    description: `最後のレッスンは **\`useEffect\`** フックです！
\`useEffect\` は、コンポーネントが画面に表示された瞬間（マウント）や、特定の変数が変更された瞬間に、自動的に特定の「副作用（処理）」を実行するための仕組みです。

### 基本的な書き方:
\`\`\`javascript
React.useEffect(() => {
  console.log("画面に表示されました！");

  // オプション: クリーンアップ処理（片付け処理）
  return () => {
    console.log("画面から消えました！");
  };
}, [依存する変数]);
\`\`\`

### 依存配列（第2引数の \`[]\`）のルール:
- \`[]\` (空配列): コンポーネントが**最初の1回だけ表示された時**に実行されます（初期のAPIデータ取得などに使います）。
- \`[count]\`: \`count\` の値が**変わるたび**に実行されます。
- 指定しない（省略）: 画面が少しでも再描画されるたびに毎回実行されます（基本は配列を指定します）。

### なぜクリーンアップ（return）が必要なの？
タイマーやチャットなどのリアルタイム接続（WebSocketなど）は、コンポーネントが消えた時に「片付け」をしないと、裏でずっと動き続けてアプリが重くなったりバグを引き起こす（メモリリーク）ため、\`return () => { clearInterval(id); }\` などの片付け処理を返します。`,
    task: `画面が表示されたら自動的に動き始めるタイマー（1秒ごとに \`seconds\` が1増える）を実装しましょう。
1. \`useEffect\` の中で、JavaScript標準の \`setInterval\` を使って、1秒ごと（1000ミリ秒）に \`setSeconds(s => s + 1)\` を呼び出すタイマーを作成してください。
   (※ヒント: Stateの更新関数に \`setSeconds(prev => prev + 1)\` のように「前回の値を受け取って＋1する関数」を渡すと、古いState値に依存しない正確なタイマーが作れます！)
2. \`useEffect\` のクリーンアップ処理（\`return\` するアロー関数）として、作成したタイマーを \`clearInterval\` でクリアしてください。`,
    initialCode: `function App() {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);

  // 課題:
  // useEffect を使って、isRunning が true の間、
  // 1秒ごとに seconds が 1 ずつ増えるタイマーを実装してください。
  // ※クリーンアップ処理（clearInterval）も忘れないようにしましょう！

  React.useEffect(() => {
    // 1. isRunning が false なら何もせず終了します。
    if (!isRunning) return;

    // 2. 1秒ごとに実行される setInterval を作成します。
    // const timerId = setInterval(...)
    
    // 3. クリーンアップ関数を return して clearInterval します。
    // return () => ...

  }, [isRunning]); // 依存配列に isRunning を指定

  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#18181b", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>1秒タイマー</h2>
      <p style={{ fontSize: "32px", fontFamily: "monospace", fontWeight: "bold", margin: "16px 0" }}>
        {seconds} 秒経過
      </p>
      
      <button 
        onClick={() => setIsRunning(!isRunning)}
        style={{ 
          background: isRunning ? "#ef4444" : "#22c55e", 
          color: "white", 
          border: "none", 
          padding: "8px 16px", 
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          marginRight: "8px",
          fontWeight: "bold"
        }}
      >
        {isRunning ? "一時停止" : "再開"}
      </button>
      <button 
        onClick={() => setSeconds(0)}
        style={{ 
          background: "#4b5563", 
          color: "white", 
          border: "none", 
          padding: "8px 16px", 
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold"
        }}
      >
        リセット
      </button>
    </div>
  );
}
`,
    solutionCode: `function App() {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);

  React.useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  return (
    <div style={{ padding: "20px", textAlign: "center", background: "#18181b", borderRadius: "8px", color: "white" }}>
      <h2 style={{ margin: "0 0 16px 0" }}>1秒タイマー</h2>
      <p style={{ fontSize: "32px", fontFamily: "monospace", fontWeight: "bold", margin: "16px 0" }}>
        {seconds} 秒経過
      </p>
      
      <button 
        onClick={() => setIsRunning(!isRunning)}
        style={{ 
          background: isRunning ? "#ef4444" : "#22c55e", 
          color: "white", 
          border: "none", 
          padding: "8px 16px", 
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          marginRight: "8px",
          fontWeight: "bold"
        }}
      >
        {isRunning ? "一時停止" : "再開"}
      </button>
      <button 
        onClick={() => setSeconds(0)}
        style={{ 
          background: "#4b5563", 
          color: "white", 
          border: "none", 
          padding: "8px 16px", 
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold"
        }}
      >
        リセット
      </button>
    </div>
  );
}`,
    hints: [
      'setInterval の中で、`setSeconds(prev => prev + 1)` もしくは `setSeconds(s => s + 1)` と書くことで、最新の状態に安全にアクセスできます。',
      'useEffectから関数を return すると、それがクリーンアップ関数になります。例: `return () => { clearInterval(timerId); };` と書きます。'
    ],
    validate: (code, _logs, _previewEl) => {
      const hasEffect = code.includes('useEffect');
      const hasInterval = code.includes('setInterval');
      const hasClear = code.includes('clearInterval');

      if (!hasEffect) {
        return { success: false, message: '`React.useEffect` フックを使用してください。' };
      }
      if (!hasInterval) {
        return { success: false, message: '時間経過のために `setInterval` を記述してください。' };
      }
      if (!hasClear) {
        return { success: false, message: '`clearInterval` をクリーンアップ時に呼び出してください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'children-prop',
    title: '18. children（マトリョーシカ構造）',
    category: 'react-basic',
    description: `Reactでは、コンポーネントの中に別のコンポーネントやHTMLタグを「挟み込む」ことができます。

本物のマトリョーシカのように、コンポーネントを入れ子（ネスト）にして扱いたい時に使うのが、特別なPropsである **\`children\`** です。

### 使い方：
枠組みとなるコンポーネント（器）側で、\`props.children\`（または分割代入の \`children\`）を配置します。

\`\`\`jsx
function BorderBox({ children }) {
  return (
    <div style={{ border: "2px solid var(--primary)", padding: "12px" }}>
      {children} {/* ここに、挟み込まれたコンテンツが入ります！ */}
    </div>
  );
}
\`\`\`

これを使うと、別の場所で以下のように囲むだけで、中身を自由に入れ替えることができます！

\`\`\`jsx
function App() {
  return (
    <BorderBox>
      <h3>こんにちは！</h3>
      <p>このように好きなタグを中に挟み込めます。</p>
    </BorderBox>
  );
}
\`\`\`

外枠の「器（BorderBox）」と、内側の「中身（h3 や p）」を完全に分けることができるため、カードレイアウト、モーダル、ダイアログなどの「共通の枠」をきれいに作る際に必須のパターンです。`,
    task: `外枠となる \`Card\` コンポーネントを完成させてください。
1. \`Card\` コンポーネントが、Propsとして受け取った **\`children\`** を \`<div style={{...}}>\` の中で正しくレンダリングできるようにしてください。
2. その後、\`App\` コンポーネントの中で \`<Card>\` を使用し、好きな絵文字やタイトルを挟み込んでみてください。`,
    initialCode: `// 課題: children を使って、中身を自由に挟み込めるマトリョーシカ・コンポーネントを作ってください。

function Card({ children }) {
  // TODO: ここを修正して、受け取った children を div の中でレンダリングしてください。
  return (
    <div style={{
      background: "var(--bg-panel-light)",
      border: "2px dashed var(--primary-light)",
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center"
    }}>
      {/* ここに children を入れてください */}
    </div>
  );
}

function App() {
  return (
    <div>
      {/* TODO: Card で、絵文字やタイトルを挟み込んでマトリョーシカ構造にしてください。 */}
      <Card>
        <span style={{ fontSize: "40px" }}>🔥</span>
        <h3 style={{ margin: "12px 0 0" }}>マトリョーシカ成功！</h3>
      </Card>
    </div>
  );
}

// レンダリングのためのエクスポート
export default App;`,
    solutionCode: `function Card({ children }) {
  return (
    <div style={{
      background: "var(--bg-panel-light)",
      border: "2px dashed var(--primary-light)",
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center"
    }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <div>
      <Card>
        <span style={{ fontSize: "40px" }}>🔥</span>
        <h3 style={{ margin: "12px 0 0" }}>マトリョーシカ成功！</h3>
      </Card>
    </div>
  );
}

export default App;`,
    hints: [
      'Cardコンポーネントの引数で `{ children }`（分割代入）として受け取ります。',
      'Cardコンポーネントを呼び出す際、`<Card> 中身 </Card>` のようにダブルタグで囲むことで、挟まれた部分が `children` として渡されます。'
    ],
    validate: (code, _logs, previewEl) => {
      const hasChildrenParam = code.includes('children');
      const hasChildrenInJSX = /\{children\}/.test(code) || /props\.children/.test(code);
      const isRendered = previewEl && previewEl.textContent?.includes('マトリョーシカ成功！');

      if (!hasChildrenParam) {
        return { success: false, message: '`Card` の引数で `children` を受け取ってください。' };
      }
      if (!hasChildrenInJSX) {
        return { success: false, message: '`Card` のJSXの中で `{children}` をレンダリングしてください。' };
      }
      if (!isRendered) {
        return { success: false, message: '`Card` を使って、絵文字やタイトルをタグで挟み込んでレンダリングしてください。' };
      }
      return { success: true };
    }
  },
  {
    id: 'use-context',
    title: '19. useContext（データのワープ）',
    category: 'react-basic',
    description: `コンポーネントの階層が深く（親 ➔ 子 ➔ 孫...）なっていくと、最深部のコンポーネントにデータを渡すために、関係ない中間のコンポーネントにもPropsを書き続ける必要が出てきます（これを **Props Drilling / バケツリレー** と呼びます）。

これを一瞬できれいに解決するのが **Context API (useContext)** です。

Contextを使うと、親コンポーネントから、どんなに深い場所にある孫コンポーネントへも、**中継コンポーネントを介さずに直接データを「ワープ」させる**ことができます！

### 3つのステップ：
1. **Context（トンネル）を作る**:
   \`\`\`javascript
   const MyContext = React.createContext(初期値);
   \`\`\`
2. **Provider（入り口）で囲み、現在値を流し込む**:
   \`\`\`jsx
   <MyContext.Provider value={value}>
     {/* ここに含まれるすべてのコンポーネントが対象 */}
   </MyContext.Provider>
   \`\`\`
3. **useContext（出口）でデータを吸い上げる**:
   \`\`\`jsx
   const value = React.useContext(MyContext);
   \`\`\`

これにより、中間のコンポーネントはPropsを一切受け取らずに、最深部のコンポーネントだけが欲しいデータをピンポイントで取得できるようになります。`,
    task: `テーマ（\`theme\`）情報を深くネストされたボタンコンポーネントにワープさせましょう。
1. 最深部にある \`ThemeButton\` の中で **\`React.useContext\`** を使い、アプリ全体に共有されている \`ThemeContext\` から現在のテーマを読み取ってください。
2. 取得したテーマ情報を \`theme\` 定数に代入し、ボタンの表示やスタイルが現在のテーマ（'light' または 'dark'）と同期するようにしてください。`,
    initialCode: `// 1. コンテキスト（トンネル）を作ります。初期値は 'light'
const ThemeContext = React.createContext('light');

function App() {
  const [theme, setTheme] = React.useState('dark'); // テーマ状態

  return (
    // 2. Provider でアプリを囲み、現在値を流し込みます
    <ThemeContext.Provider value={theme}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h3 style={{ margin: '0 0 12px' }}>テーマ切り替えコンテキスト</h3>
        <button 
          onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          style={{ 
            marginBottom: '20px', 
            padding: '8px 16px', 
            cursor: 'pointer',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          テーマを切り替える (現在: {theme})
        </button>
        
        <MiddleComponent />
      </div>
    </ThemeContext.Provider>
  );
}

// 中間コンポーネント（Props は一切受け取りません！）
function MiddleComponent() {
  return (
    <div style={{ border: '2px solid var(--border-color)', padding: '20px', borderRadius: '12px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '0 0 16px' }}>
        ※ 私はPropsを中継していません（バケツリレーなし）
      </p>
      <ThemeButton />
    </div>
  );
}

// 最深部コンポーネント（ここでContextからデータを吸い上げます）
function ThemeButton() {
  // TODO: React.useContext を使って ThemeContext から値を取得してください。
  const theme = "light"; // ここを React.useContext(ThemeContext) に書き換えてください。

  const isDark = theme === 'dark';

  return (
    <button style={{
      background: isDark ? '#f3f4f6' : '#1f2937',
      color: isDark ? '#1f2937' : '#f3f4f6',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s'
    }}>
      {isDark ? '🎨 ライトモードにする' : '🌙 ダークモードにする'}
    </button>
  );
}

export default App;`,
    solutionCode: `const ThemeContext = React.createContext('light');

function App() {
  const [theme, setTheme] = React.useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h3 style={{ margin: '0 0 12px' }}>テーマ切り替えコンテキスト</h3>
        <button 
          onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          style={{ 
            marginBottom: '20px', 
            padding: '8px 16px', 
            cursor: 'pointer',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          テーマを切り替える (現在: {theme})
        </button>
        
        <MiddleComponent />
      </div>
    </ThemeContext.Provider>
  );
}

function MiddleComponent() {
  return (
    <div style={{ border: '2px solid var(--border-color)', padding: '20px', borderRadius: '12px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '0 0 16px' }}>
        ※ 私はPropsを中継していません（バケツリレーなし）
      </p>
      <ThemeButton />
    </div>
  );
}

function ThemeButton() {
  const theme = React.useContext(ThemeContext);

  const isDark = theme === 'dark';

  return (
    <button style={{
      background: isDark ? '#f3f4f6' : '#1f2937',
      color: isDark ? '#1f2937' : '#f3f4f6',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s'
    }}>
      {isDark ? '🎨 ライトモードにする' : '🌙 ダークモードにする'}
    </button>
  );
}

export default App;`,
    hints: [
      'ThemeButton の中で、`const theme = React.useContext(ThemeContext);` と記述します。',
      'これで、どれだけネストが深くても親の `<ThemeContext.Provider value={theme}>` から渡された値を直接吸い上げることができます。'
    ],
    validate: (code, _logs, _previewEl) => {
      const hasUseContext = code.includes('useContext(ThemeContext)') || code.includes('React.useContext(ThemeContext)');

      if (!hasUseContext) {
        return { success: false, message: '`React.useContext(ThemeContext)` を使って、テーマの値を取得してください。' };
      }
      return { success: true };
    }
  }
];
