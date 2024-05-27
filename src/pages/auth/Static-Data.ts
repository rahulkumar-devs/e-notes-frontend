import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa"; // Importing the icons
import { IconType } from "react-icons/lib";

type SignInFieldName = "email" | "password";

interface SignInInterface {
    name: SignInFieldName;
    placeholder: string;
    icon: IconType;
}

export const SigninData: SignInInterface[] = [
    {
        name: "email",
        placeholder: "e-notes@gmail.com",
        icon: MdAlternateEmail,  
    },
    {
        name: "password",
        placeholder: "* * * * *",
        icon: FaLock,  
    },
];
