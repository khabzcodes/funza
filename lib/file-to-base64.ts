export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file
    if (file.size === 0) {
      reject(new Error('File is empty'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        // Get the result as a string
        const result = reader.result;

        if (!result || typeof result !== 'string') {
          reject(new Error('Failed to read file'));
          return;
        }

        // Extract the base64 part (remove the data URL prefix)
        const base64 = result.split(',')[1];

        if (!base64) {
          reject(new Error('Invalid base64 data'));
          return;
        }

        resolve(base64);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = error => {
      reject(error);
    };

    // Read the file as a data URL (which gives us base64)
    reader.readAsDataURL(file);
  });
};
