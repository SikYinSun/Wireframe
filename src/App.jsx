import Configuration from './components/Configuration';
import Description from './components/description';
import Diagram from './components/Diagram';
import Information from './components/Information';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';

function App() {
  const contentRef = useRef(null);

  const handleSaveAsPDF = async () => {
    const element = contentRef.current;
    if (!element) return;

    // Render the content to a canvas
    const canvas = await html2canvas(element, { useCORS: true, scale: 1 });
    const imgData = canvas.toDataURL('image/png');
    // Create a new PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('drawing.pdf');
  };

  return (
    <div>
      <div className="flex w-full">
        <div ref={contentRef} className="flex w-4/5 gap-4">
          <Diagram />
          <Information />
        </div>
        <div className="flex flex-col gap-4 mt-4 w-1/5">
          <Configuration />
          <Description />
          <button
              className="p-2 bg-blue-500 text-white rounded mb-4"
              onClick={handleSaveAsPDF}
            >
              Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
