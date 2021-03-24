#ifdef GL_ES
precision mediump float;
#endif

// -- uniforms --
uniform sampler2D uState;
uniform vec2 uScale;

// -- helpers --
int get(vec2 offset) {
  return int(texture2D(uState, (gl_FragCoord.xy + offset) / uScale).r);
}

// -- program --
void main() {
  int sum = (
    get(vec2(-1.0, -1.0)) +
    get(vec2(-1.0,  0.0)) +
    get(vec2(-1.0,  1.0)) +
    get(vec2( 0.0, -1.0)) +
    get(vec2( 0.0,  1.0)) +
    get(vec2( 1.0, -1.0)) +
    get(vec2( 1.0,  0.0)) +
    get(vec2( 1.0,  1.0))
  );

  vec4 s;
  if (sum == 2) {
    float current = float(get(vec2(0.0, 0.0)));
    s = vec4(current, current, current, 1.0);
  } else {
    s = vec4(0.0, 0.0, 0.0, 1.0);
  }

  gl_FragColor = s;
}
