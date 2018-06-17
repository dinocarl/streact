# stReact

POC to use a string-based approach to writing HTML in a Flux-patterned, vanillaJS app.

Has
- a store for storing data, which contains an immutable history
- functions for templates that accept data and return an HTML string
- actions that update the store
- re-renders on changes to the store

At the moment, actions have direct access to a store's instance (which would be likely to change).

Try it out with the simple [matching game](matchGame.html) I made.
