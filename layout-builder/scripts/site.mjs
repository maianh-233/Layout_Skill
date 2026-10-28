#!/usr/bin/env node
// Công cụ đi kèm skill layout-builder — làm thay phần server của BA Tool để skill chạy được ngay trong phiên chat.
// Chỉ dùng Node ≥ 18 (fetch có sẵn), không cần npm install.
//
//   node site.mjs init     <web>                          chép motion.js / ui.js / atmos.js, tạo _build/partials
//   node site.mjs fonts    <vi|en|zh|ja> "<Font>" [...]   kiểm font có trên Google Fonts và đủ ký tự ngôn ngữ không
//   node site.mjs search   <web> "<từ khóa>" [landscape|portrait|square]   tìm ảnh thật (Pexels → Unsplash → Openverse)
//   node site.mjs use      <web> <id> <name> "<purpose>"  tải ảnh vừa tìm về assets/img + ghi CREDITS.md (lỗi → dùng link gốc)
//   node site.mjs link     <web> <url> "<purpose>" [page] kiểm một link ảnh tự tìm (WebSearch) rồi ghi nguồn
//   node site.mjs assemble <web>                          ghép _build/partials vào mọi trang (+ aria-current)
//   node site.mjs check    <web>                          ghép partial rồi kiểm tĩnh: link chết, href="#", ảnh, lang, title…
//
// Khóa ảnh (tùy chọn, ảnh đẹp hơn): biến môi trường PEXELS_API_KEY / UNSPLASH_ACCESS_KEY,
// hoặc ghi vào file .env cạnh thư mục skill (layout-builder/.env). Không có khóa → Openverse (miễn phí).
import fs from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMG_DIR = 'assets/img';
const PARTIALS_DIR = '_build/partials';
const CACHE = '_build/images-cache.json';

