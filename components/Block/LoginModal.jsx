import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useFormik } from "formik";
import { Input } from "@/components/ui";
import { loginSchema } from "@/schema";
import { LOGIN_INITIAL_FORM_VALUE } from "@/lib/constant";
import { removeValidationError } from "@/lib/utils";
import { handleLogin } from "@/apis/auth";

export const LoginModal = ({ isOpen, onClose }) => {
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: LOGIN_INITIAL_FORM_VALUE,
      validationSchema: loginSchema,
      onSubmit: (values) => {
        handleLogin({
          email: values.email,
          password: values.password,
          onClose,
        });
      },
    });

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => removeValidationError(errors)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Login</AlertDialogTitle>
          <AlertDialogDescription>Login to Dashboard</AlertDialogDescription>
        </AlertDialogHeader>

        {/* Signup Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required={true}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              type="password"
              name="password"
              required={true}
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose(false)}>
            Go Back
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Login</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
