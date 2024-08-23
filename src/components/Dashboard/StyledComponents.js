import styled from "styled-components";

export const DashboardContainer = styled.div`
  background-color: #000;
  min-height: 100vh;
  color: #fff;
`;

export const WidgetContainer = styled.div`
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 1.2em;
  text-align: center;
  cursor: grabbing;
  user-select: none;
  &.react-grid-item.react-grid-placeholder {
    background: none;
    border: 2px dotted #aaa;
  }
`;

export const GridTitle = styled.h2`
  font-size: 1.8em;
  color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  text-align: center;
`;

export const RecruitmentStats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatLabel = styled.div`
  font-size: 1em;
  margin-top: 10px;
  color: #ccc;
`;

export const StatValue = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 5px;
`;

export const ProgressBarContainer = styled.div`
  width: 60px;
  height: 60px;
`;

export const FormButton = styled.button`
  background-color: #00e676;
  color: #000;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #00c853;
  }
`;

export const ChartContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
`;

export const ExportButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const ExportButton = styled.button`
  background-color: #1a73e8;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  flex: 1 1 30%;
  min-width: 120px;
  text-align: center;

  &:hover {
    background-color: #135ab2;
  }

  @media (max-width: 768px) {
    flex: 1 1 40%;
  }
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
  animation: fadeInOut 6s ease-in-out;

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
  }
`;
