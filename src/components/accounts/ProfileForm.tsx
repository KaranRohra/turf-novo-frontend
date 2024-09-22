"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export interface ProfileFormFields {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNo?: string;
  password?: string;
  confirmPassword?: string;
}

interface ProfileFormProps {
  handleSubmit: (formData: ProfileFormFields) => void;
  showFirstNameField?: boolean;
  showLastNameField?: boolean;
  showEmailField?: boolean;
  showPhoneNumberField?: boolean;
  showPasswordField?: boolean;
  showConfirmPasswordField?: boolean;
  clearErrors?: boolean;
  defaultValues?: ProfileFormFields;
  disabledFields?: Partial<Record<keyof ProfileFormFields, boolean>>;
  children?: React.ReactNode;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  handleSubmit,
  children,
  showFirstNameField = false,
  showLastNameField = false,
  showEmailField = true,
  showPhoneNumberField = false,
  showPasswordField = true,
  showConfirmPasswordField = false,
  clearErrors = false,
  defaultValues = {},
  disabledFields = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (clearErrors) {
      setErrors({});
    }
  }, [clearErrors]);

  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const firstName = form.firstName?.value.trim();
    const lastName = form.lastName?.value.trim();
    const email = form.email?.value.trim();
    const phoneNumber = form.phoneNumber?.value.trim();
    const password = form.password?.value.trim();
    const confirmPassword = form.confirmPassword?.value.trim();

    let isValid = true;
    const errors: { [key: string]: string } = {};

    if (showFirstNameField && (!firstName || firstName.length < 2)) {
      isValid = false;
      errors.firstName = "First name must be at least 2 characters long.";
    }

    if (showLastNameField && (!lastName || lastName.length < 2)) {
      isValid = false;
      errors.lastName = "Last name must be at least 2 characters long.";
    }

    if (showEmailField && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      isValid = false;
      errors.email = "Please enter a valid email address.";
    }

    if (showPhoneNumberField && (!phoneNumber || !/^\d{10}$/.test(phoneNumber))) {
      isValid = false;
      errors.phoneNumber = "Please enter a valid 10-digit phone number.";
    }

    if (showPasswordField && (!password || password.length < 8)) {
      isValid = false;
      errors.password = "Password must be at least 8 characters long.";
    }

    if (showConfirmPasswordField && password !== confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!isValid) {
      // Display errors to the user
      setErrors(errors);
      return;
    }

    // If the form is valid, call the handleSubmit function
    handleSubmit({
      firstName,
      lastName,
      email,
      phoneNo: phoneNumber,
      password,
      confirmPassword,
    });
  };

  return (
    <div>
      <form onSubmit={validateForm}>
        <div className="grid w-full items-center gap-4">
          {showFirstNameField && (
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  required
                  defaultValue={defaultValues.firstName}
                  disabled={disabledFields.firstName}
                />
                {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
              </div>
              {showLastNameField && (
                <div className="flex flex-col space-y-1.5 w-1/2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" type="text" placeholder="Last name" defaultValue={defaultValues.lastName} required disabled={disabledFields.lastName} />
                  {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
                </div>
              )}
            </div>
          )}
          {showEmailField && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email" defaultValue={defaultValues.email} required disabled={disabledFields.email} />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
          )}
          {showPhoneNumberField && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" placeholder="Phone number" defaultValue={defaultValues.phoneNo} required disabled={disabledFields.phoneNo} />
              {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
            </div>
          )}
          {showPasswordField && (
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor="password">Password</Label>
              <div className="flex">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  defaultValue={defaultValues.password}
                  required
                  disabled={disabledFields.password}
                />
                <Button type="button" variant="outline" className="ml-3 p-2" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>
          )}
          {showConfirmPasswordField && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                defaultValue={defaultValues.confirmPassword}
                required
                disabled={disabledFields.confirmPassword}
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
            </div>
          )}
          {children}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
