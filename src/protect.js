document.addEventListener('contextmenu', (e) => e.preventDefault())
document.addEventListener('copy', (e) => e.preventDefault())
document.addEventListener('cut', (e) => e.preventDefault())
document.addEventListener('dragstart', (e) => e.preventDefault())

document.addEventListener('selectstart', (e) => {
  const tag = e.target.tagName
  if (tag !== 'INPUT' && tag !== 'TEXTAREA') e.preventDefault()
})

document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase()
  const isEditable = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'
  const blocked = !isEditable && (e.ctrlKey || e.metaKey) && k === 'c'
  if (blocked) e.preventDefault()
})
