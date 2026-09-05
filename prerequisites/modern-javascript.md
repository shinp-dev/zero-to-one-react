# React前に必要なモダンJavaScript

React本編で頻繁に使うJavaScriptだけを確認します。全部暗記する必要はありません。

## 1. const / let

基本は`const`、再代入が必要なときだけ`let`です。

```js
const name = 'Aki';
let count = 0;
count += 1;
```

`const`はオブジェクト内部まで不変にする機能ではありません。

```js
const user = { name: 'Aki' };
user.name = 'Mika'; // 可能
```

Reactではstateを直接変更しないため、後述するspread構文で新しい値を作ることが重要です。

## 2. Arrow Function

```js
const add = (a, b) => a + b;
const names = users.map((user) => user.name);
```

ただし`function`が古いわけではありません。Reactのcomponentも次のどちらでも書けます。

```js
function Greeting() {}
const Greeting = () => {};
```

## 3. 分割代入

```js
const user = { name: 'Aki', age: 20 };
const { name, age } = user;
```

Propsを受け取るときによく使います。

## 4. Spread

```js
const nextUser = { ...user, age: 21 };
const nextItems = [...items, newItem];
```

Reactでは既存のstateを直接変更せず、新しいarray / objectを作るときに使います。

## 5. map / filter

```js
const names = users.map((user) => user.name);
const activeUsers = users.filter((user) => user.active);
```

Reactでは配列からJSXを作るときに`map`、表示対象を絞るときに`filter`をよく使います。

## 6. 条件式

```js
const label = isLoggedIn ? 'ログアウト' : 'ログイン';
const visible = items.filter((item) => item.active);
```

JSX内でも通常のJavaScript式を使います。

## 7. ES Modules

```js
export function Button() {}
import { Button } from './Button';
```

Reactのcomponentは通常ファイルに分け、`import` / `export`で組み合わせます。

## 確認

次を説明できればReact本編へ進んで構いません。

- `const`と`let`の違い
- `map`と`filter`の違い
- `{ ...obj, x: 1 }`が何をしているか
- `import` / `export`が何のためにあるか
