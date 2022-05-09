import { CustomLink } from "../CustomLink";
import { NavLink } from "react-router-dom"
import { useForm } from "react-hook-form"
import { authorizationUserAsync, getUserListAsync } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
export const LogInForm: React.FC= () => {
    const navigate = useNavigate();

    const {
        register, 
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset, 
    } = useForm({
        mode: "all"
    });

    const {getUserListAsync, authorizationUserAsync} = useActions();

    const submitAuthentication = (data: any) => {
        getUserListAsync();
        authorizationUserAsync(data.email, data.password);
        reset();
        navigate('/', { replace: true });
    }

	return (
        <div className="login auth-container">
            <h2 className="login-title auth-title">Log In</h2>
            <form className="form-login form" onSubmit={handleSubmit(submitAuthentication)}>
                <label className="auth-label">
                    <p>
                        Email
                    </p>
                    <input {...register('email', { required: "Is Required" })} type="email" className="auth-mail" />
                </label>
                <div className="auth-error">
                    {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
                </div>

                <label className="auth-label">
                    <p>
                        Password
                    </p>
                    <input {...register('password', {
                        required: "Is Required", 
                        minLength: {
                            value: 8, 
                            message: "Minimum 8 symbols"
                        }
                    })} type="password" className="auth-pass" />
                </label>
                <div className="auth-error">
                    {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
                </div>

                <button type="submit" className="confirm-button button" disabled={!isValid}>Log In</button>
            </form>
            <p className="redirect">New user?</p>
            <NavLink className="button redirect-button" to="/signup">Create an account</NavLink>
        </div>
	);
}
