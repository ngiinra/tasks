/**
 * The date helper class that provides functionalities having frequent usage in
 * different pages.
 */
export default class DateHelper {
  /**
   * Get persian date.
   * @returns {string} returns current persian year.
   */
  getPersianYear(): string {
    const currentYear = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      year: "numeric",
    }).format(new Date());
    return currentYear;
  }

  /**
   * Adds given number with today date.
   * @param {!number} numberOfDaysAfterToday - it can be negative,zero or positive number.
   * For negative numbers, it returns a date before today.
   * @returns {string} - solar date in string format.
   */
  getPersianDateOf(numberOfDaysAfterToday: number): string {
    const today = new Date();
    today.setDate(today.getDate() + numberOfDaysAfterToday);

    const formattedDate = today.toLocaleDateString("fa-IR-u-nu-latn", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      formatMatcher: "basic",
    });

    return formattedDate;
  }

  /**
   * Converts Jalali year,month and day to gregorian year,month,date.
   * @param {!number} jy - Jalali (Shamsi) year
   * @param {!number} jm - Jalali month
   * @param {!number} jd - Jalali day
   * @returns {Array} returns converted gregorianYear, gregorianMonth, gregorianDay.
   */
  convertJalaliToGregorian(jy: number, jm: number, jd: number): number[] {
    let gregorianYear = jy <= 979 ? 621 : 1600;
    jy -= jy <= 979 ? 0 : 979;
    let days =
      365 * jy +
      Math.floor(jy / 33) * 8 +
      Math.floor(((jy % 33) + 3) / 4) +
      78 +
      jd +
      (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    gregorianYear += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
      gregorianYear += 100 * Math.floor(--days / 36524);
      days %= 36524;
      if (days >= 365) {
        days++;
      }
    }
    gregorianYear += 4 * Math.floor(days / 1461);
    days %= 1461;
    gregorianYear += Math.floor((days - 1) / 365);
    if (days > 365) {
      days = (days - 1) % 365;
    }
    let gregorianDay = days + 1;
    const monthsMaxDays = [
      0,
      31,
      (gregorianYear % 4 == 0 && gregorianYear % 100 != 0) ||
      gregorianYear % 400 == 0
        ? 29
        : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    let gregorianMonth;
    for (gregorianMonth = 0; gregorianMonth < 13; gregorianMonth++) {
      const temp = monthsMaxDays[gregorianMonth];
      if (gregorianDay <= temp) {
        break;
      }
      gregorianDay -= temp;
    }
    return [gregorianYear, gregorianMonth, gregorianDay];
  }

  /**
   * Converts a Gregorian date to a Jalali (Persian) date.
   *
   * @param {number} gy - The Gregorian year.
   * @param {number} gm - The Gregorian month (1-12).
   * @param {number} gd - The Gregorian day of the month (1-31).
   * @returns {array} - The equivalent Persian date as an array ['year', 'month', 'day'].
   *
   * @throws {Error} If any of the Gregorian date parameters are missing.
   */
  convertGregorianToJalali(gy: number, gm: number, gd: number): number[] {
    if (!gy || !gm || !gd) {
      throw new Error(`'gy', 'gm', and 'gd' parameters are required.`);
    }

    let jy: number,
      jm: number = 0,
      jd: number = 0;
    const g_days_in_month = [
      31,
      28 + (this.#isLeapYear(gy) ? 1 : 0),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    let div = (a: number, b: number): number => Math.floor(a / b);
    let gy2 = gm > 2 ? gy + 1 : gy;
    let days: number =
      355666 +
      365 * gy +
      div(gy2 + 3, 4) -
      div(gy2 + 99, 100) +
      div(gy2 + 399, 400);

    for (let i = 0; i < gm - 1; i++) {
      days += g_days_in_month[i];
    }
    days += gd - 1;

    jy = -1595 + 33 * div(days, 12053);
    days %= 12053;
    jy += 4 * div(days, 1461);
    days %= 1461;

    if (days > 365) {
      jy += div(days - 1, 365);
      days = (days - 1) % 365;
    }

    for (let i = 0; i < 12; i++) {
      let month_days: number =
        i < 6 ? 31 : i < 11 ? 30 : this.#isLeapYear(jy) ? 30 : 29;
      if (days < month_days) {
        jm = i + 1;
        jd = days + 1;
        break;
      }
      days -= month_days;
    }

    return [jy, jm, jd];
  }

  /**
   * Determines if a given Persian year is a leap year.
   *
   * A Persian leap year occurs every 4 years, with exceptions based on a 33-year cycle.
   * Specifically, the years 0, 4, 8, 12, 16, 20, 24, 28, and 32 in each 33-year cycle are leap years.
   *
   * @param {number} year - The Persian year to check.
   * @returns {boolean} - Returns `true` if the year is a leap year, otherwise `false`.
   *
   * @throws {Error} If the 'year' parameter is not provided.
   */
  #isLeapYear(year: number): boolean {
    if (year === undefined || year === null) {
      throw new Error(`The 'year' parameter is required.`);
    }
    const remainderFromEpoch = (year - 474) % 33;
    const leapYearOffsets = [0, 4, 8, 12, 16, 20, 24, 28, 32];
    return leapYearOffsets.includes(remainderFromEpoch);
  }

  convertToPersianDate(date: Date | string) {
    return new Date(date).toLocaleDateString("fa-IR-u-nu-latn", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
}
