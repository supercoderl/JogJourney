import { capitalizeWords } from ".";

export const formatTimeAndDay = (
    timestamp: { seconds: number; nanoseconds: number } | Date,
    formatType?: 'time12h' | 'fullDate' | 'shortDateTime' | 'dateTime12h'
) => {
    if ('seconds' in timestamp && 'nanoseconds' in timestamp) {
        timestamp = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000);
    }

    if (formatType === 'time12h') {
        return timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    if (formatType === 'fullDate') {
        return timestamp.toLocaleDateString('vi-VN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    if (formatType === 'shortDateTime') {
        const date = timestamp.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const time = timestamp.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        return `${date}, ${time}`; // Giữ đúng thứ tự ngày trước, giờ sau
    }

    if (formatType === 'dateTime12h') {
        const date = timestamp.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const time = timestamp.toLocaleTimeString('vi-VN', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        return `${date} - ${time}`;
    }

    return timestamp.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
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

export const getHourList = () => {
    const now = new Date();
    const hours = [];

    for (let i = -1; i <= 2; i++) {
        const date = new Date(now);
        date.setHours(now.getHours() + i, 0, 0, 0); // Cộng/trừ giờ
        const hourString = date.getHours().toString().padStart(2, '0') + ":00";
        hours.push(hourString);
    }

    return hours;
}