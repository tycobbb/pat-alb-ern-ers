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
  if (get(0, 1) == 1 && get(0, 2) == 1) {
    set(0.9);
  } else {
    set(float(get(0, 0)));
  }
}
