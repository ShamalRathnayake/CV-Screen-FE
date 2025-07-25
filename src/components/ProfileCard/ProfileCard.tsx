import { Avatar, Button } from "antd";
import {
  GithubOutlined,
  HomeOutlined,
  LinkedinOutlined,
  MailOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { JDMatchResult } from "../../services/predictionApi/predictionApi";

type ProfileCardProps = {
  selectedCv: JDMatchResult | null;
};

const ProfileCard = ({ selectedCv }: ProfileCardProps) => {
  return (
    <div className="flex flex-grow">
      <Avatar
        size={128}
        icon={!selectedCv?.image ? <UserOutlined /> : undefined}
        src={
          selectedCv?.image ? (
            <img
              src={`data:image/png;base64,${selectedCv?.image}`}
              alt="profile"
            />
          ) : undefined
        }
      />
      <div className="flex-grow p-2 px-6">
        <p className="text-white font-bold mb-2">
          {selectedCv?.extractedCv?.personalInfo?.fullName}
        </p>
        <div className="flex text-white text-xs font-light my-2">
          {selectedCv?.extractedCv?.personalInfo?.phone && (
            <span className="mr-3">
              <MobileOutlined />
            </span>
          )}
          <p>{selectedCv?.extractedCv?.personalInfo?.phone}</p>
        </div>
        <div className="flex text-white text-xs font-light my-2">
          {selectedCv?.extractedCv?.personalInfo?.email && (
            <span className="mr-3">
              <MailOutlined />
            </span>
          )}
          <p>{selectedCv?.extractedCv?.personalInfo?.email}</p>
        </div>
        <div className="flex text-white text-xs font-light my-2">
          {selectedCv?.extractedCv?.personalInfo?.address && (
            <span className="mr-3">
              <HomeOutlined />
            </span>
          )}
          <p>{selectedCv?.extractedCv?.personalInfo?.address}</p>
        </div>
        <div className="flex mt-3 items-center">
          {selectedCv?.extractedCv?.personalInfo?.githubUrl && (
            <Button
              icon={<GithubOutlined />}
              href={selectedCv?.extractedCv?.personalInfo?.githubUrl}
              target="_blank"
              color="cyan"
              variant="outlined"
              style={{ backgroundColor: "transparent" }}
            >
              Github
            </Button>
          )}
          {selectedCv?.extractedCv?.personalInfo?.linkedinUrl && (
            <Button
              icon={<LinkedinOutlined />}
              href={selectedCv?.extractedCv?.personalInfo?.linkedinUrl}
              target="_blank"
              color="primary"
              variant="outlined"
              style={{
                backgroundColor: "transparent",
                margin: "5px",
              }}
            >
              LinkedIn
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
