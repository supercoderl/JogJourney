export const capitalizeWords = (str: string) => {
    return str
        .split(' ') // Tách từng từ
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
        .join(' '); // Nối lại thành chuỗi
};

export const ensureHttps = (url: any) => {
    if (typeof url !== "string") return url; // Tránh lỗi nếu url không phải chuỗi
    return url.startsWith("http://") ? url.replace("http://", "https://") : url;
}