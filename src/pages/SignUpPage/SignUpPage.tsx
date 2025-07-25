import NavBar from "../../components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/useAppDispatch";
import { setLoadingState } from "../../state/settings/settingsSlice";
import toast from "react-hot-toast";
import {
  useLazyCheckEmailQuery,
  useSignupMutation,
  type RegisterRequest,
} from "../../services/userApi/userApi";
import { Tabs, type TabsProps } from "antd";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import PaymentForm from "../../components/PaymentForm/PaymentForm";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("1");
  const [formData, setFormData] = useState<RegisterRequest | null>(null);

  const [signup, { isLoading }] = useSignupMutation();
  const [trigger] = useLazyCheckEmailQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoadingState({ isLoading }));
  }, [dispatch, isLoading]);

  const onSubmit = async () => {
    try {
      if (!formData) return;
      const response = await signup(formData).unwrap();
      if (response.status) {
        toast.success("Signup successful!");
        await navigate("/dashboard");
      } else throw new Error(response.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Signup failed!");
    }
  };

  const formSubmitHandler = async (data: RegisterRequest) => {
    dispatch(setLoadingState({ isLoading: true }));

    const checkEmailResponse = await trigger(data.email, true);
    if (checkEmailResponse.data?.data) {
      toast.error("Account already exists with given email");
      dispatch(setLoadingState({ isLoading: false }));
      return;
    }
    dispatch(setLoadingState({ isLoading: false }));

    setFormData(data);
    setActiveTab("2");
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "",
      children: <SignUpForm submitFormData={formSubmitHandler} />,
    },
    {
      key: "2",
      label: "",
      children: <PaymentForm onFormSubmit={onSubmit} />,
    },
  ];

  return (
    <div>
      <div className={"w-screen h-screen bg-(--color-theme-bg) dot-bg"}>
        <div className={"flex flex-col w-screen h-screen"}>
          <div className={"w-full h-auto"}>
            <NavBar isHomeActive={true} isSignInActive={true} />
          </div>
          <div className={"w-full h-full relative overflow-y-auto"}>
            <div
              className={
                "  min-w-md min-h-fit max-w-2xl absolute top-25 left-1/2 -translate-x-1/2 "
              }
            >
              <Tabs
                defaultActiveKey="1"
                items={items}
                renderTabBar={() => <span> </span>}
                activeKey={activeTab}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
