import 'firebase/storage';
import firebaseApp from '../../../firebaseConfig';

export const uploadImageToFirebaseStorage = async (image) => {
    if (!image) return;
    const storage = firebaseApp.storage();
    const fileName = `${Date.now()}_${image.name}}`;
    try {
        await storage.ref(`images/${fileName}`).put(image);
        return await storage.ref('images').child(`${fileName}`).getDownloadURL();
    } catch (e) {
        throw e;
    }
}