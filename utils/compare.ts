import { AchivementStatus } from "@/enums";

export const getAchievementStatusName = (status: AchivementStatus): string => {
    const statusMap: Record<AchivementStatus, string> = {
        [AchivementStatus.Progressing]: 'Đang thực hiện',
        [AchivementStatus.Cancelled]: 'Đã hủy',
        [AchivementStatus.Finished]: 'Hoàn thành',
    };

    return statusMap[status] || 'Không xác định'; // Trả về mặc định nếu status không hợp lệ
};