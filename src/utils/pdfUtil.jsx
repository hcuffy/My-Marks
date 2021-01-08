import React from 'react';
import _ from 'lodash';
import {Button} from 'reactstrap';

function downloadPDF(itemToPDF, nameOfChart, saveAs) {
    // eslint-disable-next-line no-undef
    const canvas = document.querySelector(itemToPDF);

    if (_.isNull(canvas)) {
        return;
    }
    const JsPDF = require('jspdf');
    const canvasImg = canvas.toDataURL('image/png', 1.0);
    const pdfDocument = new JsPDF('landscape');
    pdfDocument.setFontSize(15);
    pdfDocument.text(15, 15, nameOfChart);
    pdfDocument.addImage(canvasImg, 'png', 10, 10, 280, 150);
    pdfDocument.save(`${saveAs}.pdf`);
}

export function PDFbutton(styling, saveText, chartTitle) {
    return (
        <Button className={styling} onClick={downloadPDF('canvas', chartTitle, 'chart')}>
            <i className='fas fa-file-pdf fa-2x' /> <br />
            {saveText}
        </Button>
    );
}