// ---------- .env của skill (không ghi đè biến đã có) ----------
const envFile = path.join(SKILL_DIR, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const out = (s) => process.stdout.write(s + '\n');
const die = (s) => {
  process.stderr.write(s + '\n');
  process.exit(1);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const readJson = async (f, fallback) => {
  try {
    return JSON.parse(await fs.readFile(f, 'utf8'));
  } catch {
    return fallback;
  }
};

// ---------- init ----------
async function init(web) {
  for (const d of ['assets/js', 'assets/css', IMG_DIR, 'pages', PARTIALS_DIR]) await fs.mkdir(path.join(web, d), { recursive: true });
  for (const f of ['motion.js', 'ui.js', 'atmos.js']) await fs.copyFile(path.join(SKILL_DIR, 'assets', 'js', f), path.join(web, 'assets', 'js', f));
  out(`Đã tạo khung ${web}: assets/js/{motion,ui,atmos}.js (không sửa), assets/css, assets/img, pages/, ${PARTIALS_DIR}/`);
  out(`Nguồn ảnh: ${providerChain().join(' → ')}`);
}

// ---------- fonts ----------
const SAMPLE = { en: 0x0041, vi: 0x1ec7, zh: 0x4e2d, ja: 0x3042 };
const FALLBACK = {
  en: 'sans "Inter" / serif "Source Serif 4" / hệ thống system-ui, sans-serif',
  vi: 'sans "Be Vietnam Pro" / serif "Noto Serif" / hệ thống system-ui, "Segoe UI", Roboto, Arial, sans-serif',
  zh: 'sans "Noto Sans SC" / serif "Noto Serif SC" / hệ thống "PingFang SC", "Microsoft YaHei", sans-serif',
  ja: 'sans "Noto Sans JP" / serif "Noto Serif JP" / hệ thống "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif',
};
const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

function covers(css, cp) {
  for (const m of css.matchAll(/unicode-range:\s*([^;]+);/gi)) {
    for (const part of m[1].split(',')) {
      const r = /U\+([0-9a-f?]+)(?:-([0-9a-f]+))?/i.exec(part.trim());
      if (!r) continue;
      const lo = parseInt(r[1].replace(/\?/g, '0'), 16);
      const hi = r[2] ? parseInt(r[2], 16) : r[1].includes('?') ? parseInt(r[1].replace(/\?/g, 'f'), 16) : lo;
      if (cp >= lo && cp <= hi) return true;
    }
  }
  return false;
}

async function fonts(lang, specs) {
  if (!SAMPLE[lang]) die('Ngôn ngữ phải là vi | en | zh | ja');
  for (const spec of specs) {
    const family = spec.split(':')[0].replace(/["']/g, '').replace(/\s+/g, ' ').trim();
    if (!family) continue;
    try {
      const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}&display=swap`;
      const res = await fetch(url, { headers: { 'User-Agent': CHROME_UA }, signal: AbortSignal.timeout(8000) });
      if (res.status === 400 || res.status === 404) out(`✗ ${family}: KHÔNG có trên Google Fonts`);
      else if (!res.ok) out(`? ${family}: Google Fonts trả về ${res.status}`);
      else {
        const css = await res.text();
        if (!/unicode-range/i.test(css)) out(`? ${family}: có trên Google Fonts, không xác định được độ phủ ký tự`);
        else out(covers(css, SAMPLE[lang]) ? `✓ ${family}: có trên Google Fonts, đủ ký tự ${lang}` : `✗ ${family}: có trên Google Fonts nhưng THIẾU ký tự ${lang}`);
      }
    } catch (e) {
      out(`? ${family}: không kiểm tra được (${e?.name === 'TimeoutError' ? 'quá thời gian' : 'lỗi mạng'})`);
    }
  }
  out(`Fallback chắc chắn đủ ký tự ${lang}: ${FALLBACK[lang]}`);
}

// ---------- ảnh ----------
const UA = { 'User-Agent': 'layout-builder-skill/1.0' };
const TIMEOUT = 15000;

async function getJson(url, provider, headers = {}) {
  let net = 0;
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch(url, { headers: { ...UA, ...headers }, signal: AbortSignal.timeout(TIMEOUT) });
    } catch (e) {
      if (net++ < 1) {
        await sleep(1500);
        continue;
      }
      throw new Error(`${provider}: ${e?.name === 'TimeoutError' ? 'quá thời gian' : e?.message ?? e}`);
    }
    if ((res.status === 429 || res.status >= 500) && attempt < 2) {
      await sleep(3000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`${provider} trả về ${res.status}${res.status === 401 || res.status === 403 ? ' (khóa API bị từ chối)' : res.status === 429 ? ' (hết hạn mức)' : ''}`);
    return res.json();
  }
}

const rowsOf = (data, key, provider) => {
  if (!Array.isArray(data?.[key])) throw new Error(`${provider}: phản hồi thiếu "${key}"`);
  return data[key];
};

const SEARCHERS = {
  async pexels(q, n, o) {
    const u = new URL('https://api.pexels.com/v1/search');
    u.searchParams.set('query', q);
    u.searchParams.set('per_page', String(n));
    if (o) u.searchParams.set('orientation', o);
    const data = await getJson(u.href, 'pexels', { Authorization: process.env.PEXELS_API_KEY.trim() });
    return rowsOf(data, 'photos', 'pexels').map((p) => ({
      id: `pexels-${p.id}`, provider: 'pexels', title: p.alt || '', tags: [], width: p.width, height: p.height,
      urls: [p.src?.large2x, p.src?.large, p.src?.original].filter(Boolean), creator: p.photographer ?? '', license: 'Pexels License', page: p.url ?? '',
    }));
  },
  async unsplash(q, n, o) {
    const u = new URL('https://api.unsplash.com/search/photos');
    u.searchParams.set('query', q);
    u.searchParams.set('per_page', String(n));
    u.searchParams.set('content_filter', 'high');
    if (o) u.searchParams.set('orientation', o === 'square' ? 'squarish' : o);
    const data = await getJson(u.href, 'unsplash', { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY.trim()}`, 'Accept-Version': 'v1' });
    return rowsOf(data, 'results', 'unsplash').map((p) => ({
      id: `unsplash-${p.id}`, provider: 'unsplash', title: [p.description, p.alt_description].filter(Boolean).join(' — '),
      tags: (p.tags ?? []).map((t) => t.title).filter(Boolean), width: p.width, height: p.height,
      urls: [p.urls?.raw ? `${p.urls.raw}&w=1920&q=80&fm=jpg&fit=max` : '', p.urls?.regular].filter(Boolean),
      creator: p.user?.name ?? '', license: 'Unsplash License', page: p.links?.html ?? '', trackUrl: p.links?.download_location,
    }));
  },
  async openverse(q, n, o) {
    const run = async (query, large) => {
      const u = new URL('https://api.openverse.org/v1/images/');
      u.searchParams.set('q', query);
      u.searchParams.set('page_size', String(Math.min(n, 20)));
      u.searchParams.set('mature', 'false');
      u.searchParams.set('category', 'photograph');
      if (large) u.searchParams.set('size', 'large');
      if (o) u.searchParams.set('aspect_ratio', o === 'landscape' ? 'wide' : o === 'portrait' ? 'tall' : 'square');
      return rowsOf(await getJson(u.href, 'openverse'), 'results', 'openverse');
    };
    // Openverse ghép từ kiểu "và" → từ khóa dài ít kết quả: bớt dần từ cuối (giữ tối thiểu 2 từ)
    const words = q.trim().split(/\s+/);
    let rows = [];
    for (let k = words.length; k >= Math.min(2, words.length) && rows.length < 6; k--) {
      const sub = words.slice(0, k).join(' ');
      rows = [...rows, ...(await run(sub, true))];
      if (rows.length < 4) rows = [...rows, ...(await run(sub, false))];
    }
    const seen = new Set();
    const flickr = (url) => {
      const m = /^(https:\/\/live\.staticflickr\.com\/\d+\/\d+_[0-9a-f]+)(?:_[a-z])?\.jpg$/.exec(url);
      return m ? [`${m[1]}_b.jpg`, url] : [url];
    };
    return rows
      .filter((p) => p?.url && p?.id && !seen.has(p.id) && seen.add(p.id))
      .map((p) => ({
        id: `openverse-${p.id}`, provider: 'openverse', title: p.title || '', tags: (p.tags ?? []).map((t) => t.name).filter(Boolean).slice(0, 12),
        width: p.width ?? 0, height: p.height ?? 0, urls: p.source === 'flickr' ? flickr(p.url) : [p.url], creator: p.creator || '',
        license: `CC ${String(p.license || '').toUpperCase()} ${p.license_version || ''}`.trim(), page: p.foreign_landing_url || '',
      }));
  },
};

function providerChain() {
  const c = [];
  if (process.env.PEXELS_API_KEY?.trim()) c.push('pexels');
  if (process.env.UNSPLASH_ACCESS_KEY?.trim()) c.push('unsplash');
  c.push('openverse');
  return c;
}

const readCredits = async (web) => readJson(path.join(web, IMG_DIR, '_credits.json'), []);

async function writeCredits(web, rel, f, purpose) {
  await fs.mkdir(path.join(web, IMG_DIR), { recursive: true });
  const remote = /^https?:\/\//i.test(rel);
  const list = (await readCredits(web)).filter((x) => x.file !== rel);
  list.push({ file: rel, purpose, source: f.provider, id: f.id, title: f.title, creator: f.creator, license: f.license, page: f.page, ...(remote ? { remote: true } : {}) });
  await fs.writeFile(path.join(web, IMG_DIR, '_credits.json'), JSON.stringify(list, null, 2), 'utf8');
  const cell = (s) => String(s ?? '').replace(/\|/g, '/');
  const md = [
    '# Nguồn ảnh',
    '',
    '> Ảnh thật (không phải ảnh do AI tạo): tải từ thư viện ảnh, hoặc dùng bằng link ngoài khi không tải được (cột File là URL). Ảnh link ngoài chỉ dùng cho bản demo — khi lên web thật, thay bằng ảnh của khách hoặc ảnh có giấy phép.',
    '',
    '| File | Dùng cho | Nguồn | Tác giả | Giấy phép | Link gốc |',
    '|---|---|---|---|---|---|',
    ...list.map((x) => `| ${x.file} | ${cell(x.purpose)} | ${x.source} | ${cell(x.creator)} | ${x.license} | ${x.page} |`),
    '',
  ];
  await fs.writeFile(path.join(web, IMG_DIR, 'CREDITS.md'), md.join('\n'), 'utf8');
}

async function search(web, q, o) {
  if (!q) die('Thiếu từ khóa');
  if (o && !['landscape', 'portrait', 'square'].includes(o)) die('Hướng ảnh: landscape | portrait | square');
  const errors = [];
  let rows, provider;
  for (const p of providerChain()) {
    try {
      rows = (await SEARCHERS[p](q, 12, o)).filter((r) => r.id && r.urls.length);
      provider = p;
      break;
    } catch (e) {
      errors.push(e.message);
    }
  }
  if (!rows) die(`Mọi nguồn ảnh đều lỗi: ${errors.join('; ')}\n→ Chuyển sang link ảnh: WebSearch tìm link trực tiếp tới file ảnh rồi chạy "link".`);
  const cacheFile = path.join(web, CACHE);
  const cache = await readJson(cacheFile, {});
  for (const r of rows) cache[r.id] = r;
  await fs.mkdir(path.dirname(cacheFile), { recursive: true });
  await fs.writeFile(cacheFile, JSON.stringify(cache), 'utf8');
  const used = new Set((await readCredits(web)).map((c) => c.id));
  if (errors.length) out(`(bỏ qua: ${errors.join('; ')})`);
  out(`${rows.length} ảnh từ ${provider} cho "${q}"${o ? ` (${o})` : ''}:`);
  for (const r of rows)
    out(`- ${r.id} | ${r.width}×${r.height}${used.has(r.id) ? ' | ĐÃ DÙNG' : ''} | ${r.title.slice(0, 110) || '(không tiêu đề)'}${r.tags.length ? ` | tag: ${r.tags.slice(0, 8).join(', ')}` : ''}`);
  if (!rows.length) out('Không có kết quả — đổi từ khóa (đồng nghĩa / rộng hơn / hẹp hơn).');
}

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'anh';
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };
const BANNED = /picsum\.photos|placehold|placeholder\.com|dummyimage|loremflickr|source\.unsplash|fakeimg|placekitten|via\.placeholder/i;
const BROWSER_UA = { 'User-Agent': CHROME_UA, Accept: 'image/avif,image/webp,image/*,*/*;q=0.8' };

/** null = link dùng được trong <img src>, ngược lại là lý do */
async function probeRemote(url) {
  let u;
  try {
    u = new URL(url);
  } catch {
    return 'không phải URL hợp lệ';
  }
  if (!/^https?:$/.test(u.protocol)) return 'chỉ nhận link http(s)';
  if (BANNED.test(url)) return 'link ảnh giữ chỗ / placeholder bị cấm';
  try {
    const get = (headers) => fetch(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT) });
    let res = await get(BROWSER_UA);
    if (res.status === 403 || res.status === 429) res = await get({ ...UA, Accept: BROWSER_UA.Accept });
    const type = (res.headers.get('content-type') ?? '').split(';')[0].trim();
    // 403 với link có đuôi ảnh: máy chủ thường chỉ chặn kiểm tra từ script, trình duyệt vẫn hiện
    if (res.status === 403 && /\.(jpe?g|png|webp|avif)$/i.test(u.pathname)) return null;
    if (!res.ok) return `${u.host} trả về ${res.status}`;
    if (!type.startsWith('image/') || type === 'image/svg+xml') return `không phải ảnh chụp (content-type: ${type || 'không có'}) — cần link trực tiếp tới file ảnh, không phải link trang web`;
    const size = Number(res.headers.get('content-length') ?? 0) || (await res.arrayBuffer()).byteLength;
    res.body?.cancel?.().catch(() => {});
    if (size < 8000) return `ảnh quá nhỏ (${size} byte) — có thể là ảnh thu nhỏ / giữ chỗ`;
    return null;
  } catch (e) {
    return e?.name === 'TimeoutError' ? `${u.host} quá thời gian` : `${u.host}: ${e?.message ?? e}`;
  }
}

