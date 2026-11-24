import {
  DemoPhotoScene,
  UneEdition,
  getStampOption,
  splitArticleIntoColumns,
} from './newspaperGenerator';

export function createDemoImage(scene: DemoPhotoScene): string {
  const c = document.createElement('canvas');
  c.width = 880;
  c.height = 560;
  const ctx = c.getContext('2d');
  if (!ctx) return '';

  const grad = ctx.createLinearGradient(0, 0, 880, 560);
  grad.addColorStop(0, scene.bg1);
  grad.addColorStop(1, scene.bg2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 880, 560);

  // Subtle halftone newspaper dots
  ctx.fillStyle = 'rgba(15, 23, 42, 0.09)';
  for (let x = 14; x < 880; x += 22) {
    for (let y = 14; y < 560; y += 22) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Editorial geometric light shapes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.beginPath();
  ctx.arc(140, 120, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(760, 420, 145, 0, Math.PI * 2);
  ctx.fill();

  // Camera viewfinder corners
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 4;
  const m = 34;
  const l = 36;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(m, m + l);
  ctx.lineTo(m, m);
  ctx.lineTo(m + l, m);
  // Top-right
  ctx.moveTo(880 - m - l, m);
  ctx.lineTo(880 - m, m);
  ctx.lineTo(880 - m, m + l);
  // Bottom-left
  ctx.moveTo(m, 560 - m - l);
  ctx.lineTo(m, 560 - m);
  ctx.lineTo(m + l, 560 - m);
  // Bottom-right
  ctx.moveTo(880 - m - l, 560 - m);
  ctx.lineTo(880 - m, 560 - m);
  ctx.lineTo(880 - m, 560 - m - l);
  ctx.stroke();

  // Editorial press banner card
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.fillRect(72, 336, 736, 154);
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 3;
  ctx.strokeRect(72, 336, 736, 154);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = scene.accent;
  ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(scene.kicker, 440, 368);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 38px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(scene.title, 440, 412);

  ctx.fillStyle = '#FDE047';
  ctx.font = '600 21px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(scene.subtitle, 440, 456);

  return c.toDataURL('image/jpeg', 0.88);
}

export function processImageFile(file: File, maxWidth = 960): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Impossible de lire ce fichier image.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Le format de cette image est invalide.'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.width * scale));
        c.height = Math.max(1, Math.round(img.height * scale));
        const ctx = c.getContext('2d');
        if (!ctx) {
          reject(new Error('Contexte graphique indisponible.'));
          return;
        }
        ctx.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL('image/jpeg', 0.84));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 30
): number {
  const paragraphs = String(text || '').split('\n');
  let curY = y;
  let totalLines = 0;

  for (const para of paragraphs) {
    const words = para.split(/\s+/);
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, curY);
        curY += lineHeight;
        if (++totalLines >= maxLines) return curY;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, curY);
      curY += lineHeight;
      totalLines++;
    }
    curY += lineHeight * 0.25;
  }
  return curY;
}

