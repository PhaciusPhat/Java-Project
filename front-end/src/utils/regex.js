export const regexUsername = "^[a-zA-Z0-9]{6,}$";
export const regexPassword = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$";
export const regexEmail =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
export const regexName =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;
export const regexPhone = "^[0-9]{10,}$";
export const regexAddress = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_0-9]{6,}$/g;
export const regexDate = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
export const regexNumber = "^[0-9]{1,}$";
export const regexPrice = "^[0-9]{1,}$";
export const regexImage = "^[a-zA-Z0-9]{6,}$";
export const regexUrl = "^[a-zA-Z0-9]{6,}$";