export const imageObjectToBase64 = (imageObject, callback) => {
    try {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            callback({ status: true, url: reader.result });
        }, false);
        reader.readAsDataURL(imageObject);
    }
    catch (error) {
        callback({ status: false });
    }
}