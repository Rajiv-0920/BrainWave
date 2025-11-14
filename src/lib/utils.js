export const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  if (!minutes && !remainingSeconds) return ''
  return `${minutes}m ${remainingSeconds > 0 ? `${remainingSeconds}s` : ''}`
}
