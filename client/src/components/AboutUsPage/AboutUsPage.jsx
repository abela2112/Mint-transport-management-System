import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "react-i18next"
const AboutUsContainer = styled.section`
  background-color: #f0f0f0;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
  font-size: 36px;
  margin-bottom: 20px;
`;

const Content = styled.p`
  color: #555;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const MissionVision = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #333;
  font-size: 28px;
  margin-bottom: 15px;
`;

const Mission = styled(Content)`
  font-weight: bold;
`;

const ValueList = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

const ValueListItem = styled.li`
  color: #555;
  font-size: 18px;
  margin-bottom: 10px;
`;

const AboutUsPage = () => {
  const {t}=useTranslation('global')
  return (
    <AboutUsContainer id='about'>
      <Title>{t("AboutUsPage.title")}</Title> 
      <Content>
        {t("AboutUsPage.content")}
      </Content>
      <MissionVision>
        <SectionTitle>{t("AboutUsPage.mission")}</SectionTitle>
        <Mission>
          {t("AboutUsPage.missionStatement")}
        </Mission>
        <SectionTitle>{t("AboutUsPage.vision")}</SectionTitle>
        <Content>
          {t("AboutUsPage.visionStatement")}
        </Content>
      </MissionVision>
      <Content>
        {t("AboutUsPage.coreMission")}
        <ValueList>
          <ValueListItem>{t("AboutUsPage.innovation")}</ValueListItem>
          <ValueListItem>{t("AboutUsPage.collaboration")}</ValueListItem>
          <ValueListItem>{t("AboutUsPage.transparency")}</ValueListItem>
          <ValueListItem>{t("AboutUsPage.excellence")}</ValueListItem>
        </ValueList>
      </Content>
      <SectionTitle>{t("AboutUsPage.leadership")}</SectionTitle>
      <Content>
        {t("AboutUsPage.leadershipStatement")}
      </Content>
      {/* You can list the leadership team here. */}
    </AboutUsContainer>
  );
};

export default AboutUsPage;
