export const isAdminPhone = (phone) => {
    const adminPhones = ["+380635442120"];
    return adminPhones.includes(phone);
};