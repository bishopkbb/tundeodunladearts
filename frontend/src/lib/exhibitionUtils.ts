export type ExhibitionStatus = 'current' | 'upcoming' | 'past';

/**
 * Calculates exhibition status based on current date and event dates
 * 
 * @param startDate - Start date of the exhibition (ISO date string: YYYY-MM-DD)
 * @param endDate - End date of the exhibition (ISO date string: YYYY-MM-DD). If not provided, uses startDate as endDate
 * @returns 'upcoming' | 'current' | 'past'
 * 
 * Logic:
 * - If current date < startDate → 'upcoming'
 * - If current date >= startDate && current date <= endDate → 'current'
 * - If current date > endDate → 'past'
 */
export function calculateExhibitionStatus(
  startDate: string,
  endDate?: string
): ExhibitionStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  // Use endDate if provided, otherwise use startDate (for single-day events)
  const end = endDate ? new Date(endDate) : new Date(startDate);
  end.setHours(23, 59, 59, 999); // Set to end of day

  // Compare dates
  if (today < start) {
    return 'upcoming';
  } else if (today >= start && today <= end) {
    return 'current';
  } else {
    return 'past';
  }
}

/**
 * Gets the display text for an exhibition status
 */
export function getStatusText(status: ExhibitionStatus): string {
  switch (status) {
    case 'current':
      return 'Now Showing';
    case 'upcoming':
      return 'Coming Soon';
    case 'past':
      return 'Past Exhibition';
    default:
      return 'Exhibition';
  }
}

/**
 * Gets the color class for an exhibition status badge
 */
export function getStatusColor(status: ExhibitionStatus): string {
  switch (status) {
    case 'current':
      return 'bg-green-500';
    case 'upcoming':
      return 'bg-[#FFD700]'; // Gold color
    case 'past':
      return 'bg-gray-400';
    default:
      return 'bg-gray-500';
  }
}

