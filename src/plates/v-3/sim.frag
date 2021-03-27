#ifdef GL_ES
precision mediump float;
#endif

// -- uniforms --
uniform sampler2D uState;
uniform vec2 uScale;
uniform int uInt0;

// -- helpers --
int get(vec2 offset) {
  return int(texture2D(uState, (gl_FragCoord.xy + offset) / uScale).r);
}

// -- program --
void main() {
  int i0 = (uInt0 - 1) / -2; // -1

  int friend = 0;
  for (int i = 0; i < 8; i++) {
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

  vec4 s;
  if (foe != 0) {
    s = vec4(0.0, 0.0, 0.0, 0.0);
  } else if (friend >= 2) {
    s = vec4(1.0, 1.0, 1.0, 1.0);
  } else {
    float current = float(get(vec2(0.0, 0.0)));
    s = vec4(current, current, current, 1.0);
  }

  gl_FragColor = s;
}
