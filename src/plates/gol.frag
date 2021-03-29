#ifdef GL_ES
precision mediump float;
#endif

// -- uniforms --
uniform sampler2D uState;
uniform vec2 uScale;

// -- helpers --
int get(int x, int y) {
  vec2 delt = vec2(float(x), float(y));
  vec4 data = texture2D(uState, (gl_FragCoord.xy + delt) / uScale);
  return int(data.r);
}

void set(float clr) {
  gl_FragColor = vec4(clr, 0.0, 0.0, 1.0);
}

// -- program --
void main() {
  int sum = (
    get(-1, -1) +
    get(-1, +0) +
    get(-1, +1) +
    get(+0, -1) +
    get(+0, +1) +
    get(+1, -1) +
    get(+1, +0) +
    get(+1, +1)
  );

  if (sum == 3) {
    set(1.0);
  } else if (sum == 2) {
    set(float(get(0, 0)));
  } else {
    set(0.0);
  }
}
