const assert = require('node:assert/strict');
const path = require('node:path');
const plugin = require(process.argv[2] || '../plugin/bundle.js');

async function check({ config, json = false, code = 0, error, depth = '0', scope = null }) {
  const lines = [];
  const originalLog = console.log;
  const originalError = console.error;
  console.log = (...args) => lines.push(['log', ...args]);
  console.error = (...args) => lines.push(['error', ...args]);
  const rcPath = path.resolve('/fixture', `.echoscriptrc${json ? '.json' : ''}`);
  const fs = {
    existsSync: (file) => config !== undefined && file === rcPath,
    readFileSync: () => config,
  };
  const requireFromYarn = (name) => {
    if (name === 'fs') return fs;
    if (name === 'path') return path;
    throw new Error(`Unexpected external dependency: ${name}`);
  };
  let calls = 0;
  const extra = { env: { ECHO_SCRIPT_DEPTH: depth } };
  try {
    assert.equal(plugin.name, 'yarn-plugin-echoscript');
    const instance = plugin.factory(requireFromYarn);
    const execute = await instance.hooks.wrapScriptExecution(async () => {
      calls++;
      if (error) throw error;
      return code;
    }, { cwd: '/fixture' }, { name: 'fixture', scope }, 'test:script', extra);
    if (error) await assert.rejects(execute, (caught) => caught === error);
    else assert.equal(await execute(), code);
    assert.equal(calls, 1);
    assert.equal(extra.env.ECHO_SCRIPT_DEPTH, String(Number(depth) + 1));
    assert.equal(lines.length, 2);
    assert.equal(lines[0][0], 'log');
    assert.equal(lines[1][0], error || code !== 0 ? 'error' : 'log');
    if (code !== 0) assert.match(lines[1].join(' '), new RegExp(`Script exited with code ${code}`));
    if (error) assert.match(lines[1].join(' '), /fixture failure/);
    return lines;
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
}

(async () => {
  const defaults = await check({});
  assert.match(defaults[0].join(' '), /Starting script/);
  assert.match(defaults[1].join(' '), /Script done/);
  await check({ code: 7 });
  await check({ error: new Error('fixture failure') });
  await check({ depth: '2', scope: 'scope' });
  assert.deepEqual(await check({ config: '{bad json' }), defaults);
  assert.deepEqual(await check({ config: '{"projectNameMaxLength": 0}' }), defaults);
  const configured = await check({ config: JSON.stringify({ start: 'CUSTOM_START', end: 'CUSTOM_END' }), json: true });
  assert.match(configured[0].join(' '), /CUSTOM_START/);
  assert.match(configured[1].join(' '), /CUSTOM_END/);
  console.log('Bundle smoke tests passed (7 scenarios).');
})().catch((error) => { console.error(error); process.exitCode = 1; });
