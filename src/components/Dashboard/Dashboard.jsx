import React, { useState, useRef,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
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
import {data,options,pieData,pieOptions,layout,cols,breakpoints} from "../data/functionsData"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {

  const navigate = useNavigate();

  const [mouseDownPos, setMouseDownPos] = useState(null);
  const buttonRef = useRef(null);
  const [actionToPerform, setActionToPerform] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [isDraggable, setIsDraggable] = useState(false);
  const longPressTimerRef = useRef(null);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);


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

  const handleTouchStart = useCallback((e) => {
    setTouchStartPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });

    longPressTimerRef.current = setTimeout(() => {
      setIsDraggable(true);
    }, 500); // 500ms long press to enable dragging
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (touchStartPos) {
      const dx = Math.abs(e.touches[0].clientX - touchStartPos.x);
      const dy = Math.abs(e.touches[0].clientY - touchStartPos.y);
      
      if (dx > 10 || dy > 10) {
        clearLongPressTimer();
        if (!isDraggable) {
          e.preventDefault(); // Prevent scrolling if not draggable
        }
      }
    }
  }, [touchStartPos, isDraggable, clearLongPressTimer]);

  const handleTouchEnd = useCallback((e) => {
    clearLongPressTimer();

    if (touchStartPos && !isDraggable) {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartPos.x);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartPos.y);
      
      if (dx < 10 && dy < 10) {
        console.log('Button clicked');
        // Perform the desired action
      }
    }

    setTouchStartPos(null);
    setIsDraggable(false);
  }, [touchStartPos, isDraggable, clearLongPressTimer]);
  

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Year-wise Hiring Data', 10, 10);
    
    // Add bar chart data
    doc.text('Year-wise Hiring Data:', 10, 20);
    const barData = [
      { year: '2019', hires: 160 },
      { year: '2020', hires: 150 },
      { year: '2021', hires: 120 },
      { year: '2022', hires: 180 },
      { year: '2023', hires: 220 }
    ];
    barData.forEach((item, index) => {
      doc.text(`${item.year}: ${item.hires}`, 10, 30 + (index * 10));
    });
  
    // Add pie chart data
    doc.text('Department-wise Hiring:', 10, 90);
    const pieData = [
      { department: 'Technical', percentage: 40 },
      { department: 'Marketing', percentage: 20 },
      { department: 'HR', percentage: 15 },
      { department: 'Sales', percentage: 10 },
      { department: 'Finance', percentage: 15 }
    ];
    pieData.forEach((item, index) => {
      doc.text(`${item.department}: ${item.percentage}%`, 10, 100 + (index * 10));
    });
  
    doc.save('report.pdf');
  };
  
  const exportExcel = () => {
    const barData = [
      { Year: '2019', Hires: 160 },
      { Year: '2020', Hires: 150 },
      { Year: '2021', Hires: 120 },
      { Year: '2022', Hires: 180 },
      { Year: '2023', Hires: 220 }
    ];
  
    const pieData = [
      { Department: 'Technical', Percentage: 40 },
      { Department: 'Marketing', Percentage: 20 },
      { Department: 'HR', Percentage: 15 },
      { Department: 'Sales', Percentage: 10 },
      { Department: 'Finance', Percentage: 15 }
    ];
  
    const ws1 = XLSX.utils.json_to_sheet(barData);
    const ws2 = XLSX.utils.json_to_sheet(pieData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Year-wise Hiring");
    XLSX.utils.book_append_sheet(wb, ws2, "Department-wise Hiring");
    XLSX.writeFile(wb, 'report.xlsx');
  };
  
  const exportCSV = () => {
    const barData = [
      { Year: '2019', Hires: 160 },
      { Year: '2020', Hires: 150 },
      { Year: '2021', Hires: 120 },
      { Year: '2022', Hires: 180 },
      { Year: '2023', Hires: 220 }
    ];
  
    const pieData = [
      { Department: 'Technical', Percentage: 40 },
      { Department: 'Marketing', Percentage: 20 },
      { Department: 'HR', Percentage: 15 },
      { Department: 'Sales', Percentage: 10 },
      { Department: 'Finance', Percentage: 15 }
    ];
  
    const csv1 = Papa.unparse(barData);
    const csv2 = Papa.unparse(pieData);
    const csv = `Year-wise Hiring Data\n${csv1}\n\nDepartment-wise Hiring Data\n${csv2}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'report.csv');
  };
  
  const shareViaEmail = () => {
    const subject = encodeURIComponent('Year-wise Hiring Report');
    const body = encodeURIComponent(`
      Year-wise Hiring Data:
      2019: 160 hires
      2020: 150 hires
      2021: 120 hires
      2022: 180 hires
      2023: 220 hires
  
      Department-wise Hiring:
      Technical: 40%
      Marketing: 20%
      HR: 15%
      Sales: 10%
      Finance: 15%
  
      Please find the detailed report attached.
    `);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };
  
  const copyLinkToClipboard = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000);
    });
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
              onMouseLeave={() => setMouseDownPos(null)}
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
              onMouseLeave={() => setMouseDownPos(null)}
            >
              Export PDF
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, exportExcel)}
              onMouseUp={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
            >
              Export Excel
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, exportCSV)}
              onMouseUp={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
            >
              Export CSV
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, shareViaEmail)}
              onMouseUp={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
            >
              Share via Email
            </ExportButton>
            <ExportButton
              onMouseDown={(e) => handlesMouseDown(e, copyLinkToClipboard)}
              onMouseUp={handlesMouseUp}
              onMouseLeave={() => setMouseDownPos(null)}
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
