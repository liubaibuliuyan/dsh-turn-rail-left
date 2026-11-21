#!/usr/bin/env node
/**
 * Self-test: the bundle manifest, the Client module and the stylesheet it emits.
 *
 * Run with `npm test` (or `node scripts/check.mjs`) from the package root.
 * The plugin has no Host behaviour, so this is the whole surface: a manifest
 * that mounts, one Client module, one slot registration and its CSS.
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
let passed = 0
const failures = []

function check(label, condition) {
  if (condition) {
    passed++
    process.stdout.write(`  ok   ${label}\n`)
  } else {
    failures.push(label)
    process.stdout.write(`  FAIL ${label}\n`)
  }
}

const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))

process.stdout.write('manifest\n')
check('package name is scoped to the author', manifest.name === '@liubaibuliuyan/dsh-turn-rail-left')
check('dsh.bundle.patch is declared', manifest.dsh?.bundle?.patch === './cordis.patch.yml')
check('dsh.client platform is web', manifest.dsh?.client?.platform === 'web')
check('engines.dsh is declared', typeof manifest.engines?.dsh === 'string')
check('patch file exists', existsSync(resolve(root, manifest.dsh.bundle.patch)))
for (const [key, target] of Object.entries(manifest.exports)) {
  if (!key.includes('*')) check(`export ${key} exists`, existsSync(resolve(root, target)))
}
check('locale en exports meta.title', JSON.parse(readFileSync(resolve(root, 'locale/en.json'), 'utf8')).meta?.title?.length > 0)
check('locale zh exports meta.title', JSON.parse(readFileSync(resolve(root, 'locale/zh.json'), 'utf8')).meta?.title?.length > 0)
check('top-level icon exists', existsSync(resolve(root, manifest.icon ?? '')))

const patch = readFileSync(resolve(root, manifest.dsh.bundle.patch), 'utf8')
check('patch inserts the package row', patch.includes(manifest.name))
check('patch row id is dsh-turn-rail-left', patch.includes('- id: dsh-turn-rail-left'))

process.stdout.write('client module\n')
const loaded = []
const scope = { __ModuleLoader__: { load: (mod) => loaded.push(mod) } }
new Function('window', readFileSync(resolve(root, 'client.js'), 'utf8'))(scope)
check('module registers exactly once', loaded.length === 1)
const mod = loaded[0] ?? {}
check('module id equals the package name', mod.id === manifest.name)

const registrations = []
const plugin = mod.factory?.((name) => {
  if (name === 'react') {
    return { createElement: (type, props, ...children) => ({ type, props, children: children.filter((child) => child !== undefined) }) }
  }
  throw new Error(`unexpected require(${name})`)
}) ?? {}
check('factory returns an apply function', typeof plugin.apply === 'function')
check('factory injects the slots service', Array.isArray(plugin.inject) && plugin.inject.includes('slots'))

let components = []
plugin.apply?.({
  slots: {
    inject: (owner, callback) => { registrations.push(owner); callback() },
    register: (options, component) => { registrations.push(`${options.name}#${options.id}`); components = [component]; return () => {} },
  },
})
check('injects into the shell.overlay slot', registrations.includes('shell.overlay'))
check('registers one entry in shell.overlay', registrations.includes('shell.overlay#dsh-turn-rail-left'))
check('registers exactly one component', components.length === 1)

const element = components[0]?.()
check('component renders a style element', element?.type === 'style')
const css = element?.children?.[0] ?? ''

process.stdout.write('stylesheet\n')
check('locates the rail structurally', css.includes('[data-conversation-content] nav[aria-label]:has(button[data-index])'))
check('moves the rail to the left gutter', /left: var\(--turn-rail-left-inset\)/.test(css) && /right: auto/.test(css))
check('mirrors the tick origin', /transform-origin: left center/.test(css))
check('mirrors the focus ring', /inset: 0 auto 0 0/.test(css))
check('opens the preview towards the transcript', /left: calc\(100% \+ 10px\)/.test(css))
check('opens the rail at its own inset variable', /--turn-rail-left-inset: 20px/.test(css))
const selectorLines = css
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.endsWith('{') && !line.startsWith('@') && !line.startsWith('from') && !line.startsWith('to'))
check(
  `every rule shares the same selector chain (${selectorLines.length} rules)`,
  selectorLines.length === 5 && selectorLines.every((line) => line.startsWith('[data-conversation-content] nav[aria-label]:has(button[data-index])')),
)
check('uses no literal colours', !/#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(/.test(css))
check('keeps the shipped reduced-motion switch', css.includes('prefers-reduced-motion: no-preference'))

process.stdout.write(`\n${passed} passed, ${failures.length} failed\n`)
if (failures.length > 0) {
  for (const failure of failures) process.stdout.write(`  - ${failure}\n`)
  process.exit(1)
}
