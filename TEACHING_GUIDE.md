# Teaching Guide

この教材は自習でも使えますが、授業では「コードを完成させること」より**設計判断を言語化すること**を重視します。

## 6回で扱う例

| 回 | 範囲 | 中心テーマ |
|---|---|---|
| 1 | 00〜03 | React / JSX / Component / Props |
| 2 | 04〜06 | List / Event / State |
| 3 | 07〜09 | Snapshot / State設計 / Sharing State |
| 4 | 10〜12 | Form / Composition / Context |
| 5 | 13〜14 | Effectを使わない判断 / Effect |
| 6 | 15 | 総合演習と設計説明 |

## 授業中に毎回聞くとよい質問

- その値はなぜStateなのか
- Propsから計算できないか
- Stateを1つ上へ移すと何が変わるか
- この処理は何が原因で実行されるのか
- Effectなら外部システムは何か

## コードレビュー観点

### 良い兆候

- Stateが少ない
- 派生値をrender中に計算している
- State ownerが説明できる
- Propsの流れが追える
- Event handlerがユーザー操作と対応している
- Effectに明確な外部同期先がある

### 要確認

- 同じ意味のStateが複数ある
- PropsをStateへコピーして同期している
- `useEffect`内で別Stateを更新しているだけ
- array/objectを直接mutationしている
- Contextが単なるProps回避のために乱用されている
- `any`で型エラーを消している

## AI利用

AIで実装した場合、提出時に最低1か所「AI案から削ったState / Effect / Component」または「AI案を採用した理由」を説明させると、生成結果を読む訓練になります。

## 採点例

動作だけでなく次を評価できます。

- 40%: 必要機能が動く
- 20%: State設計
- 15%: Component / Props設計
- 15%: render / event / Effectの使い分け
- 10%: 説明・デバッグ
