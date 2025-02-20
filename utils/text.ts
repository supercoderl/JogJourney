export const capitalizeWords = (str: string) => {
    return str
        .split(' ') // Tách từng từ
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
        .join(' '); // Nối lại thành chuỗi
};