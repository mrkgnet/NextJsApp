import LoginForm from "@/components/login_form/LoginForm";

export default function Login({ isAuth, setIsAuth }) {
    return (
        <div>
            <LoginForm isAuth={isAuth} setIsAuth={setIsAuth} />
        </div>
    );
}
