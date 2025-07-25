import { Button, ConfigProvider, Modal } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/useAppDispatch";
import { logout } from "../../state/auth/authSlice";

const NavBarButton = ({
  btnText,
  pathName,
}: {
  btnText: string;
  pathName: string;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (pathName === "/signout") showModal();
    else navigate(pathName);
  };

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    dispatch(logout());
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorText: pathName === pathname ? "#4370EA" : "#ffffff",
            defaultBg:
              pathName === pathname ? "rgba(255, 255, 255, 0.10)" : "#ffffff",
            fontWeight: 300,
            fontSize: 12,
            textHoverBg: "rgba(255, 255, 255, 0.13)",
            defaultBorderColor: "#00000000",
            defaultHoverBg: "rgba(255, 255, 255, 0.10)",
            defaultHoverBorderColor: "#00000000",
          },
        },
      }}
    >
      <Button
        type={pathName === pathname ? "default" : "text"}
        onClick={handleClick}
      >
        {btnText}
      </Button>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#052a4f",
              headerBg: "#052a4f",
              titleColor: "#ffffff",
            },
          },
        }}
      >
        <Modal
          title="Logout"
          open={open}
          onOk={hideModal}
          onCancel={hideModal}
          okText="Sign Out"
          cancelText="Cancel"
          centered
          closable={false}
          maskClosable={false}
          cancelButtonProps={{
            style: {
              background: "#2B8128FF",
            },
          }}
          okButtonProps={{
            style: {
              background: "#8B1414FF",
            },
          }}
        >
          <p className="text-white">Are you sure to logout?</p>
        </Modal>
      </ConfigProvider>
    </ConfigProvider>
  );
};

export default NavBarButton;
