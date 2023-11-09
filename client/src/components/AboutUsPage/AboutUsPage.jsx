import React from 'react';
import styled from 'styled-components';

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
  return (
    <AboutUsContainer id='about'>
      <Title>About Us</Title>
      <Content>
        The Ministry of Innovation and Technology is at the forefront of driving technological advancements and innovations to transform our society. Our commitment to progress and excellence is unwavering, and we aim to lead the way in shaping a brighter future.
      </Content>
      <MissionVision>
        <SectionTitle>Our Mission</SectionTitle>
        <Mission>
          To harness the power of innovation and technology to address challenges, improve lives, and drive sustainable development in Ethiopia.
        </Mission>
        <SectionTitle>Our Vision</SectionTitle>
        <Content>
          To be a catalyst for innovation and technological advancements, enabling Ethiopia to become a global leader in technology-driven solutions.
        </Content>
      </MissionVision>
      <Content>
        At the core of our mission are our values:
        <ValueList>
          <ValueListItem>Innovation: Embracing creativity and change to find solutions.</ValueListItem>
          <ValueListItem>Collaboration: Working together to achieve common goals.</ValueListItem>
          <ValueListItem>Transparency: Open and honest communication and decision-making.</ValueListItem>
          <ValueListItem>Excellence: Striving for the highest standards of quality and performance.</ValueListItem>
        </ValueList>
      </Content>
      <SectionTitle>Our Leadership</SectionTitle>
      <Content>
        Meet our dedicated team of professionals who are committed to driving innovation and technology forward in Ethiopia.
      </Content>
      {/* You can list the leadership team here. */}
    </AboutUsContainer>
  );
};

export default AboutUsPage;
