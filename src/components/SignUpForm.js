import { registrationUserAsync } from "../store/actions/userActions";
import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
export const SignUpForm = () => {
    const {
        register, 
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset, 
    } = useForm({ mode: "all" });

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const registrationSubmit = (data) => {
        reset();
        dispatch(registrationUserAsync(data.email, data.nickname, data.password));
        navigate('/', { replace: true });
    }
    
	return (
		<div className="signup auth-container">
            <h2 className="signup-title auth-title">Sign Up</h2>
            <form className="form-signup form" onSubmit={handleSubmit(registrationSubmit)}>

                <label className="auth-label">
                    <p>
                        Email
                    </p>
                    <input {...register('email', { required: "Is Required" })} type="email" className="auth-mail"/>
                </label>
                <div className="auth-error">
                    {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
                </div>

                <label className="auth-label">
                    <p>
                        Nickname
                    </p>
                    <input {...register('nickname', { required: "Is Required" })} type="text" className="auth-name"/>
                </label>
                <div className="auth-error">
                    {errors?.nickname && <p>{errors?.nickname?.message || "Error!"}</p>}
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
                    })} type="password" className="auth-pass"/>
                </label>
                 <div className="auth-error">
                    {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
                </div>

                <button type="submit" className="confirm-button button" disabled={!isValid}>Sign Up</button>
            </form>
            <p className="redirect">Already have an account?</p>
            <NavLink className="button redirect-button" to="/">Log in</NavLink>
        </div>
	);
}
