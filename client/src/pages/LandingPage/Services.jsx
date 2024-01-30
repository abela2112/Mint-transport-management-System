import React from 'react';
import styled from 'styled-components';


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
  return (
    <>
      <FirstContainer id='services'>
        <ServiceSection>
          <Title>Services</Title>
        </ServiceSection>
        <ServiceSection>
          <Title>1. Order a Vehicle</Title>
          <Text>
            This service allows users to request and order vehicles for various purposes. It could be for official use, transportation, or any other specific need.
          </Text>
          <Text2>
            Users can specify their requirements, such as the type of vehicle, number of passengers, and the desired pickup and drop-off locations. The ministry ensures the efficient allocation and dispatch of vehicles to fulfill the orders, enhancing accessibility and convenience.
          </Text2>
        </ServiceSection>
        <DecorativeLine />
        <ServiceSection>
          <Title>2. Scheduling</Title>
          <Text>
            The scheduling service helps individuals and organizations plan and manage their transportation needs effectively.
          </Text>
          <Text2>
            Users can schedule vehicle pickups and drop-offs at specific times and dates, ensuring that transportation is available when needed. This service optimizes the utilization of vehicles and resources, reducing waiting times and enhancing overall transportation efficiency.
          </Text2>
        </ServiceSection>
        <DecorativeLine />
        <ServiceSection>
          <Title>3. Reporting and Analytics</Title>
          <Text>
            Reporting and analytics services provide valuable insights and data-driven information related to transportation and vehicle usage.
          </Text>
          <Text2>
            Users can access reports and analytics on various aspects, including vehicle utilization, route efficiency, passenger trends, and more. The ministry uses data to make informed decisions, improve services, and address any potential issues or challenges in the transportation system.
          </Text2>
          <Text2>
            These services offered by the Ministry of Innovation and Technology aim to enhance transportation accessibility, efficiency, and overall user experience, ultimately contributing to a more effective and streamlined transportation system.
          </Text2>
        </ServiceSection>
      </FirstContainer>
    </>
  );
};

export default Services;
