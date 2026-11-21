# 发布清单

## 已完成

- ✅ 包名/加载行统一为作者 scope：`@liubaibuliuyan/dsh-turn-rail-left`，加载行 id `dsh-turn-rail-left`
- ✅ 仓库结构对齐 `dsh-session-delete`：`index.js` + `client.js` + `cordis.patch.yml` + `locale/` +
  `icon.svg` + `assets/icon-180.png` + `README.md` + `CHANGELOG.md` + `LICENSE` + `scripts/` + `submission/`
- ✅ 自测：`npm test` → 32 项（manifest、client 模块、slot 注册、生成的 CSS 五条规则）
- ✅ 可安装：装本地目录后 `shell.overlay` 中 `dsh-turn-rail-left` 为 active
- ✅ GitHub 仓库（public、默认分支 `main`）：https://github.com/liubaibuliuyan/dsh-turn-rail-left
- ✅ 话题：`dsh-plugin` `deepseek-harness` `cordis` `dsh` `ui` `turn-rail` `navigation`
- ✅ Release `v1.0.0`：https://github.com/liubaibuliuyan/dsh-turn-rail-left/releases/tag/v1.0.0
- ✅ 广场投稿 PR：https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/17436
  —— 文件 `data/plugins/liubaibuliuyan__dsh-turn-rail-left.yml`，分类 `ui`

## 不需要 npm

本项目走 GitHub 分发，`npm publish` 不是必需步骤：纯前端、无构建步骤，可直接从源码安装。

```bash
dsh plugin --profile desktop add github:liubaibuliuyan/dsh-turn-rail-left
```

## 广场收录时间线

1. ✅ PR 已开（`awesome-dsh-plugin`）
2. ⏳ 仓库年龄 1 天的 gate 快照会自动重跑，不另推空提交
3. ⏳ 维护者评审合并 → 上游 README 自动重新生成
4. ⏳ `realguan/dsh-plugin-market` 次日 **03:17 UTC** 重建索引
5. ⏳ DSH 里 **插件 → 发现** 可搜到（自定义插件市场默认关闭时需先在「实验性插件」里打开）

## 本地试装 / 回滚

```bash
# 装发布身份（替换开发身份）
dsh plugin --profile desktop remove @local/turn-rail-left
dsh plugin --profile desktop add D:\aitest\plugins\dsh-turn-rail-left

# 回滚 / 卸载
dsh plugin --profile desktop remove @liubaibuliuyan/dsh-turn-rail-left
```

## 发布后如果 DSH 升级

选择器依赖对话 DOM 结构（`nav[aria-label]` + `data-index` 刻度）。升级后若轨道回到右侧，
说明结构变了：按新结构更新 `client.js` 里的 `RAIL` 常量，跑 `npm test`，然后
`git tag v1.0.1 && git push --tags` 并到 GitHub 建 Release。
