export const formatDateYMD = (date) => {
  if (!(date instanceof Date)) return "";

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}.${m}.${d}`;
};

export const getCreateDate = (createdAt) => {
    if (!createdAt) return false;

    const createdDate =
        createdAt instanceof Date
        ? createdAt
        : createdAt.seconds
        ? new Date(createdAt.seconds * 1000) // Firestore Timestamp
        : new Date(createdAt); // ISO string

    return createdDate;
};

export const getExpiredDate = (date, days = 7) => {
    if (!date) return false;

    const expireDate = new Date(date);
    expireDate.setDate(expireDate.getDate() + days);

    return expireDate;
};