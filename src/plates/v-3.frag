#ifdef GL_ES
precision mediump float;
#endif

// -- types --
struct cell_t {
  float clr;
  float smp;
  float rnd;
};

// -- uniforms --
uniform sampler2D uState;
uniform vec2 uScale;

// -- u/data
uniform highp float uFloat0;
uniform highp float uFloat1;

// -- helpers --
cell_t get(int x, int y) {
  vec2 delt = vec2(float(x), float(y));
  vec4 data = texture2D(uState, (gl_FragCoord.xy + delt) / uScale);

  cell_t c;
  c.clr = data.r;
  c.smp = data.g;
  c.rnd = data.a;

  if (c.rnd != 1.0) {
    c.smp = max(c.rnd, uFloat0);
  }

  return c;
}

void set(float clr, float smp) {
  gl_FragColor = vec4(clr, smp, 1.0, 1.0);
}

// -- program --
void main() {
  cell_t c;
  cell_t n = get(-1, 0);

  if (n.clr == 1.0 && n.smp > 0.1) {
    set(n.clr, n.smp * uFloat1);
    return;
  }

  c = get(0, 0);
  set(c.clr, c.smp);
}
