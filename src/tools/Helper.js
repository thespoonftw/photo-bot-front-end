
export const Helper = {

  getMonth(monthNumber) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return 'Invalid month.';
    }
  }

}
