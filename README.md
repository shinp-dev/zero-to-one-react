# Zero to One React

React未経験の学生が、**「Hooksの書き方を暗記する」のではなく、UI・Props・State・イベント・Effectの役割を判断できるようになる**ための日本語教材です。

旧版のブラウザ内Playground / Monaco Editor / Babel実行環境 / 自動採点は廃止しました。学生は普通の **Vite + React + TypeScript** プロジェクトをVS Code等で編集し、ブラウザとDevToolsで動作を確認します。

本教材は2026年9月時点のReact公式ドキュメントとVite 8系を基準にしています。

## 対象

- HTML / CSSの基礎を知っている
- JavaScriptの基本的な変数・関数・配列を知っている
- Reactは未経験

モダンJavaScriptやTypeScriptに不安がある場合は先に以下を確認してください。

- [React前に必要なモダンJavaScript](prerequisites/modern-javascript.md)
- [Reactで使う最小限のTypeScript](prerequisites/typescript-for-react.md)

## 0. 練習プロジェクトを作る

React公式は、Reactの基礎を学ぶ目的ならscratchからアプリを作る方法も案内しています。本教材では仕組みを見やすくするためViteを使います。

```bash
npm create vite@latest react-practice -- --template react-ts
cd react-practice
npm install
npm run dev
```

Vite 8はNode.js 20.19+または22.12+を必要とします。授業環境では **Node.js 24 LTS推奨** とします。

> Create React Appは使用しません。React公式でもdeprecatedです。

## 学習順序

| 章 | テーマ | ゴール |
|---|---|---|
| [00](curriculum/00_why_react.md) | Reactは何を解決する？ | DOM直接操作との違いを説明できる |
| [01](curriculum/01_jsx.md) | JSX | データからUIを記述できる |
| [02](curriculum/02_components.md) | Components | UIを部品へ分けられる |
| [03](curriculum/03_props.md) | Props | 親から子へデータを渡せる |
| [04](curriculum/04_conditional_list_key.md) | 条件・List・key | 配列から安定したUIを生成できる |
| [05](curriculum/05_events.md) | Events | ユーザー操作に応答できる |
| [06](curriculum/06_state.md) | State / useState | UIが覚える値を扱える |
| [07](curriculum/07_state_snapshot.md) | Stateはsnapshot | 更新直後の値を誤解しない |
| [08](curriculum/08_state_design.md) | State設計 | 必要最小限のstateを選べる |
| [09](curriculum/09_sharing_state.md) | Sharing State | stateを適切な共通親へ移せる |
| [10](curriculum/10_forms.md) | Forms | 入力値をstateと接続できる |
| [11](curriculum/11_composition.md) | Composition / children | 部品を組み合わせて設計できる |
| [12](curriculum/12_context.md) | Context | Propsとの使い分けを判断できる |
| [13](curriculum/13_you_might_not_need_effect.md) | Effectはいらない？ | render / event / Effectを区別できる |
| [14](curriculum/14_effect.md) | Effect | 外部システムと安全に同期できる |
| [15](curriculum/15_final_workshop.md) | 総合演習 | 小さなReactアプリを設計できる |

## この教材で一番大事な6つ

```text
1. UIは props / state から計算される
2. stateは必要最小限にする
3. stateは「そのレンダー時点のsnapshot」
4. 同じstateを共有したいなら共通の親へ持ち上げる
5. ユーザー操作はevent handlerで扱う
6. Effectは外部システムとの同期に使う
```

Reactを覚えるというより、**どこに何を書くべきか判断する**ための教材です。

## 各章の進め方

1. 今日のゴールを読む
2. `react-practice/src/App.tsx`を編集する
3. ブラウザで見た目と挙動を確認する
4. React DevTools / Browser DevToolsで状態やエラーを見る
5. 「なぜこのstateはここにあるのか」を1文で説明する
6. 必要なら[examples](examples/README.md)と比較する

## AIを使うときのルール

AIによるコード生成は禁止しません。ただし、生成されたコードについて最低限次を説明できる状態にしてください。

- どのコンポーネントがどのstateを所有しているか
- その値は本当にstateである必要があるか
- Propsはどちら向きに流れているか
- その処理はrender / event / Effectのどこに置くべきか
- Effectがある場合、同期している外部システムは何か

AIが`useEffect`やstateを増やしたときは、**本当に必要かを疑う**のが基本です。

## Examples

[examples/README.md](examples/README.md) に重要概念の最小例を置いています。まず自分で実装してから比較してください。

## 公式資料

- React Learn: https://react.dev/learn
- React Installation: https://react.dev/learn/installation
- Thinking in React: https://react.dev/learn/thinking-in-react
- You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
- Vite Getting Started: https://vite.dev/guide/

監査基準は [reference/sources.md](reference/sources.md) にまとめています。

## License

[MIT License](LICENSE)
