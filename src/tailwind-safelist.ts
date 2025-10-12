// This file exists so Tailwind's content scanner can see dynamically-generated
// class names used at runtime (GridListContainer builds "grid-cols-N" at runtime).
// Keeping the tokens in a static file avoids relying on config regex serialization
// and ensures the dev server includes the utilities.

export const tailwindSafelist = [
  `
  grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6
  sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6
  md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6
  lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6
  xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6
`,
]
