// The signature moment: one trailer becomes a line of three hundred.
// Plays once when half the stage is on screen, pauses off screen, ends on a still frame.
export async function initFleet(root: HTMLElement) {
  const canvas = root.querySelector('canvas') as HTMLCanvasElement;
  const stage = root.querySelector('[data-stage]') as HTMLElement;
  const replay = root.querySelector('[data-replay]') as HTMLButtonElement;
  const labA = root.querySelector('[data-label="a"]') as HTMLElement;
  const labB = root.querySelector('[data-label="b"]') as HTMLElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ok = false;
  try { const c = document.createElement('canvas'); ok = !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { ok = false; }
  if (reduced || !ok) { root.classList.add('is-static'); return; }

  const THREE = await import('three');
  const { mergeGeometries } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
  const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js');

  const COUNT = 300, GAP = 3.45, CAM_T = 4.0, ARRIVE = 0.9;
  const STAGE = new THREE.Color('#0b1136');
  const HAZE = new THREE.Color('#18225f');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(HAZE);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(HAZE, 80, 760);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 1800);

  // low sun from behind and to the left, like the drone film: bright roofs and sides, noses in cool shade
  scene.add(new THREE.HemisphereLight(0xc4dcff, 0x16204f, 1.25));
  const sun = new THREE.DirectionalLight(0xfff3dd, 3.4); sun.position.set(-45, 40, -80); scene.add(sun);
  const fill = new THREE.DirectionalLight(0x9fe3f5, 0.42); fill.position.set(30, 12, 60); scene.add(fill);

  const box = (w: number, h: number, d: number, x: number, y: number, z: number) => { const g = new THREE.BoxGeometry(w, h, d); g.translate(x, y, z); return g; };
  const wheel = (x: number, z: number) => { const g = new THREE.CylinderGeometry(0.52, 0.52, 0.34, 20); g.rotateZ(Math.PI / 2); g.translate(x, 0.52, z); return g; };
  // a 13.6 m tri-axle fridge trailer, nose (fridge unit) towards +Z
  const rbox = (w: number, h: number, d: number, x: number, y: number, z: number, r: number) => { const g = new RoundedBoxGeometry(w, h, d, 3, r); g.translate(x, y, z); return g; };
  const gBody = rbox(2.6, 2.74, 13.6, 0, 2.62, 0, 0.07);
  const gRail = mergeGeometries([box(2.64, 0.17, 13.64, 0, 1.2, 0), box(1.66, 0.3, 0.04, 0, 3.5, 7.335), box(1.66, 0.62, 0.04, 0, 2.5, 7.335)]);
  const dark = [box(2.0, 0.3, 12.4, 0, 0.98, -0.3), box(2.5, 0.16, 0.18, 0, 0.7, -6.72)];
  for (const z of [-3.2, -4.55, -5.9]) dark.push(wheel(-1.06, z), wheel(1.06, z));
  for (const x of [-1.27, 1.27]) dark.push(box(0.05, 0.36, 5.4, x, 0.74, 0.4), box(0.44, 0.05, 4.3, x * 0.83, 1.09, -4.55));
  dark.push(box(0.15, 1.08, 0.15, -0.8, 0.54, 3.9), box(0.15, 1.08, 0.15, 0.8, 0.54, 3.9));
  const gDark = mergeGeometries(dark);
  const gUnit = mergeGeometries([rbox(2.06, 2.12, 0.52, 0, 2.95, 7.06, 0.06), rbox(0.5, 0.46, 0.2, 0.62, 1.68, 7.0, 0.04)]);
  const gGlow = box(2.06, 0.05, 0.52, 0, 4.035, 7.06);

  const mat = (c: number, r: number, m = 0.04) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const mGlow = new THREE.MeshBasicMaterial({ color: 0x18bcdc });

  // ground shadows are drawn, not computed: a soft contact patch plus the long raked bar the low sun throws forward
  const tex = (draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, w = 64, h = 256) => { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; draw(cv.getContext('2d')!, w, h); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const tContact = tex((c, w, h) => { const g = c.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, h / 2); g.addColorStop(0, 'rgba(0,0,0,.7)'); g.addColorStop(0.6, 'rgba(0,0,0,.36)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); });
  const tBar = tex((c, w, h) => { const g = c.createLinearGradient(0, h, 0, 0); g.addColorStop(0, 'rgba(0,0,0,.62)'); g.addColorStop(0.7, 'rgba(0,0,0,.3)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, w, h); });
  const gContact = new THREE.PlaneGeometry(3.9, 16.5); gContact.rotateX(-Math.PI / 2); gContact.translate(0, 0.02, 0);
  const SX = 4.6, SZ = 9.4;
  const gBar = new THREE.BufferGeometry();
  gBar.setAttribute('position', new THREE.Float32BufferAttribute([-1.3, 0.03, 6.7, 1.3, 0.03, 6.7, 1.3 + SX, 0.03, 6.7 + SZ, -1.3 + SX, 0.03, 6.7 + SZ], 3));
  gBar.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
  gBar.setIndex([0, 2, 1, 0, 3, 2]); gBar.computeVertexNormals();
  const flat = (t: any) => new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, fog: true });
  const gBay = new THREE.PlaneGeometry(0.1, 19); gBay.rotateX(-Math.PI / 2); gBay.translate(-GAP / 2, 0.012, 3.4);
  const mBay = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, depthWrite: false });

  const parts = [
    new THREE.InstancedMesh(gContact, flat(tContact), COUNT),
    new THREE.InstancedMesh(gBar, flat(tBar), COUNT),
    new THREE.InstancedMesh(gBody, mat(0xffffff, 0.55), COUNT),
    new THREE.InstancedMesh(gRail, mat(0x283490, 0.45, 0.25), COUNT),
    new THREE.InstancedMesh(gDark, mat(0x141a36, 0.82), COUNT),
    new THREE.InstancedMesh(gUnit, mat(0xeef2f8, 0.45), COUNT),
    new THREE.InstancedMesh(gGlow, mGlow, COUNT),
  ];
  parts.forEach((p) => { p.frustumCulled = false; scene.add(p); });
  const bays = new THREE.InstancedMesh(gBay, mBay, COUNT + 1); bays.frustumCulled = false; scene.add(bays);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(3200, 900), mat(0x0d1440, 0.95, 0));
  ground.rotation.x = -Math.PI / 2; ground.position.set(1100, 0, -60); scene.add(ground);
  const line = new THREE.Mesh(new THREE.BoxGeometry(COUNT * GAP + 10, 0.03, 0.34), mGlow);
  line.position.set((COUNT * GAP) / 2 - 4, 0.035, 13.2); scene.add(line);

  // a little real-world untidiness: small offsets and angles, fixed per trailer
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const jz = new Float32Array(COUNT), jr = new Float32Array(COUNT), delay = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) { jz[i] = (rnd() - 0.5) * 0.8; jr[i] = (rnd() - 0.5) * 0.022; delay[i] = i === 0 ? -9 : 0.35 + 2.1 * Math.pow(i / COUNT, 0.6); }
  jz[0] = 0; jr[0] = 0;

  const dummy = new THREE.Object3D();
  for (let i = 0; i <= COUNT; i++) { dummy.position.set(i * GAP, 0, 0); dummy.rotation.set(0, 0, 0); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); bays.setMatrixAt(i, dummy.matrix); }
  const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
  const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const camS = new THREE.Vector3(), camE = new THREE.Vector3(), tgtS = new THREE.Vector3(), tgtE = new THREE.Vector3(), tgt = new THREE.Vector3();
  // Camera poses by frame shape: [aspect, start camera, start target, end camera, end target].
  // Start is a close look at trailer one; the end pulls up and back until the whole line is in frame,
  // trailer one bottom left and the far end of the line top right.
  const POSES: number[][] = [
    [0.62, -18.4, 5.5, 34.1, 0, 2.2, -1.5, -85.8, 40, 20.9, 63.8, 0, 0],
    [0.8, -15.5, 4.7, 29, 1.5, 2.2, -1.5, -74.5, 36, 24.8, 61.2, 0, 0],
    [1.0, -13.7, 4.2, 25.4, 2.5, 2.2, -1.5, -67.3, 34, 30.2, 61.1, 0, 0],
    [1.3, -13.7, 4.2, 25.4, 2.5, 2.2, -1.5, -59, 32, 38.1, 61.8, 0, 0],
  ];
  function poses() {
    const a = Math.min(POSES[POSES.length - 1][0], Math.max(POSES[0][0], camera.aspect));
    let i = 0; while (i < POSES.length - 2 && a > POSES[i + 1][0]) i++;
    const A = POSES[i], B = POSES[i + 1], k = (a - A[0]) / (B[0] - A[0]);
    const v = (o: number) => [0, 1, 2].map((j) => A[o + j] + (B[o + j] - A[o + j]) * k) as [number, number, number];
    camS.set(...v(1)); tgtS.set(...v(4)); camE.set(...v(7)); tgtE.set(...v(10));
  }
  function frame(t: number) {
    for (let i = 0; i < COUNT; i++) {
      const p = easeOut(Math.min(1, Math.max(0, (t - delay[i]) / ARRIVE)));
      const s = 0.0001 + 0.9999 * p;
      dummy.position.set(i * GAP, 0, jz[i] - (1 - p) * 18);
      dummy.rotation.set(0, jr[i], 0); dummy.scale.set(s, s, s); dummy.updateMatrix();
      for (const part of parts) part.setMatrixAt(i, dummy.matrix);
    }
    for (const part of parts) part.instanceMatrix.needsUpdate = true;
    const c = easeInOut(Math.min(1, t / CAM_T));
    // the aim trails the camera: pull up and back first, then swing along the line to its far end, so trailer one never leaves the frame
    camera.position.lerpVectors(camS, camE, c); tgt.lerpVectors(tgtS, tgtE, Math.pow(c, 2.4)); camera.lookAt(tgt);
    mBay.opacity = 0.1 * c;
    renderer.render(scene, camera);
  }
  function place() {
    const w = stage.clientWidth, h = stage.clientHeight;
    const put = (el: HTMLElement, v: THREE.Vector3) => {
      v.project(camera);
      const half = el.offsetWidth / 2 + 10;
      const x = (v.x * 0.5 + 0.5) * w, left = Math.min(w - half, Math.max(half, x));
      el.style.left = left + 'px';
      el.style.setProperty('--px', Math.max(-half + 16, Math.min(half - 16, x - left)) + 'px');   // keep the pointer on the spot when the plate is nudged in from the edge
      el.style.top = Math.min(0.92 * h, Math.max(60, (-v.y * 0.5 + 0.5) * h)) + 'px';
    };
    put(labA, new THREE.Vector3(0, 5.2, 6.5));
    put(labB, new THREE.Vector3((COUNT - 1) * GAP, 10, 0));
  }
  const copy = root.querySelector('.copy') as HTMLElement | null;
  function size() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, w < 700 ? 1.25 : 1.5));
    renderer.setSize(w, h, false);
    // wide screens: the copy sits on the left, so the shot is composed for the space to its right
    // (the picture still fills the whole stage; only its centre of interest moves)
    let x0 = 0;
    if (copy && getComputedStyle(stage).position === 'absolute') {
      const left = stage.getBoundingClientRect().left;
      const edge = Math.max(...Array.from(copy.children).map((c) => c.getBoundingClientRect().right - left));
      x0 = Math.round(Math.min(w * 0.56, edge + 28));
    }
    if (x0 > 0) camera.setViewOffset(w - x0, h, -x0, 0, w, h);
    else { camera.clearViewOffset(); camera.aspect = w / h; camera.updateProjectionMatrix(); }
    root.style.setProperty('--x0', x0 + 'px');
    poses();
  }

  const TOTAL = Math.max(CAM_T, 0.35 + 2.1 + ARRIVE) + 0.05;
  let t = 0, last = 0, raf = 0, visible = false, playing = false, done = false;
  const finish = () => { t = TOTAL; frame(t); playing = false; done = true; place(); root.classList.add('is-done'); replay.hidden = false; };
  function tick(now: number) {
    if (!playing) return;
    t += Math.min(0.25, (now - last) / 1000); last = now;   // real time, so a slow device still finishes on schedule
    if (t >= TOTAL) { finish(); return; }
    frame(t); raf = requestAnimationFrame(tick);
  }
  function play() { if (playing || done) return; playing = true; last = performance.now(); raf = requestAnimationFrame(tick); }
  function pause() { playing = false; cancelAnimationFrame(raf); }
  function restart() { pause(); done = false; t = 0; root.classList.remove('is-done'); replay.hidden = true; frame(0); if (visible) play(); }

  size(); frame(0);
  root.classList.add('is-live');
  const idle = (window as any).requestIdleCallback || ((f: () => void) => setTimeout(f, 60));
  idle(() => renderer.compile(scene, camera));
  new ResizeObserver(() => { size(); frame(done ? TOTAL : t); if (done) place(); }).observe(stage);
  new IntersectionObserver((es) => {
    visible = es[0].intersectionRatio >= 0.5;
    if (visible) play(); else if (playing) pause();
  }, { threshold: [0, 0.5, 1] }).observe(stage);
  replay.addEventListener('click', restart);
  addEventListener('pagehide', () => { pause(); renderer.dispose(); parts.forEach((p) => p.geometry.dispose()); }, { once: true });
  (window as any).__fleet = { end: () => { pause(); finish(); }, start: () => { pause(); done = false; t = 0; root.classList.remove('is-done'); replay.hidden = true; frame(0); }, seek: (x: number) => { pause(); done = false; t = x; root.classList.remove('is-done'); replay.hidden = true; frame(x); }, total: TOTAL, pose: (p: number[]) => { camS.set(p[0], p[1], p[2]); tgtS.set(p[3], p[4], p[5]); camE.set(p[6], p[7], p[8]); tgtE.set(p[9], p[10], p[11]); frame(t); if (done) place(); } };
}
