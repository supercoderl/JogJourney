export const getRandomColor = () => {
    let color;
    do {
        color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    } while (!isLightColor(color)); // Lặp lại nếu màu quá tối
    return color;
};

const isLightColor = (hex: string) => {
    // Chuyển hex sang RGB
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    // Tính độ sáng theo công thức WCAG
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return luminance > 0.6; // Chỉ nhận màu sáng để đảm bảo chữ đen dễ đọc
};