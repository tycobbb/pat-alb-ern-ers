#ifdef GL_ES
precision mediump float;
#endif

// -- uniforms --
uniform sampler2D uState;
uniform vec2 uScale;
uniform int uInt0;

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
  int i0 = (uInt0 - 1) / -2; // -1

  int friend = 0;
  for (int i = 0; i < 16; i++) {
    if (i >= uInt0) {
      break;
    }

    int ii = i0 + i;
    friend += get(vec2(-1.0, ii));
  }

  int foe = (
    get(vec2(-1.0, i0 - 1)) +
    get(vec2(-1.0, i0 + uInt0))
  );

  if (foe != 0) {
    set(0);
  } else if (friend >= 2) {
    set(1);
  } else {
    set(get(vec2(0.0, 0.0)));
  }
}
