const getLastDayOfMonth = (selectedYear: number, selectedMonth: number): number => {
  const nextMonth = new Date(selectedYear, selectedMonth, 0);
  // 0日目は現在の月の最終日を意味するので、日数を取得
  return nextMonth.getDate();
}

export default getLastDayOfMonth;