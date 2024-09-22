"use client";
import { Endpoints, Methods } from "@/api/constants";
import LoadingScreen from "@/app/loading";
import ProfileForm, { ProfileFormFields } from "@/components/accounts/ProfileForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UI_PATH from "@/constants/ui-path-constants";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/providers/user-provider";
import { apiCall } from "@/utils/utils-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const { user, setUser } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (formData: ProfileFormFields) => {
    setLoading(true);
    const res = await apiCall({
      method: Methods.PUT,
      url: Endpoints.USER,
      data: { ...formData },
    });
    if (res.data.message) {
      toast({
        variant: "destructive",
        title: res.data.message,
      });
    } else {
      toast({
        variant: "success",
        title: "Profile updated successfully",
      });
      setUser(res.data);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <LoadingScreen message="Creating account, please wait..." />}
      <div className="flex justify-center pt-10">
        <Card className="w-[400px] h-[600px]">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              handleSubmit={handleFormSubmit}
              showFirstNameField
              showLastNameField
              showPhoneNumberField
              showConfirmPasswordField
              clearErrors={loading}
              defaultValues={(user || {}) as ProfileFormFields}
              disabledFields={{ email: true }}
            >
              <div className="flex justify-between w-full mt-2">
                <Button onClick={() => router.push(UI_PATH.HOME)} type="button" variant="outline" className="hover:bg-gray-200 w-1/2 mr-2">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 w-1/2 ml-2">
                  Save
                </Button>
              </div>
            </ProfileForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
