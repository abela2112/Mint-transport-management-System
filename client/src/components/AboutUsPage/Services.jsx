import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "react-i18next"

const FirstContainer = styled.section`
  background: white;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServiceSection = styled.div`
  margin: 20px;
  padding: 20px;
  border: 2px solid #3586ff;
  border-radius: 10px;
  max-width: 80%;
  background: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
`;

const Text2 = styled.p`
  font-size: 14px;
  color: #555;
  margin: 10px 0;
`;

const DecorativeLine = styled.hr`
  background-color: #3586ff;
  height: 2px;
  border: none;
  margin: 20px 0;
`;

const Services = () => {
  const {t}=useTranslation('global')
  return (
    <div>
    <FirstContainer id='services'>
      <ServiceSection>
        <Title>{t("Services.services")}</Title>
      </ServiceSection>
      <ServiceSection>
        <Title>{t("Services.order")}</Title>
        <Text>
          {t("Services.firstOrderText")}
        </Text>
        <Text2>
         {t("Services.secondOrderText")} 
        </Text2>
      </ServiceSection>
      <DecorativeLine />
      <ServiceSection>
        <Title>{t("Services.schedule")}</Title>
        <Text>
          {t("Services.firstScheduleText")}
        </Text>
        <Text2>
          {t("Services.secondScheduleText")}
        </Text2>
      </ServiceSection>
      <DecorativeLine />
      <ServiceSection>
        <Title>{t("Services.report")}</Title>
        <Text>
          {t("Services.firstReportText")}
        </Text>
        <Text2>
          {t("Services.secondReportText")}
        </Text2>
      </ServiceSection>
    </FirstContainer>
    </div>
  );
};

export default Services;
