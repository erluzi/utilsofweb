const Componnets: Record<string, string> = {
  Message: 'Message'
}

function registerComponent(c: string) {
  if (Componnets[c] !== undefined) {
    import(`./litcomp/${c}.es.js`)
  }
}

export {
  Componnets,
  registerComponent
}
