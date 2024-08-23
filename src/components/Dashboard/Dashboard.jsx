import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  DashboardContainer,
  WidgetContainer,
  GridTitle,
  RecruitmentStats,
  StatItem,
  StatLabel,
  StatValue,
  ProgressBarContainer,
  FormButton,
  ChartContainer,
  ExportButtonContainer,
  ExportButton,
  Notification
} from './StyledComponents';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { data, options, pieData, pieOptions, layout, cols, breakpoints, exportPDF, exportExcel, exportCSV, shareViaEmail } from "../data/functionsData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const navigate = useNavigate();

  const [mouseDownPos, setMouseDownPos] = useState(null);
  const buttonRef = useRef(null);
  const [actionToPerform, setActionToPerform] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const copyLinkToClipboard = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000);
    });
  };

  const handleMouseDown = (e) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    if (mouseDownPos) {
      const dx = Math.abs(e.clientX - mouseDownPos.x);
      const dy = Math.abs(e.clientY - mouseDownPos.y);

      // If the mouse hasn't moved more than 5 pixels, consider it a click
      if (dx < 5 && dy < 5) {
        console.log('Button clicked, navigating to /custom-form');
        navigate('/custom-form');
      }
    }
    setMouseDownPos(null);
  };

  const handleTouchStart = (e) => {
    setMouseDownPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e) => {
    if (mouseDownPos) {
      const dx = Math.abs(e.changedTouches[0].clientX - mouseDownPos.x);
      const dy = Math.abs(e.changedTouches[0].clientY - mouseDownPos.y);

      // If the touch hasn't moved more than 5 pixels, consider it a click
      if (dx < 5 && dy < 5) {
        console.log('Button clicked, performing action');
        navigate("/custom-form")
        if (actionToPerform) {
          actionToPerform();
          
        }
      }
    }
    setMouseDownPos(null);
    setActionToPerform(null);
  };

  const handlesMouseDown = (e, action) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
    setActionToPerform(action);
  };

  const handlesMouseUp = (e) => {
    if (mouseDownPos) {
      const dx = Math.abs(e.clientX - mouseDownPos.x);
      const dy = Math.abs(e.clientY - mouseDownPos.y);

      // If the mouse hasn't moved more than 5 pixels, consider it a click
      if (dx < 5 && dy < 5) {
        console.log('Button clicked, performing action');
        if (actionToPerform) {
          actionToPerform();
        }
      }
    }
    setMouseDownPos(null);
    setActionToPerform(null);
  };

  

  return (
    <DashboardContainer>
      {showNotification && (
        <Notification>
          Link copied to clipboard
        </Notification>
      )}
      <GridTitle>Dashboard</GridTitle>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={100}
        isResizable={true}
        isDraggable={true}
        isDroppable={false}
      >
        <WidgetContainer key="a">
          <div style={{ padding: '20px' }}>
            <h3>Recruitment Analysis</h3>
            <RecruitmentStats>
              <StatItem>
                <ProgressBarContainer>
                  <CircularProgressbar
                    value={75}
                    text={`${75}%`}
                    styles={buildStyles({
                      pathColor: `#00e676`,
                      textColor: '#00e676',
                      trailColor: '#333',
                    })}
                  />
                </ProgressBarContainer>
                <StatLabel>Hired</StatLabel>
                <StatValue>75%</StatValue>
              </StatItem>
              <StatItem>
                <ProgressBarContainer>
                  <CircularProgressbar
                    value={15}
                    text={`${15}%`}
                    styles={buildStyles({
                      pathColor: `#ff1744`,
                      textColor: '#ff1744',
                      trailColor: '#333',
                    })}
                  />
                </ProgressBarContainer>
                <StatLabel>Rejected</StatLabel>
                <StatValue>15%</StatValue>
              </StatItem>
              <StatItem>
                <ProgressBarContainer>
                  <CircularProgressbar
                    value={10}
                    text={`${10}%`}
                    styles={buildStyles({
                      pathColor: `#ff9100`,
                      textColor: '#ff9100',
                      trailColor: '#333',
                    })}
                  />
                </ProgressBarContainer>
                <StatLabel>Pending</StatLabel>
                <StatValue>10%</StatValue>
              </StatItem>
            </RecruitmentStats>
          </div>
        </WidgetContainer>

        <WidgetContainer key="b">
          <div style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: "10px" }}>Custom Reports</h3>
            <FormButton
              ref={buttonRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseLeave={() => setMouseDownPos(null)}
              onTouchCancel={() => setMouseDownPos(null)}
              
            >
              Fill the Form
            </FormButton>
          </div>
        </WidgetContainer>

        <WidgetContainer key="c">
          <ChartContainer>
            <div style={{ padding: '20px' }}>
              <Bar data={data} options={options} />
            </div>
          </ChartContainer>
        </WidgetContainer>

        <WidgetContainer key="d">
          <ChartContainer>
              <h4>Department-wise Hiring</h4>
              <Pie data={pieData} options={pieOptions} />
          </ChartContainer>
        </WidgetContainer>

        <WidgetContainer key="e">
            <h3>Monthly Recruitment Summary</h3>
            <h4 style={{color:"#cfcfcf",margin:"10px"}}>No.of Candidates Hired: 120</h4>
            <h4 style={{color:"#cfcfcf"}}>No.of Candidates Rejected: 100</h4>
        </WidgetContainer>

        <WidgetContainer key="f">
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: "20px" }}>Export and Share Reports</h3>
          <ExportButtonContainer>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, exportPDF)}
              onMouseUp={handlesMouseUp}
              onTouchStart={(e) => handlesMouseDown(e, exportPDF)}
              onTouchEnd={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
              onTouchCancel={() => setMouseDownPos(null)}
            >
              Export PDF
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, exportExcel)}
              onMouseUp={handlesMouseUp}
              onTouchStart={(e) => handlesMouseDown(e, exportExcel)}
              onTouchEnd={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
              onTouchCancel={() => setMouseDownPos(null)}
            >
              Export Excel
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, exportCSV)}
              onMouseUp={handlesMouseUp}
              onTouchStart={(e) => handlesMouseDown(e, exportCSV)}
              onTouchEnd={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
              onTouchCancel={() => setMouseDownPos(null)}
            >
              Export CSV
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, shareViaEmail)}
              onMouseUp={handlesMouseUp}
              onTouchStart={(e) => handlesMouseDown(e, shareViaEmail)}
              onTouchEnd={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
              onTouchCancel={() => setMouseDownPos(null)}
            >
              Share via Email
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, copyLinkToClipboard)}
              onMouseUp={handlesMouseUp}
              onTouchStart={(e) => handlesMouseDown(e, copyLinkToClipboard)}
              onTouchEnd={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
              onTouchCancel={() => setMouseDownPos(null)}
            >
              Copy Link
            </ExportButton>
          </ExportButtonContainer>
        </div>
      </WidgetContainer>
      </ResponsiveGridLayout>
    </DashboardContainer>
  );
};

export default Dashboard;
