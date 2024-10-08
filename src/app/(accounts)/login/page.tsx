"use client";
import { Endpoints, Methods } from "@/api/constants";
import LoadingScreen from "@/app/loading";
import ProfileForm, { ProfileFormFields } from "@/components/accounts/ProfileForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UI_PATH from "@/constants/ui-path-constants";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/providers/user-provider";
import { apiCall } from "@/utils/utils-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Cookies } from "react-cookie";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const userContext = useUser();

  const handleFormSubmit = async (formData: ProfileFormFields) => {
    setLoading(true);
    const res = await apiCall({
      method: Methods.POST,
      url: Endpoints.LOGIN,
      data: { ...formData },
    });
    if (res.data.token) {
      cookies.set("token", res.data.token);
      const userResponse = await apiCall({
        method: Methods.GET,
        url: Endpoints.USER,
      });
      userContext.setUser(userResponse.data);
      toast({
        variant: "success",
        title: "Logged in successfully",
      });
      router.push(UI_PATH.HOME);
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
                <Button onClick={() => router.push(UI_PATH.HOME)} type="button" variant="outline" className="hover:bg-gray-200 w-1/2 mr-2">
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
              Don&apos;t have an account? Register here.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
