#ifdef GL_ES
precision mediump float;
#endif

// -- uniforms --
uniform sampler2D uState;
uniform vec2 uScale;

// -- u/data
uniform float uFloat0;

// -- helpers --
int get(vec2 offset) {
  vec4 data = texture2D(uState, (gl_FragCoord.xy + offset) / uScale);
  return int(data.r);
}

void set(int color) {
  gl_FragColor = vec4(float(color), 0.0, 0.0, 1.0);
}

// -- program --
void main() {
  int h = int(uFloat0);
  int i0 = (h - 1) / -2;

  int friend = 0;
  for (int i = 0; i < 16; i++) {
    if (i >= h) {
      break;
    }

    int ii = i0 + i;
    friend += get(vec2(-1.0, ii));
  }

  int foe = (
    get(vec2(-1.0, i0 - 1)) +
    get(vec2(-1.0, i0 + h))
  );

  if (foe != 0) {
    set(0);
  } else if (friend >= 2) {
    set(1);
  } else {
    set(get(vec2(0.0, 0.0)));
  }
}
