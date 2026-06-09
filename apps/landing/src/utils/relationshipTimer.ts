export interface RelationshipElapsedTime {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const relationshipStartDate = new Date(2026, 0, 14, 20, 0, 0);

const addMonths = (date: Date, months: number): Date =>
  new Date(
    date.getFullYear(),
    date.getMonth() + months,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

const wholeMonthsBetween = (startDate: Date, endDate: Date): number => {
  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() -
    startDate.getMonth();

  if (addMonths(startDate, months).getTime() > endDate.getTime()) {
    months -= 1;
  }

  return Math.max(months, 0);
};

export const calculateRelationshipElapsedTime = (
  currentDate: Date = new Date(),
  startDate: Date = relationshipStartDate
): RelationshipElapsedTime => {
  if (currentDate.getTime() <= startDate.getTime()) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const totalWholeMonths = wholeMonthsBetween(startDate, currentDate);
  const years = Math.floor(totalWholeMonths / 12);
  const months = totalWholeMonths % 12;
  const monthAnchor = addMonths(startDate, totalWholeMonths);
  let remainingSeconds = Math.floor((currentDate.getTime() - monthAnchor.getTime()) / 1000);

  const days = Math.floor(remainingSeconds / 86_400);
  remainingSeconds -= days * 86_400;

  const hours = Math.floor(remainingSeconds / 3_600);
  remainingSeconds -= hours * 3_600;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds - minutes * 60;

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };
};
