import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {

  const { showPassword, setShowPassword } = useState(false)
  const { formData, setFormData } = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { isSignUp, signUp } = useAuthStore()
  return <div>SignUpPage</div>;
};

export default SignUpPage;
