import 'firebase/storage';
import firebaseApp from '../../../firebaseConfig';

export const uploadImageToFirebaseStorage = async (image) => {
    if (!image) return;

    const storage = firebaseApp.storage();
    const fileName = `${Date.now()}_${image.name}}`;
    try {
        const imageUploadTask = storage.ref(`images/${fileName}`).put(image);
        imageUploadTask.on('state_changed',
            (snapshot) => {

            }, (e) => {
                throw ({'error': e.error});
            }, async () => {
                let imageUrl = await storage.ref('images').child(`${fileName}`).getDownloadURL();
                return imageUrl;
        });
    } catch (e) {
        throw ({'error': e.error});
    }
}