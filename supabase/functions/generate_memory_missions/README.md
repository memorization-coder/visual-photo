# generate_memory_missions

This Edge Function is the only allowed entrypoint for AI mission generation. The browser should not call an AI provider directly.

Contract 0 responsibilities:

- accept JSON payloads only
- validate request shape
- require JSON mission output shape
- record prompt version, provider, model, and fallback usage
- persist generation metadata server-side
- return fallback missions if provider generation fails

