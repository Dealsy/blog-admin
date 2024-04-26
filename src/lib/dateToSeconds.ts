function dateToSeconds(dateString: Date): number {
  const dateObj = new Date(dateString)
  const milliseconds = dateObj.getTime()
  const seconds = Math.floor(milliseconds / 1000)

  return seconds
}

export default dateToSeconds
