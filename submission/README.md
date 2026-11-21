# 投稿文件（已提交）

> **状态：PR 已开** → https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/17436
>
> 唯一待过的门槛是**仓库年龄 1 天**：仓库建于 2026-11-21，PR 是当天开的，
> 首次 gate 会以「太新」拒绝；按 contributing 的说明这个结论是快照、会自动重跑，
> 几小时后自行达标，不需要推空提交去重触发。
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
| 仓库创建满 **1 天** | ⏳ 2026-11-21 建库，当天提交；gate 自动重跑后达标 |
| 打上 `dsh-plugin` topic | ✅ 另加 `deepseek-harness` `cordis` `dsh` `ui` `turn-rail` `navigation` |
| `description.en` 必填、以句号结尾、含 `: ` 要加引号 | ✅ 已加引号 |
| `icon` 可选，须是 GitHub 托管的**位图** | ✅ `assets/icon-180.png`（180×180 PNG） |
| 与已有条目不重复 | ✅ 其它轨道插件是另画一条，本插件只搬内置那条 |

## 时间线

1. ✅ 推仓库 → 打 topic → 建 Release `v1.0.0`
2. ✅ 开 PR（`data/plugins/liubaibuliuyan__dsh-turn-rail-left.yml`）
3. ⏳ 仓库满 1 天后 gate 自行转绿 → 维护者评审 → 合并，上游自动重新生成 README
4. ⏳ 广场索引下次重建（每天 03:17 UTC）后，在 DSH 的 **插件 → 发现** 里就能搜到
