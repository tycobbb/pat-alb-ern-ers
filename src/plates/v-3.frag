#ifdef GL_ES
precision mediump float;
#endif

// -- types --
struct cell_t {
  int color;
  float sampl;
};

float rand(vec2 co){
  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

// -- uniforms --
uniform sampler2D uState;
uniform vec2 uScale;
uniform int uInt0;

// -- helpers --
cell_t get(int x, int y) {
  vec2 offset = vec2(float(x), float(y));
  vec4 data = texture2D(uState, (gl_FragCoord.xy + offset) / uScale);

  cell_t c;
  c.color = int(data.r);
  c.sampl = data.b;

  return c;
}

void set(int color, float sampl) {
  gl_FragColor = vec4(float(color), 1.0, sampl, 1.0);
}

// -- program --
void main() {
  cell_t p = get(-1, 0);

  if (p.color == 1 && p.sampl > 0.1) {
    set(p.color, p.sampl * 0.9);
    return;
  }

  if (get(0, -1).color == 1 || get(0, 1).color == 1) {
    set(1, p.sampl);
  } else {
    set(get(0, 0).color, 0.0);
  }
}