export function exportNewspaperPNG(une: UneEdition): Promise<boolean> {
  return new Promise((resolve) => {
    const c = document.createElement('canvas');
    c.width = 1080;
    c.height = 1600;
    const ctx = c.getContext('2d');
    if (!ctx) {
      resolve(false);
      return;
    }

    const draw = (loadedImg: HTMLImageElement | null) => {
      ctx.fillStyle = '#FAF8F4';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 8;
      ctx.strokeRect(24, 24, c.width - 48, c.height - 48);

      ctx.fillStyle = '#0F172A';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`ÉDITION SPÉCIALE · N° ${une.editionNumber}`, 56, 70);
      ctx.textAlign = 'center';
      ctx.fillText(une.date.toUpperCase(), 540, 70);
      ctx.textAlign = 'right';
      ctx.fillText('PRIX : 1 SOURIRE', 1024, 70);
      ctx.fillRect(56, 84, 968, 3);

      ctx.textAlign = 'center';
      ctx.font = '900 74px "Playfair Display", Georgia, serif';
      ctx.fillText('LE BAZAR DU JOUR', 540, 162);
      ctx.fillRect(56, 180, 968, 6);
      ctx.fillRect(56, 192, 968, 2);

      ctx.fillStyle = '#B91C1C';
      ctx.font = '900 40px "Playfair Display", Georgia, serif';
      let y = wrapCanvasText(ctx, une.headline.toUpperCase(), 540, 244, 950, 48, 3);
      ctx.fillStyle = '#18181B';
      ctx.font = 'italic 700 24px "Playfair Display", Georgia, serif';
      y = wrapCanvasText(ctx, une.subtitle, 540, y + 4, 940, 32, 2);

      const photoY = y + 12;
      const photoW = 968;
      const photoH = 400;
      if (loadedImg) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(56, photoY, photoW, photoH);
        ctx.clip();
        if (une.photoFilter === 'bw') {
          ctx.filter = 'grayscale(100%) contrast(125%)';
        } else if (une.photoFilter === 'vintage') {
          ctx.filter = 'sepia(70%) contrast(110%) brightness(95%)';
        }
        const imgRatio = loadedImg.width / loadedImg.height;
        const boxRatio = photoW / photoH;
        let drawW = photoW;
        let drawH = photoH;
        let dx = 56;
        let dy = photoY;
        if (imgRatio > boxRatio) {
          drawW = photoH * imgRatio;
          dx = 56 - (drawW - photoW) / 2;
        } else {
          drawH = photoW / imgRatio;
          dy = photoY - (drawH - photoH) / 2;
        }
        ctx.drawImage(loadedImg, dx, dy, drawW, drawH);
        ctx.restore();
      }
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 4;
      ctx.strokeRect(56, photoY, photoW, photoH);

      // Tilted editorial rubber stamp
      const stampOpt = getStampOption(une.stamp);
      if (stampOpt.id !== 'none') {
        ctx.save();
        ctx.translate(825, photoY + 68);
        ctx.rotate(-0.11);
        ctx.font = '900 22px "Plus Jakarta Sans", sans-serif';
        const metrics = ctx.measureText(stampOpt.stampText);
        const padX = 18;
        const boxW = metrics.width + padX * 2;
        const boxH = 46;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.fillRect(-boxW / 2, -boxH / 2, boxW, boxH);
        ctx.strokeStyle = stampOpt.colorHex;
        ctx.lineWidth = 5;
        ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);
        ctx.fillStyle = stampOpt.colorHex;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(stampOpt.stampText, 0, 1);
        ctx.restore();
      }

      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#3F3F46';
      ctx.font = 'italic 700 19px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(une.caption, 540, photoY + photoH + 28);

      const artY = photoY + photoH + 68;
      const [col1, col2] = splitArticleIntoColumns(une.article);
      ctx.fillStyle = '#111827';
      ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      wrapCanvasText(ctx, col1, 56, artY, 460, 30, 10);
      wrapCanvasText(ctx, col2, 560, artY, 464, 30, 10);
      ctx.fillStyle = '#D4D4D8';
      ctx.fillRect(536, artY - 22, 2, 290);

      // Eyewitness & Classified row
      const boxY = 1236;
      ctx.fillStyle = '#FEF3C7';
      ctx.fillRect(56, boxY, 472, 148);
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 3;
      ctx.strokeRect(56, boxY, 472, 148);
      ctx.fillStyle = '#713F12';
      ctx.font = '800 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('PAROLE DE TÉMOIN', 76, boxY + 32);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'italic 700 19px "Playfair Display", Georgia, serif';
      wrapCanvasText(ctx, une.eyewitness.quote, 76, boxY + 62, 434, 24, 3);
      ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText(`— ${une.eyewitness.witness}`, 76, boxY + 134);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(552, boxY, 472, 148);
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 3;
      ctx.strokeRect(552, boxY, 472, 148);
      ctx.fillStyle = '#0F172A';
      ctx.font = '800 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('PETITE ANNONCE DU JOUR', 572, boxY + 32);
      ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
      wrapCanvasText(ctx, une.classifiedAd, 572, boxY + 64, 432, 25, 3);

      const weatherY = 1412;
      ctx.fillStyle = '#DBEAFE';
      ctx.fillRect(56, weatherY, 968, 128);
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 3;
      ctx.strokeRect(56, weatherY, 968, 128);
      ctx.fillStyle = '#0F172A';
      ctx.font = '800 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('MÉTÉO ABSURDE DU JOUR', 84, weatherY + 38);
      ctx.font = '700 21px "Plus Jakarta Sans", sans-serif';
      wrapCanvasText(ctx, une.weather, 84, weatherY + 74, 912, 29, 2);

      c.toBlob((blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `une-de-l-absurde-${une.editionNumber}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        resolve(true);
      }, 'image/png');
    };

    if (une.photoDataUrl) {
      const img = new Image();
      img.onload = () => draw(img);
      img.onerror = () => draw(null);
      img.src = une.photoDataUrl;
    } else {
      draw(null);
    }
  });
}
