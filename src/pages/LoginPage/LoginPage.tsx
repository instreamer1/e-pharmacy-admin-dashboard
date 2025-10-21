import { Link, useNavigate } from 'react-router-dom'
import css from './LoginPage.module.css'
import { useState } from 'react'
import MainContent from '../../components/MainContent/MainContent'
import Logo from '../../components/Logo/Logo'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAppDispatch } from '../../store/hooks'
import toast from 'react-hot-toast'
import { loginSchema } from '../../schemas/loginSchema'
import { logInUser } from '../../store/authSlice/operations'
import { normalizeError } from '../../utils/normalizeError'
// import LineContainer from '../../components/LineContainer/LineContainer';

type LoginFormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    const email = data.email.trim()
    const password = data.password.trim()
    try {
      await dispatch(logInUser({ email, password })).unwrap()
      toast.success('User registered successfully!')
      reset()
      // await dispatch(fetchCurrentUser()).unwrap();
      // navigate('/dashboard')
    } catch (error) {
      const normalized = normalizeError(error)
      navigate('/login')
      reset()
      toast.error(normalized.message)
    }
  }

  return (
    <section className={css.loginPage}>
      <div className={css.container}>
        <div className={css.descriptionBlock}>
          <Logo />
          <MainContent />
        </div>
        <div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.inputsWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  <input
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    {...register('email')}
                    className={css.registerInput}
                  />
                  {errors.email && <p className={css.error}>{errors.email.message}</p>}
                </label>
              </div>

              <div className={css.inputWrapper}>
                <label className={css.label}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="new-password"
                    {...register('password')}
                    className={css.registerInput}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={css.eyeButton}
                >
                  <span className={css.eyeIcon}>{showPassword ? <FiEyeOff /> : <FiEye />}</span>
                </button>
                {errors.password && <p className={css.error}>{errors.password.message}</p>}
              </div>
            </div>

            <div className={css.btnWrapper}>
              <button
                aria-label="Sign up"
                type="submit"
                disabled={!isValid || isSubmitting}
                className={css.submitBtn}
              >
                {isSubmitting ? ' Log In...' : ' Log In Now'}
              </button>
            </div>
          </form>
          {/* <div className={css.navWrapper}>
            <Link to="/register" className={css.navLink}>
              Don't have an account?
            </Link>
          </div> */}
        </div>
      </div>
      <div className={css.lineContainerWrapper}>{/* <LineContainer /> */}</div>
    </section>
  )
}

export default LoginPage
