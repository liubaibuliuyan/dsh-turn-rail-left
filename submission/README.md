# 投稿文件

> **状态：待提交** —— 仓库推到 GitHub 并打上 `dsh-plugin` topic 之后，
> 由仓库创建满 1 天再开 PR（上游 CI 会拒掉不满 1 天的仓库）。
>
> DSH 插件广场（`realguan/dsh-plugin-market`）的条目数据来自 awesome-dsh-plugin，
> 索引每天 03:17 UTC 自动重建，所以**进列表是出现在广场里的第一步**。

## 怎么提交

把 `liubaibuliuyan__dsh-turn-rail-left.yml` 放到上游仓库 `awesome-dsh-plugin/awesome-dsh-plugin`
的 `data/plugins/` 目录下，文件名必须是 `<owner>__<repo>.yml`，然后开 PR。
一个文件就是全部投稿，README 由上游脚本生成。

## 上游的硬性条件（逐条对照）

| 条件 | 我们的状态 |
|---|---|
| `package.json` 声明 `dsh.bundle` manifest | ✅ `"dsh": { "bundle": { "patch": "./cordis.patch.yml" } }` |
| 仓库有真实可用的代码 | ✅ 宿主半身 + 客户端模块，`npm test` 32 项自测 |
| 仓库创建满 **1 天** | ⏳ 待 PUSH 后计时 |
| 打上 `dsh-plugin` topic | ⏳ 建库时设置 |
| `description.en` 必填、以句号结尾 | ✅ 已写，句末有 `.` |
| `icon` 可选，须是 GitHub 托管的**位图** | ✅ `assets/icon-180.png`（180×180 PNG，SVG 不被接受） |

## 时间线

1. 推仓库 → 打 topic → 建 Release
2. 仓库满 1 天后开 PR（`data/plugins/liubaibuliuyan__dsh-turn-rail-left.yml`）
3. 合并后上游自动重新生成 README
4. 广场索引下次重建（每天 03:17 UTC）后，在 DSH 的 **插件 → 发现** 里就能搜到
