import { firestore } from "@/lib/firebase-config";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "@firebase/firestore";
import axios from "axios";

export const uploadImage = async (imageUri: string) => {
    let apiUrl = `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_NAME}/image/upload`;

    let formData = new FormData();
    formData.append('file', imageUri); // imageUri là base64 hoặc URL ảnh
    formData.append('upload_preset', 'jogjourney');

    return await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, "informations"));

        const users: any[] = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });

        return users;
    } catch (error) {
        console.error("Lỗi khi lấy users:", error);
        return [];
    }
};

export const getUserById = async (userId: string) => {
    try {
        const userRef = doc(firestore, "informations", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Lỗi khi lấy user theo id:", error);
        return [];
    }
};

export const getMyAchievements = async (userId: string) => {
    try {
        const q = query(collection(firestore, "achievements"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const achievements: any[] = [];
        querySnapshot.forEach((doc) => {
            achievements.push({ id: doc.id, ...doc.data() });
        });

        return achievements;
    } catch (error) {
        console.error("Lỗi khi lấy achievements:", error);
        return [];
    }
};

export const fetchExerciseById = async (exerciseId: number) => {
    try {
        const q = query(collection(firestore, "exercises"), where("index", "==", exerciseId)); // Tạo query
        const querySnapshot = await getDocs(q); // Lấy dữ liệu

        if (!querySnapshot.empty) {
            return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() }; // Lấy phần tử đầu tiên
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi fetch exercise:", error);
        return [];
    }
};

export const getTodayPoints = async (userId: string) => {
    try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const endOfDay = new Date(now.setHours(23, 59, 59, 999));

        const q = query(
            collection(firestore, "dailyProgresses"),
            where("userId", "==", userId),
            where("date", ">=", startOfDay),
            where("date", "<=", endOfDay)
        );

        const querySnapshot = await getDocs(q);

        let totalPoints = 0;
        querySnapshot.forEach((doc) => {
            totalPoints += doc.data().pointsGained || 0;
        });

        return totalPoints;
    } catch (error) {
        console.error("Lỗi khi lấy dailyProgresses:", error);
        return 0;
    }
};

export const getPoints = async (userId: string) => {
    try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const endOfDay = new Date(now.setHours(23, 59, 59, 999));

        const q = query(
            collection(firestore, "dailyProgresses"),
            where("userId", "==", userId),
            where("date", ">=", startOfDay),
            where("date", "<=", endOfDay)
        );

        const querySnapshot = await getDocs(q);

        let totalPoints = 0;
        querySnapshot.forEach((doc) => {
            totalPoints += doc.data().pointsGained || 0;
        });

        return totalPoints;
    } catch (error) {
        console.error("Lỗi khi lấy dailyProgresses:", error);
        return 0;
    }
};

export const getChallengesByUser = async (userId: string) => {
    try {
        const challengeQuery = query(collection(firestore, "challenges"), where("userId", "==", userId));
        const snapshot = await getDocs(challengeQuery);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    catch (error) {
        console.log("Lỗi khi lấy danh sách bản lưu: ", error);
        return [];
    }
};

export const getLevels = async () => {
    try {
        const snapshot = await getDocs(collection(firestore, 'levels'));
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    catch (error) {
        console.log("Lỗi khi lấy danh sách cấp độ: ", error);
        return [];
    }
};

export const getExercises = async () => {
    try {
        const q = query(collection(firestore, "exercises"), orderBy("index", "asc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    catch (error) {
        console.log("Lỗi khi lấy danh sách bản lưu: ", error);
        return [];
    }
};

export const getMaps = async () => {
    try {
        const snapshot = await getDocs(collection(firestore, 'maps'));
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    catch (error) {
        console.log("Lỗi khi lấy danh sách địa điểm: ", error);
        return [];
    }
};

export const getPostsByUser = async (userId: string) => {
    try {
        const challengeQuery = query(collection(firestore, "posts"), where("userId", "==", userId));
        const snapshot = await getDocs(challengeQuery);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    catch (error) {
        console.log("Lỗi khi lấy danh sách bài viết: ", error);
        return [];
    }
};

export const getPostsWithoutUser = async (userId: string) => {
    try {
        const challengeQuery = query(collection(firestore, "posts"), where("userId", "!=", userId));
        const snapshot = await getDocs(challengeQuery);
        return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }
    catch (error) {
        console.log("Lỗi khi lấy danh sách bài viết: ", error);
        return [];
    }
};