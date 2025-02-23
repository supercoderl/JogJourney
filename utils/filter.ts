import assets from "@/assets";

export const getLevelName = (levels: any[], levelId: string) => {
    const level = levels.find(l => l.id === levelId);
    let result = '0';

    if (level) {
        switch (level.name) {
            case "Beginner":
                result = '1';
                break;
            case "Intermediate":
                result = '2';
                break;
            case "Advanced":
                result = '3';
                break;
        }
    }

    return result;
};

export const filterMap = (maps: any[], mapId: string) => {
    return maps.find(m => m.id === mapId);
};

export const getExerciseName = (exerciseId: number) => {
    let result = { name: '', image: assets.image.run, color: 'rgba(35,178,56,0.59)' };
    switch (exerciseId) {
        case 1:
            result = { name: 'Chạy bộ', image: assets.image.run, color: 'rgba(35,178,56,0.59)' };
            break;
        case 2:
            result = { name: 'Xe đạp', image: assets.image.bike, color: '#FFDC5D' };
            break;
        case 3:
            result = { name: 'Yoga', image: assets.image.run, color: 'rgba(35,178,56,0.59)' };
            break;
        case 4:
            result = { name: 'Workout', image: assets.image.run, color: 'rgba(35,178,56,0.59)' };
            break;
        case 5:
            result = { name: 'Roller Skating', image: assets.image.run, color: 'rgba(35,178,56,0.59)' };
            break;
    }

    return result;
}