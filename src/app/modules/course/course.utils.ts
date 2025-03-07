export const courseDurationInWeeks = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    throw new Error('Both startDate and endDate are required.')
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error(
      'Invalid date format. Ensure startDate and endDate are valid dates.',
    )
  }

  const durationInWeeks = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7),
  )

  return durationInWeeks > 0 ? durationInWeeks : 0
}
