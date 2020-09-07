#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    //float y = (sin(st.x * PI / 2.0 + (u_time * 1.5)) / 2.0) + 0.5;
    //float y = abs(sin(st.x * PI / 2.0 + (u_time * 1.5)));
    //float y = fract(sin(st.x * PI / 2.0 + (u_time * 1.5)));
    float y = (sin(st.x * PI / 2.0 + (u_time * 1.5)) / 2.0) + 0.5;

    vec3 color = vec3(y);
    float pct = smoothstep(y - 0.02, y, st.y) - smoothstep(y, y + 0.02, st.y);

    color = (1.0 - pct) * color + pct * vec3(1.0, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}

