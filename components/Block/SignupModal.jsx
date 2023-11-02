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
import { signUpSchema } from "@/schema";
import { SIGNUP_INITIAL_FORM_VALUE } from "@/lib/constant";
import { handleSignup } from "@/apis/auth";
import { removeValidationError } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

export const SignupModal = ({ isOpen, onClose }) => {
  const { values, touched, errors, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: SIGNUP_INITIAL_FORM_VALUE,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        handleSignup({
          name: values.full_name,
          email: values.email,
          password: values.password,
          onClose,
        });
      },
    });

  return (
    <div>
      <AlertDialog
        open={isOpen}
        onOpenChange={() => removeValidationError(errors)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Sign Up</AlertDialogTitle>
            <AlertDialogDescription>
              Create an account to get started.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Signup Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                name="full_name"
                placeholder="Enter your name"
                required={true}
                value={values.full_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.full_name && errors.full_name && (
                <p className="text-red-500 text-sm">{errors.full_name}</p>
              )}
            </div>
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
            <div className="flex flex-col gap-1">
              <Input
                type="password"
                name="confirm_password"
                required={true}
                placeholder="Confirm your password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.confirm_password && errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {errors.confirm_password}
                </p>
              )}
            </div>
          </form>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => onClose(false)}>
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </div>
  );
};
