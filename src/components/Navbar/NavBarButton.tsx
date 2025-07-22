import { Button, ConfigProvider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const NavBarButton = ({
  btnText,
  pathName,
}: {
  btnText: string;
  pathName: string;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathName);
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
    </ConfigProvider>
  );
};

export default NavBarButton;
