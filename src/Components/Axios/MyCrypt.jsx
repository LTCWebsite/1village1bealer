import CryptoJS from 'crypto-js'

export const MyCrypt = (Type, Value) => {
    if (Type === 'en') {
        return CryptoJS.AES.encrypt(Value, "secret_key").toString()
    } else if (Type === 'de') {
        return JSON.parse(CryptoJS.AES.decrypt(Value, "secret_key").toString(CryptoJS.enc.Utf8))
    } else if(Type === 'des'){
        return CryptoJS.AES.decrypt(Value, "secret_key").toString()
    }
}
export const MyCryptTry = (Type, Value) => {
    try {
        if (Type === 'en') {
            return CryptoJS.AES.encrypt(Value, "secret_key").toString()
        } else if (Type === 'de') {
            return JSON.parse(CryptoJS.AES.decrypt(Value, "secret_key").toString(CryptoJS.enc.Utf8))
        } else if(Type === 'des'){
            return CryptoJS.AES.decrypt(Value, "secret_key").toString()
        }
    } catch (error) {
        return '';
    }
}

export const MyCryptTryLTC = (Type, Value) => {
    try {
        if (Type === 'en') {
            return CryptoJS.AES.encrypt(Value, "secret_key_kk").toString()
        } else if (Type === 'de') {
            return JSON.parse(CryptoJS.AES.decrypt(Value, "secret_key_kk").toString(CryptoJS.enc.Utf8))
        } else if(Type === 'des'){
            return CryptoJS.AES.decrypt(Value, "secret_key_kk").toString()
        }
    } catch (error) {
        return '';
    }
}