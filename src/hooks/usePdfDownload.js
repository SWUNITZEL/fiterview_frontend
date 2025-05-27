import { useRef, useCallback } from 'react';
import html2pdf from 'html2pdf.js';

export const usePdfDownload = (filename = 'download.pdf') => {
  const pageRef = useRef(null);

  const handleDownload = useCallback(() => {
    if (!pageRef.current) return;

    const element = pageRef.current;
    const elementWidth = element.scrollWidth;
    const elementHeight = element.scrollHeight;

    const opt = {
      margin: 0,
      filename,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        windowWidth: elementWidth,
        windowHeight: elementHeight,
      },
      jsPDF: {
        unit: 'px',
        format: [elementWidth, elementHeight],
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(opt).from(element).save();
  }, [filename]);

  return { pageRef, handleDownload };
};
