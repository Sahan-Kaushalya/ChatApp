export const validateFirstName = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "First Name is Requried !";
    }

    return null;
}

export const validateLastName = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Last Name is Requried !";
    }

    return null;
}

export const validateCountryCode = (countryCode: string): string | null => {
   const regex = /^\+[1-9]\d{0,2}$/; // + followed by 1-3 digits
   if (!countryCode) {
       return "Country Code is Required!";
   }

   if (!regex.test(countryCode)) {
       return "Enter a Valid Country Code!";
   }

   return null;
}

export const validatePhoneNo = (phoneNo: string): string | null => {
   const regex = /^[1-9]\d{6,14}$/; // 7-15 digits, no leading zero
   if (!phoneNo) {
       return "Contact Number is Required!";
   }

   if (!regex.test(phoneNo)) {
       return "Enter a Valid Contact Number!";
   }

   return null;
}

export const validateProfileImage = (image: {
    uri:string,
    type?:string,
    fileSize?:number,
}| null): string | null => {
   if(!image){
    return "Profile Image is Requried !";
   }

   if(image.type && !["image/jpeg","image/jpg","image/png"].includes(image.type)){
    return "Select a Valid image type (JPEG , JPG , PNG)!";
   }

   if(image.fileSize && image.fileSize > 10*1024*1024){
    // 10 MB
    return "Profile Image must be less than 10 MB !";
   }

   return null;
}