async function use(web, id, name, purpose = '') {
  if (!id || !name) die('Cú pháp: use <web> <id> <name> "<purpose>"');
  const found = (await readJson(path.join(web, CACHE), {}))[id];
  if (!found) die(`Không thấy ${id} trong kết quả đã tìm — chạy "search" trước và dùng đúng id.`);
  const errors = [];
  for (const url of found.urls) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(url, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(30000) });
        const type = (res.headers.get('content-type') ?? '').split(';')[0].trim();
        if (!res.ok || !EXT[type]) {
          errors.push(`${new URL(url).host}: ${res.status} ${type}`);
          break;
        }
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 8000) {
          errors.push(`${new URL(url).host}: ảnh quá nhỏ (${buf.length} byte)`);
          break;
        }
        const rel = `${IMG_DIR}/${slugify(name)}.${EXT[type]}`;
        await fs.mkdir(path.join(web, IMG_DIR), { recursive: true });
        await fs.writeFile(path.join(web, rel), buf);
        await writeCredits(web, rel, found, purpose);
        if (found.trackUrl) fetch(found.trackUrl, { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY?.trim()}` } }).catch(() => {});
        out(`OK ${rel} (${Math.round(buf.length / 1024)} KB) — mở file bằng Read để kiểm đúng chủ đề.`);
        return;
      } catch (e) {
        errors.push(`${new URL(url).host}: ${e?.name ?? 'lỗi'}`);
        if (attempt === 0) await sleep(1000);
      }
    }
  }
  // Không tải được → dùng thẳng link gốc nếu còn mở được
  for (const url of found.urls) {
    if (!(await probeRemote(url))) {
      await writeCredits(web, url, found, purpose);
      out(`LINK ${url}\nKhông tải được (${errors.join('; ')}) — dùng link này trong <img src> kèm referrerpolicy="no-referrer", sitemap ghi "status": "link".`);
      return;
    }
  }
  die(`Không tải được ${id} (${errors.join('; ')}) và link gốc cũng hỏng — chọn id khác.`);
}

async function link(web, url, purpose = '', page = '') {
  if (!url) die('Cú pháp: link <web> <url> "<purpose>" [trang-nguồn]');
  const why = await probeRemote(url);
  if (why) die(`Từ chối: ${why}`);
  let h = 0;
  for (const c of url) h = (h * 31 + c.charCodeAt(0)) | 0;
  await writeCredits(web, url, { id: `web-${(h >>> 0).toString(36)}`, provider: 'web', title: '', creator: '', license: 'Chưa rõ — chỉ dùng cho bản demo', page: page || url }, purpose);
  out(`OK link dùng được — <img src="${url}" referrerpolicy="no-referrer" …>, sitemap ghi "status": "link".`);
}

// ---------- partial ----------
const MARKER = /<!--\s*@partial\s+([\w-]+)\s*-->(?:[\s\S]*?<!--\s*\/@partial\s+\1\s*-->)?/g;
const rootFor = (rel) => '../'.repeat(rel.split('/').length - 1);

function resolveFrom(rel, href) {
  const parts = rel.split('/').slice(0, -1);
  for (const seg of href.split('/')) {
    if (seg === '..') parts.pop();
    else if (seg && seg !== '.') parts.push(seg);
  }
  return parts.join('/');
}

function markCurrent(html, rel) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = /\bhref\s*=\s*"([^"]*)"/i.exec(tag)?.[1];
    const clean = tag.replace(/\s+aria-current\s*=\s*"[^"]*"/i, '');
    if (!href || /^(#|[a-z][\w+.-]*:|\/\/)/i.test(href) || href.includes('#')) return clean;
    return resolveFrom(rel, href.split('?')[0]) === rel ? clean.replace(/^<a\b/i, '<a aria-current="page"') : clean;
  });
}

async function listPages(web) {
  const pages = existsSync(path.join(web, 'index.html')) ? ['index.html'] : [];
  if (existsSync(path.join(web, 'pages'))) for (const f of (await fs.readdir(path.join(web, 'pages'))).sort()) if (f.endsWith('.html')) pages.push(`pages/${f}`);
  return pages;
}

async function assemble(web, quiet = false) {
  const dir = path.join(web, PARTIALS_DIR);
  const partials = new Map();
  if (existsSync(dir)) for (const f of await fs.readdir(dir)) if (f.endsWith('.html')) partials.set(f.slice(0, -5), (await fs.readFile(path.join(dir, f), 'utf8')).replace(/^﻿/, '').trim());
  const missing = {};
  const changed = [];
  for (const rel of await listPages(web)) {
    const file = path.join(web, rel);
    const html = await fs.readFile(file, 'utf8');
    const next = html.replace(MARKER, (whole, name) => {
      const src = partials.get(name);
      if (src === undefined) {
        (missing[name] ??= []).push(rel);
        return whole;
      }
      return `<!-- @partial ${name} -->\n${markCurrent(src.replaceAll('{{root}}', rootFor(rel)), rel)}\n<!-- /@partial ${name} -->`;
    });
    if (next !== html) {
      await fs.writeFile(file, next, 'utf8');
      changed.push(rel);
    }
  }
  if (!quiet) out(`Ghép partial [${[...partials.keys()].join(', ') || 'không có'}] → ${changed.length} trang đổi${changed.length ? `: ${changed.join(', ')}` : ''}`);
  if (!quiet) for (const [name, pages] of Object.entries(missing)) out(`LỖI: thiếu ${PARTIALS_DIR}/${name}.html (dùng ở ${pages.join(', ')})`);
  return missing;
}

// ---------- check (kiểm tĩnh, không cần trình duyệt) ----------
async function check(web) {
  const missingPartials = await assemble(web, true);
  const pages = await listPages(web);
  if (!pages.length) die(`Không có trang nào trong ${web}`);
  const credits = await readCredits(web);
  const remoteOk = new Set(credits.filter((c) => c.remote).map((c) => c.file));
  const errors = [];
  const warns = [];
  const ids = new Map();
  const htmls = new Map();
  for (const rel of pages) {
    const html = await fs.readFile(path.join(web, rel), 'utf8');
    htmls.set(rel, html);
    ids.set(rel, new Set([...html.matchAll(/\bid\s*=\s*"([^"]+)"/gi)].map((m) => m[1])));
  }
  const langs = new Set();
  const usedImgs = new Set();
  for (const [rel, html] of htmls) {
    const e = (s) => errors.push(`${rel}: ${s}`);
    const lang = /<html\b[^>]*\blang\s*=\s*"([^"]+)"/i.exec(html)?.[1];
    if (!lang) e('thiếu <html lang>');
    else langs.add(lang);
    if (!/<title>[^<]+<\/title>/i.test(html)) e('thiếu <title>');
    if (!/<meta\s+name="description"/i.test(html)) warns.push(`${rel}: thiếu meta description`);
    if (!/name="viewport"/i.test(html)) e('thiếu meta viewport');
    const strip = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    for (const m of strip.matchAll(/\b(href|src)\s*=\s*"([^"]*)"/gi)) {
      const [, attr, raw] = m;
      const v = raw.trim();
      if (attr.toLowerCase() === 'href' && (v === '#' || v === '' || /^javascript:/i.test(v))) {
        e(`link giả href="${v}"`);
        continue;
      }
      if (/^(mailto:|tel:|data:|\/\/|sms:|https?:)/i.test(v)) {
        if (/^https?:/i.test(v) && BANNED.test(v)) e(`ảnh / link placeholder bị cấm: ${v}`);
        continue;
      }
      if (v.startsWith('#')) {
        if (v !== '#top' && !ids.get(rel).has(v.slice(1))) e(`neo ${v} không có id tương ứng`);
        continue;
      }
      const [p, hash] = v.split('#');
      const target = resolveFrom(rel, p.split('?')[0]);
      if (!existsSync(path.join(web, target))) e(`${attr}="${v}" trỏ tới file không tồn tại (${target})`);
      else if (hash && ids.has(target) && !ids.get(target).has(hash)) e(`${v}: trang có nhưng không có id "${hash}"`);
      if (target.startsWith(IMG_DIR + '/')) usedImgs.add(target);
    }
    for (const m of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*"([^"]+)"/gi)) {
      const v = m[1];
      if (/^https?:|^\/\//i.test(v)) continue;
      if (!existsSync(path.join(web, resolveFrom(rel, v)))) e(`script không tồn tại: ${v}`);
    }
    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = m[0];
      const src = /\bsrc\s*=\s*"([^"]+)"/i.exec(tag)?.[1] ?? '';
      if (!/\balt\s*=/i.test(tag)) e(`ảnh thiếu alt: ${src}`);
      if (/^https?:/i.test(src) && !remoteOk.has(src)) e(`ảnh link chưa kiểm qua "link"/"use": ${src}`);
      if (/^data:/i.test(src)) e('ảnh base64 data: bị cấm');
    }
    for (const m of html.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
      const v = m[1];
      if (/^(https?:|data:)/i.test(v)) continue;
      const t = resolveFrom(rel, v);
      if (!existsSync(path.join(web, t))) e(`url(${v}) không tồn tại`);
      else if (t.startsWith(IMG_DIR + '/')) usedImgs.add(t);
    }
    if (/<!--\s*@partial\s+[\w-]+\s*-->(?![\s\S]*?<!--\s*\/@partial)/.test(html) && !Object.keys(missingPartials).length) warns.push(`${rel}: còn dấu partial chưa ghép`);
  }
  for (const [name, ps] of Object.entries(missingPartials)) errors.push(`thiếu ${PARTIALS_DIR}/${name}.html (dùng ở ${ps.join(', ')})`);
  if (langs.size > 1) errors.push(`<html lang> không thống nhất: ${[...langs].join(', ')}`);
  // ảnh trong CSS
  const css = path.join(web, 'assets/css/site.css');
  if (existsSync(css)) for (const m of (await fs.readFile(css, 'utf8')).matchAll(/url\(\s*['"]?\.\.\/img\/([^'")]+)/gi)) usedImgs.add(`${IMG_DIR}/${m[1]}`);
  for (const c of credits) if (!c.remote && !usedImgs.has(c.file)) warns.push(`ảnh đã tải nhưng chưa dùng: ${c.file}`);
  const sm = await readJson(path.join(web, '_build/sitemap.json'), null);
  if (!sm) warns.push('thiếu _build/sitemap.json');
  else for (const p of sm.pages ?? []) if (p.file && !existsSync(path.join(web, p.file))) errors.push(`sitemap có ${p.file} nhưng chưa tạo trang`);
  const remote = credits.filter((c) => c.remote).length;
  out(`Kiểm ${pages.length} trang · ${credits.length - remote} ảnh tải về · ${remote} ảnh link · ${errors.length} lỗi · ${warns.length} cảnh báo`);
  for (const x of errors) out(`LỖI  ${x}`);
  for (const x of warns) out(`CẢNH BÁO ${x}`);
  if (errors.length) process.exitCode = 1;
}

// ---------- main ----------
const [cmd, ...args] = process.argv.slice(2);
const web = args[0] ? path.resolve(args[0]) : '';
const needWeb = () => web || die('Thiếu đường dẫn thư mục web/');
const cmds = {
  init: () => init(needWeb()),
  fonts: () => fonts(args[0], args.slice(1)),
  search: () => search(needWeb(), args[1], args[2]),
  use: () => use(needWeb(), args[1], args[2], args[3]),
  link: () => link(needWeb(), args[1], args[2], args[3]),
  assemble: () => assemble(needWeb()),
  check: () => check(needWeb()),
};
if (!cmds[cmd]) die('Lệnh: init | fonts | search | use | link | assemble | check (xem đầu file site.mjs)');
await cmds[cmd]();
