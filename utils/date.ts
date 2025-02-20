import { capitalizeWords } from ".";

export const formatTimeAndDay = (date: Date, formatType?: 'time12h' | 'fullDate') => {
    const formatter = new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: formatType === 'time12h',
        weekday: formatType === 'fullDate' ? 'long' : undefined,
        day: formatType === 'fullDate' ? 'numeric' : undefined,
        month: formatType === 'fullDate' ? 'long' : undefined,
        year: formatType === 'fullDate' ? 'numeric' : undefined,
    });

    const parts = formatter.formatToParts(date);

    if (formatType === 'time12h') {
        // Lấy giờ, phút, và AM/PM (nếu có)
        const time = parts
            .map(p => (p.type === 'dayPeriod' ? p.value.toLowerCase() : p.value)) // Chữ thường cho AM/PM
            .filter(p => p.trim() !== '') // Xóa khoảng trắng dư thừa
            .join('');
        return time;
    }

    if (formatType === 'fullDate') {
        // Lấy thứ, ngày, tháng, năm
        let weekday = parts.find(p => p.type === 'weekday')?.value ?? '';
        let day = parts.find(p => p.type === 'day')?.value ?? '';
        let month = parts.find(p => p.type === 'month')?.value ?? '';

        return `${capitalizeWords(weekday)}, ngày ${day}, ${month}`;
    }

    const time = parts.filter(p => p.type === 'hour' || p.type === 'minute').map(p => p.value).join(':');
    let day = parts.find(p => p.type === 'weekday')?.value ?? '';

    return `${time} ${capitalizeWords(day)}`; // Viết hoa từng từ trong thứ
};

export const calculateAge = (birthday: string) => {
    // Chuyển từ "DD/MM/YYYY" -> "MM/DD/YYYY"
    const [day, month, year] = birthday.split("/").map(Number);
    const birthDate = new Date(year, month - 1, day); // Tháng bắt đầu từ 0

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // Kiểm tra nếu chưa qua sinh nhật trong năm nay thì trừ 1
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}