
type TUserName = {
    firstName: string;
    lastName: string;
}

type TUserAddress = {
    street: string;
    city: string;
    country: string
}

type TOrderProduct = {
    productName: string;
    price: number;
    quantity: number
}

type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TUserAddress;
    orders: TOrderProduct[]
}
export { TUser, TUserName, TUserAddress, TOrderProduct }