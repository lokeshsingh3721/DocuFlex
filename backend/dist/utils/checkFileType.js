const getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];
    const videoExtensions = ["mp4", "avi", "mov", "mkv", "flv", "wmv"];
    const documentExtensions = [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "txt",
    ];
    if (imageExtensions.includes(extension)) {
        return "image";
    }
    else if (videoExtensions.includes(extension)) {
        return "video";
    }
    else if (documentExtensions.includes(extension)) {
        return "document";
    }
    else {
        return "other";
    }
};
export {};
