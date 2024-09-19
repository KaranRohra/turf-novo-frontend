"use client";
import ProfileForm from "@/components/accounts/ProfileForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UI_PATH from "@/constants/ui-path-constants";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="flex justify-center pt-10">
      <Card className="w-[400px] h-[650px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm handleSubmit={() => {}} showFirstNameField showLastNameField showPhoneNumberField showConfirmPasswordField>
            <div className="flex justify-between w-full mt-2">
              <Button type="button" variant="outline" className="hover:bg-gray-200 w-1/2 mr-2">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 w-1/2 ml-2">
                Register
              </Button>
            </div>
          </ProfileForm>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Link href={UI_PATH.LOGIN} className="text-blue-500 hover:underline">
            Already have an account? Login here.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
