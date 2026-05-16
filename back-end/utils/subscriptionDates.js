export const calculateSubscriptionDates = (duration) => {
  const startDate = new Date();
  const endDate = new Date(startDate);

  switch (duration) {
    case "monthly":
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "yearly":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    case "weekly":
      endDate.setDate(endDate.getDate() + 7);
      break;
    case "free":
    default:
      endDate.setMonth(endDate.getMonth() + 1);
      break;
  }

  return { startDate, endDate };
};