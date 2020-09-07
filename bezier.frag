#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float quadraticBezier(float x, vec2 ab) {
  float epsilon = 0.00001;
  float a = max(0.0, min(1.0, ab.x)); 
  float b = max(0.0, min(1.0, ab.y)); 

  if (a == 0.5) {
    a += epsilon;
  }
  
  // solve t from x (an inverse operation)
  float om2a = 1.0 - 2.0 * a;
  float t = (sqrt(a * a + om2a * x) - a) / om2a;
  return (1.0 - 2.0 * b) * (t * t) + (2.0 * b) * t;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float y = quadraticBezier(st.x, u_mouse / u_resolution);
    vec3 color = vec3(y);

    float plot = smoothstep(y - 0.02, y, st.y) - smoothstep(y, y + 0.02, st.y);

    color = (1.0 - plot) * color + plot * vec3(1.0, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}

