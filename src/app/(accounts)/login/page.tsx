"use client";
import { apiTemplate } from "@/api/api-template";
import { Endpoints, Methods } from "@/api/constants";
import LoadingScreen from "@/app/loading";
import ProfileForm, { ProfileFormFields } from "@/components/accounts/ProfileForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UI_PATH from "@/constants/ui-path-constants";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [_, setCookie] = useCookies();

  const handleFormSubmit = async (formData: ProfileFormFields) => {
    setLoading(true);
    const res = await apiTemplate({
      method: Methods.POST,
      url: Endpoints.LOGIN,
      data: { ...formData },
    });
    if (res.data.token) {
      setCookie("token", res.data.token);
    } else {
      toast({
        variant: "destructive",
        title: res.data.message || "An error occurred",
      });
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <LoadingScreen message="Logging in, please wait..." />}
      <div className="flex justify-center pt-10">
        <Card className="w-[400px] h-[400px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Access your account by logging in.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm handleSubmit={handleFormSubmit} clearErrors={loading}>
              <div className="flex justify-between w-full mt-2">
                <Button type="button" variant="outline" className="hover:bg-gray-200 w-1/2 mr-2">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 w-1/2 ml-2">
                  Login
                </Button>
              </div>
            </ProfileForm>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Link href={UI_PATH.REGISTER} className="text-blue-500 hover:underline">
              Don't have an account? Register here.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
