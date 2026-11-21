# 发布清单

## 已完成（本地）

- ✅ 包名/加载行统一为作者 scope：`@liubaibuliuyan/dsh-turn-rail-left`，加载行 id `dsh-turn-rail-left`
- ✅ 仓库结构对齐 `dsh-session-delete`：`index.js` + `client.js` + `cordis.patch.yml` + `locale/` +
  `icon.svg` + `assets/icon-180.png` + `README.md` + `CHANGELOG.md` + `LICENSE` + `scripts/` + `submission/`
- ✅ 自测：`npm test` → 32 项（manifest、client 模块、slot 注册、生成的 CSS 五条规则）
- ✅ 可安装：`plugin_manager install_bundle` 装本地目录，`shell.overlay` 中 `dsh-turn-rail-left` 为 active
- ✅ 广场投稿文件：`submission/liubaibuliuyan__dsh-turn-rail-left.yml`（分类 `ui`）

## 待办（需要 GitHub 凭据）

1. 建仓库 `liubaibuliuyan/dsh-turn-rail-left`（public，默认分支 `main`，**不要**勾 README/gitignore/license）
2. `git push -u origin main`
3. 仓库设置里打 topic：`dsh-plugin`、`deepseek-harness`、`cordis`、`dsh`、`ui`、`turn-rail`
4. 建 Release `v1.0.0`（可附 `dist/` 的 tgz；纯前端插件也可以不附）
5. 仓库满 1 天后开 PR：`awesome-dsh-plugin/awesome-dsh-plugin`
   → `data/plugins/liubaibuliuyan__dsh-turn-rail-left.yml`

## 分发方式（不用 npm）

```bash
dsh plugin --profile desktop add github:liubaibuliuyan/dsh-turn-rail-left
```

或 **插件 → 添加插件** 填仓库地址 / 本地目录。广场收录后走同一条 Git 来源。

## 本地试装 / 回滚

```bash
# 装发布身份（会替换开发身份）
dsh plugin --profile desktop remove @local/turn-rail-left
dsh plugin --profile desktop add D:\aitest\plugins\dsh-turn-rail-left

# 回滚到开发身份
dsh plugin --profile desktop remove @liubaibuliuyan/dsh-turn-rail-left
dsh plugin --profile desktop add @local/turn-rail-left
```

## 广场收录时间线

1. PR 合并到 `awesome-dsh-plugin`（维护者审阅；CI 校验 `dsh.bundle`、仓库年龄、`dsh-plugin` topic）
2. 上游 README 自动重新生成
3. `realguan/dsh-plugin-market` 次日 **03:17 UTC** 重建索引
4. DSH 里 **插件 → 发现** 可搜到（自定义插件市场默认关闭时需先在「实验性插件」里打开）
